import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from API
  useEffect(() => {
    axios
      .get("https://zent-server.onrender.com/api/totalOrders")
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // Debugging orders
  useEffect(() => {
    console.log("Updated Orders:", orders);
  }, [orders]);

  return (
    <>
      <Sidebar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <ul className="space-y-8">
            {orders.map((order, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-md border space-y-4"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Order ID: {order._id}
                </h2>
                <p className="text-gray-600">User ID: {order.userId}</p>
                <p className="text-gray-600">
                  Address: <strong>{order.Address}</strong>
                </p>
                <p className="text-gray-600">
                  Payment Method: <strong>{order.paymentMethod}</strong>
                </p>
                <p className="text-gray-600">
                  Total Amount: <strong>₹{order.Total_Amount}</strong>
                </p>

                {/* Order Products */}
                <div className="mt-4 space-y-4">
                  <h3 className="font-medium text-blue-600">Products:</h3>
                  {order.products.length > 0 ? (
                    <div className="space-y-4">
                      {order.products.map((product, i) => (
                        <div
                          key={i}
                          className="border p-2 rounded-md bg-gray-50"
                        >
                          <img
                            src={product.image}
                            alt="Product"
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <p>Product ID: {product.productsId}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No products found</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Orders;
