import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvider } from "./ProductContext";
import Footer from "./Footer";
import LoadingPage from "../LoadingPage";
// import LoadingPage from "";

function Allproducts() {
  const { allProducts, addWishlist } = useContext(ProductProvider);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts(allProducts);
      setLoading(false);
    }
  }, [allProducts]);

  if (loading) {
    return <LoadingPage />;
  }

  const BasedCategory = (category) => {
    if (category === "allProducts") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  const addWToWishlist = (id) => {
    console.log("wishlist product id", id);
    addWishlist(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-center py-6 text-4xl font-extrabold text-yellow-800 tracking-tight">
        All Products
      </h1>

      <div className="mb-6 px-6">
        <ul className="flex flex-wrap justify-center gap-3 py-5 text-sm sm:text-md font-medium">
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("allProducts")}
          >
            All Products
          </li>
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("SofaSeating")}
          >
            Sofa & Seating
          </li>
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("Mattresses")}
          >
            Mattresses
          </li>
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("Dining")}
          >
            Dining
          </li>
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("HomeKitchen")}
          >
            Home Kitchen
          </li>
          <li
            className="px-5 py-2 bg-white rounded-full shadow-md text-gray-700 hover:bg-yellow-100 hover:text-yellow-700 transition-all duration-300 cursor-pointer"
            onClick={() => BasedCategory("LampsLighting")}
          >
            Lamp & Light
          </li>
        </ul>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 mb-10">
        {products.map((product) => (
          <div
            key={product?._id}
            className={`group bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
              !product?.stock ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <img
              src={product?.images[0]}
              alt="Product"
              className="h-72 w-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
            />

            <div className="px-5 py-4">
              <span className="text-gray-500 text-xs uppercase tracking-wide">
                Brand
              </span>
              <p className="text-lg font-bold text-gray-800 truncate capitalize">
                {product?.name}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <p className="text-xl font-semibold text-yellow-700">
                  ₹{product?.price}
                </p>
                <del>
                  <p className="text-sm text-gray-500">
                    ₹{product?.price + 1000}
                  </p>
                </del>
              </div>

              <p
                className={`text-sm font-medium mt-1 ${
                  product?.stock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product?.stock ? "In Stock" : "Out of Stock"}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className={`flex-1 bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                    !product?.stock
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-700"
                  }`}
                  onClick={() =>
                    product?.stock &&
                    navigate(`/shopping/products/${product?._id}`)
                  }
                  disabled={!product?.stock}
                >
                  View Details
                </button>

                <button
                  className={`flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                    !product?.stock
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200 hover:text-yellow-700"
                  }`}
                  onClick={() => {
                    if (product?.stock) {
                      addWToWishlist(product._id);
                    }
                  }}
                  disabled={!product?.stock}
                >
                  Add Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export default Allproducts;
