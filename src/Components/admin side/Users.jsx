import { useContext } from "react";
import Sidebar from "./Sidebar";
import { ProductProvider } from "../Pages/ProductContext";
import { useNavigate } from "react-router-dom";

function Users() {
  const { allUsers } = useContext(ProductProvider);
  const navigate = useNavigate();

  // Remove admin from the user list
  const filteredUsers = allUsers.filter((user) => user.name !== "admin");

  return (
    <>
      <Sidebar />
      <div className="p-4 md:p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Users Details
        </h1>
        <div className="overflow-x-auto shadow-sm rounded-lg">
          <table className="w-full bg-white border-collapse rounded-lg overflow-hidden border border-gray-200">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  More Details
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-150`}
                >
                  <td className="px-6 py-4 text-gray-600">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-150"
                      onClick={() => navigate(`/userDetail/${user._id}`)}
                    >
                      View More
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
