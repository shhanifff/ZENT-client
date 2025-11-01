import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";

function OrderedItem() {
  const [orderItem, setOrderItem] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`https://zent-server.onrender.com/api/getOrder/${userId}`)
      .then((res) => setOrderItem(res.data.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, [userId]);

  // Function to format the date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
        <>

    <div className="max-w-full w-full p-6 sm:p-10 bg-white  rounded-2xl  mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
        Your Orders
      </h1>

      {orderItem.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {orderItem.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              {/* Product Image */}
              {order.products?.[0]?.image && (
                <img
                  src={order.products[0].image}
                  alt="Ordered Product"
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
              )}

              {/* Order Info */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Order Date:</span>{" "}
                  {formatDate(order.orderDate)}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Total Price:</span>{" "}
                  <span className="text-gray-900 font-bold text-lg">
                    ₹{order.Total_Amount}
                  </span>
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Address:</span>{" "}
                  {order.Address}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default OrderedItem;
