import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";

function AddToCart() {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [, setOrder] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state only for initial fetch
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      handleGetCart();
    }
  }, [userId, refresh]);

  const handleGetCart = async () => {
    setIsLoading(true); // Show LoadingPage only during initial cart fetch
    try {
      const response = await axios.get(
        `https://zent-server.onrender.com/api/getCart/${userId}`
      );
      const { data } = response;
      if (data?.data?.products) {
        console.log("user cart", data.data.products);
        setCartItems(data.data.products);
      }
      if (data?.Order) {
        setOrder(data.Order);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false); // Stop LoadingPage after fetch completes
    }
  };

  const handleQuantityChange = async (id, action) => {
    console.log(`${action} product id :${id}`);
    try {
      if (action === "increment") {
        await axios.patch(`https://zent-server.onrender.com/api/increment/${userId}`, {
          productId: id,
        });
        console.log("quantity increment");
      } else if (action === "decrement") {
        await axios.patch(`https://zent-server.onrender.com/api/decrement/${userId}`, {
          productId: id,
        });
        console.log("quantity decrement");
      }
      setRefresh((prev) => !prev); // Refresh cart without triggering LoadingPage
    } catch (error) {
      console.error(`Error ${action}ing quantity:`, error);
    }
    // No setIsLoading here, so LoadingPage won't render during increment/decrement
  };

  const handleRemove = async (id) => {
    console.log(`remove product id :${id}`);
    try {
      await axios.delete(
        `https://zent-server.onrender.com/api/removeCart/${userId}/${id}`
      );
      await handleGetCart(); // Calls handleGetCart, which manages LoadingPage
    } catch (error) {
      console.error("Error removing item:", error);
    }
    // LoadingPage handled by handleGetCart, not directly here
  };

  const handleBuyAll = async () => {
    navigate("/payment", {state :{totalCost}});
  };

  const totalCost = cartItems.reduce(
    (total, item) => total + item?.productId.price * item.quantity,
    0
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      {cartItems.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row">
            {/* Cart Items Section */}
            <div className="w-full lg:w-3/4 p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Shopping Cart
                </h1>
                <h2 className="text-md sm:text-lg font-medium text-gray-600">
                  {cartItems.length} Item{cartItems.length > 1 ? "s" : ""}
                </h2>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item?.productId._id}
                  className="flex flex-col sm:flex-row items-center border-b border-gray-100 py-5 hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="flex items-center w-full sm:w-2/5">
                    <div className="w-16 sm:w-20">
                      <img
                        className="h-16 sm:h-20 w-full object-cover rounded-md"
                        src={item?.productId.images[0]}
                        alt={item?.productId.name}
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <span className="text-md sm:text-lg font-semibold text-gray-800">
                        {item?.productId.name}
                      </span>
                      <button
                        className="text-xs sm:text-sm font-medium text-gray-500 hover:text-red-500 transition-colors duration-200 mt-1"
                        onClick={() => handleRemove(item?.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center w-full sm:w-1/5 mt-3 sm:mt-0">
                    <button
                      className="bg-gray-100 text-gray-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      onClick={() =>
                        handleQuantityChange(item?.productId._id, "decrement")
                      }
                    >
                      -
                    </button>
                    <input
                      className="mx-2 w-10 sm:w-12 text-center border border-gray-200 rounded py-1 text-gray-700 font-medium"
                      type="number"
                      value={item.quantity}
                      readOnly
                    />
                    <button
                      className="bg-gray-100 text-gray-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      onClick={() =>
                        handleQuantityChange(item?.productId._id, "increment")
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="text-center w-full sm:w-1/5 text-md sm:text-lg font-semibold text-gray-800 mt-3 sm:mt-0">
                    ₹{item?.productId.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Cart Summary Section */}
            <div className="w-full lg:w-1/4 bg-gray-50 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-4">
                Cart Details
              </h1>
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm sm:text-md">
                  <span className="font-medium text-gray-600">
                    Items ({cartItems.length})
                  </span>
                  <span className="font-semibold text-gray-800">
                    ₹{totalCost}
                  </span>
                </div>

                <div className="flex justify-between text-md sm:text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{totalCost}</span>
                </div>
              </div>
              <button
                className="w-full bg-gray-800 text-white font-semibold py-2 sm:py-3 rounded-md mt-6 hover:bg-gray-900 transition-all duration-300 shadow-sm"
                onClick={handleBuyAll}
              >
                Buy All
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 bg-white px-6 py-3 rounded-md shadow-sm">
            No Items in the Cart
          </p>
        </div>
      )}
    </div>
  );
}

export default AddToCart;
