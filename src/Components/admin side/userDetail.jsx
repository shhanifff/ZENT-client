import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductProvider } from "../Pages/ProductContext";
import Sidebar from "./Sidebar";
import LoadingPage from "../LoadingPage";
// import axios from "axios";

function UserDetail() {
  const { id } = useParams();
  const { allUsers, loading, userDelete, blockAndUnblock } =
    useContext(ProductProvider);
  const [fullUser, setFullUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      setFullUser(allUsers);
    }
  }, [allUsers, loading]);

  if (loading) {
    return (
      <LoadingPage/>
    );
  }

  const userDetails = fullUser?.find((user) => user._id === id);

  // Handle Delete
  const handleDelete = (id) => {
    console.log(id);
    userDelete(id);
    navigate(-1);
  };

  // handleBlockAndUnblock
  const handleBlockAndUnblock = (id) => {
    blockAndUnblock(id);
    // navigate(-1);
  };

  return (
    <>
      <Sidebar />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-xl p-8">
          {/* User Information */}
          <h2 className="text-3xl font-semibold text-blue-600 mb-8 text-center">
            User Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-medium text-gray-700">Name:</h3>
              <p className="text-lg text-gray-900">
                {userDetails?.name || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Email:</h3>
              <p className="text-lg text-gray-900">
                {userDetails?.email || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Role:</h3>
              <p className="text-lg text-gray-900">
                {userDetails?.role || "N/A"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-700">Status:</h3>
              <p className="text-lg text-gray-900">
                {userDetails?.isBlocked ? "Blocked" : "active"}
              </p>
            </div>
          </div>

          {/* Cart Section */}
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Cart Details
          </h2>
          <div className="border-t border-gray-300 pt-4">
            {userDetails?.cart && userDetails.cart.length > 0 ? (
              <ul className="space-y-4">
                {userDetails.cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <p className="text-lg text-gray-700">{item.name}</p>
                    <p className="text-lg text-gray-700">${item.price}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No items in the cart.</p>
            )}
          </div>

          {/* Order Section */}
          <h2 className="text-2xl font-semibold text-teal-600 mb-4 mt-8">
            Order Details
          </h2>
          <div className="border-t border-gray-300 pt-4">
            {userDetails?.Order && userDetails.Order.length > 0 ? (
              <ul className="space-y-4">
                {userDetails.Order.map((item, index) => (
                  <li key={index} className="border-b pb-4">
                    <p className="text-lg text-gray-700 font-semibold">
                      {item.name}
                    </p>
                    <p className="text-gray-600">Status: Pending</p>
                    <p className="text-gray-600">Payment Method: Credit Card</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No orders found.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8">
            <p className="text-center text-gray-700 text-lg mb-4">
              {userDetails?.isBlocked
                ? "You want Unblock the user"
                : "You want Block the user"}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition transform hover:scale-105"
                onClick={() => handleDelete(userDetails?._id)}
              >
                Delete
              </button>
              <button
                className={`text-white px-6 py-3 rounded-lg transition transform hover:scale-105 ${
                  userDetails?.isBlocked
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                onClick={() => handleBlockAndUnblock(userDetails?._id)}
              >
                {userDetails?.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetail;
