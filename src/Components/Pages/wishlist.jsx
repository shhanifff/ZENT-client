import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductProvider } from "./ProductContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function Wishlist() {
  const { allProducts, addCart } = useContext(ProductProvider);
  const [wishlist, setWishlist] = useState([]);
  let userId = localStorage.getItem("userId");

  // Fetch wishlist items
  const getCart = () => {
    axios
      .get(`https://zent-server.onrender.com/api/getWishlist/${userId}`)
      .then((response) => setWishlist(response.data.data.products))
      .catch((error) => console.error("Error fetching wishlist:", error));
  };

  // Fetch wishlist when component mounts
  useEffect(() => {
    getCart();
  }, [userId]);

  // Add to cart function
  const addToCart = (id) => {
    const product = allProducts.find((item) => item._id === id);

    if (product.stock === true) {
      console.log("Added to Cart:", id);
      addCart(id);
    } else {
      Swal.fire(
        "Out of Stock",
        "This product is currently unavailable.",
        "warning"
      );
    }
  };

  const removeFromWishlist = (id) => {
    axios
      .patch(`https://zent-server.onrender.com/api/removeWishlist/${userId}`, {
        productId: id,
      })
      .then(() => {
        toast.success("Removed");
        getCart();
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
        Your Wishlist
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="p-3 md:p-4 border">Image</th>
              <th className="p-3 md:p-4 border">Details</th>
              <th className="p-3 md:p-4 border">Status</th>
              <th className="p-3 md:p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <tr
                  key={item.productId._id}
                  className="border text-xs md:text-base"
                >
                  <td className="p-3 md:p-4 border">
                    <img
                      src={item.productId.images[0]}
                      alt="Product"
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 md:p-4 border">
                    <p className="font-semibold text-sm md:text-base">
                      {item.productId.name}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      ₹{item.productId.price}
                    </p>
                  </td>
                  <td className="p-3 md:p-4 border">
                    <span className="text-sm md:text-base font-medium">
                      {item.productId.stock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 md:p-4 border flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                    <button
                      onClick={() => addToCart(item.productId._id)}
                      className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-green-700 text-sm md:text-base"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.productId._id)}
                      className="bg-gray-600 text-white px-3 py-1 md:px-4 md:py-2 rounded hover:bg-gray-700 text-sm md:text-base"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500 text-sm md:text-base"
                >
                  No items in wishlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Wishlist;
