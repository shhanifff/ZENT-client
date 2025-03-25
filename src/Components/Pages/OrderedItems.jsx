import { useState, useEffect } from "react";
import axios from "axios";

function OrderedItem() {
  const [orderItem, setOrderItem] = useState([]);

  let userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log(userId);
    axios
      .get(`http://localhost:3000/api/getOrder/${userId}`)
      .then((res) => setOrderItem(res.data.data));
  }, [userId]);

  useEffect(() => {
    console.log("OrderedItem", orderItem);
  }, [orderItem]);

  // Function to format the date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString(); // Converts to readable date-time
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-xl border border-gray-100">
      {/* Ordered Items Section */}
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 underline underline-offset-4 decoration-gray-300">
          Your Orders
        </h1>
        {orderItem.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Order Date:</span>{" "}
                {formatDate(order.orderDate)}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Total Amount:</span>{" "}
                <span className="text-gray-900 font-semibold">
                  ₹{order.Total_Amount}
                </span>
              </p>
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-wrap justify-between items-center py-3 border-t border-gray-100"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt="Order Item"
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                    <span className="text-lg text-gray-700 font-medium">
                      {item.productName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderedItem;
