import { useParams } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import { useContext, useState, useEffect } from "react";
import Footer from "./Footer";
import Swal from "sweetalert2";
import axios from "axios";
import LoadingPage from "../LoadingPage";

function ProductDetails() {
  const { allProducts, addCart, addWishlist } = useContext(ProductProvider);
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const userId = localStorage.getItem("userId");

  // Fetch product details (unchanged logic)
  useEffect(() => {
    if (allProducts) {
      const productDetails = allProducts.find((product) => product._id == id);
      setDetail(productDetails || null);
    }
  }, [id, allProducts]);

  // Fetch current user status (unchanged logic)
  useEffect(() => {
    axios
      .get(`https://zent-server.onrender.com/api/UserById/${userId}`)
      .then((response) => {
        setCurrentUser(response.data.data);
        console.log("Fetched Specific User:", response.data.data);
      });
  }, [userId]);

  if (!detail) {
    return <LoadingPage />;
  }

  // addCart (unchanged logic)
  const handleCartClick = () => {
    if (currentUser?.isBlocked) {
      Swal.fire("Your account has been Blocked");
      return;
    }
    addCart(id);
    console.log("Cart product id in details:", id);
  };

  // addWishlist (unchanged logic)
  const handleWishlistClick = () => {
    if (currentUser?.isBlocked) {
      Swal.fire("Your account has been Blocked");
      return;
    }
    // Swal.fire("Added to Wishlist!");
    addWishlist(id);
    console.log("Wishlist product id:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container px-6 py-16 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* Product Image */}
          <div className="lg:w-1/2 w-full">
            <img
              alt={detail.name || "Product"}
              className="w-full lg:h-[28rem] h-80 object-cover rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
              src={detail.images[0]}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/400x400?text=Image+Not+Available";
              }}
            />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
            <h2 className="text-sm text-green-600 font-semibold tracking-widest uppercase bg-green-100 inline-block px-3 py-1 rounded-full">
              On Sale
            </h2>
            <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mt-4 tracking-tight">
              {detail.name}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              {detail.details}
            </p>

            {/* Pricing */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-bold text-yellow-700">
                ₹{detail.price}
              </span>
              <del>
                <p className="text-lg text-gray-500">₹{detail?.price + 1000}</p>
              </del>

              <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                Save ₹1000
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className="bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-md flex items-center justify-center text-lg"
                onClick={handleCartClick}
              >
                <i className="fas fa-shopping-cart mr-2"></i> Add to Cart
              </button>
              <button
                className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 hover:text-yellow-700 transition-all duration-300 shadow-md flex items-center justify-center text-lg"
                onClick={handleWishlistClick}
              >
                <i className="fas fa-heart mr-2"></i> Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
