import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductProvider } from "../Pages/ProductContext";
import axios from "axios";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProducts ,handleAllProducts } = useContext(ProductProvider);

  const [newPrice, setNewprice] = useState("");
  const [newName, setNewname] = useState("");
  const [newCategory, setNewcategory] = useState("");
  const [newImage, setNewimage] = useState("");
  const [newDetails, setNewdetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const editItem = allProducts?.find((item) => item._id === id);

  // Set initial values from editItem when it loads
  useEffect(() => {
    if (editItem) {
      setNewprice(editItem.price?.toString() || "");
      setNewname(editItem.name || "");
      setNewcategory(editItem.category || "");
      setNewimage(editItem.images || "");
      setNewdetails(editItem.details || "");
    }
  }, [editItem]);

  const afterEdit = () => {
    // Check if all fields are empty
    if (!newName && !newCategory && !newImage && !newDetails && !newPrice) {
      toast.error("Please fill at least one field to save.", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);

    // Perform the API call and handle with toast
    axios
      .patch(`https://zent-server.onrender.com/api/editproduct/${id}`, {
        name: newName || editItem.name,
        category: newCategory || editItem.category,
        images: newImage || editItem.images,
        details: newDetails || editItem.details,
        price: newPrice ? parseFloat(newPrice) : editItem.price,
      })
      .then(() => {
        toast.success("Product updated successfully");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(
          "Failed to update product: " +
            (error.response?.data?.message || error.message)
        );
      })
      .finally(() => {
        setIsLoading(false);
        handleAllProducts()
      });
  };

  const handleGoBack = () => {
    navigate(-1);
    handleAllProducts()
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <Sidebar />

      <div className="p-8 sm:ml-64 flex justify-center">
        <div className="w-3/4 bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Edit Product</h1>
              {/* <button
                onClick={handleGoBack}
                className="flex items-center space-x-1 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-300"
              >
                <span className="bx bx-arrow-back"></span>
                <span>Back</span>
              </button> */}
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewname(e.target.value)}
                    placeholder={editItem?.name || "Enter product name"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={newPrice}
                      onChange={(e) => setNewprice(e.target.value)}
                      placeholder={editItem?.price || "Enter price"}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewcategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 bg-white"
                  >
                    <option value="" disabled>
                      {editItem?.category || "Select a category"}
                    </option>
                    <option value="SofaSeating">Sofa & Seating</option>
                    <option value="Mattresses">Mattresses</option>
                    <option value="Dining">Dining</option>
                    <option value="HomeKitchen">Home Kitchen</option>
                    <option value="LampsLighting">Lamps & Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Details
                  </label>
                  <textarea
                    value={newDetails}
                    onChange={(e) => setNewdetails(e.target.value)}
                    placeholder={editItem?.details || "Enter product details"}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Right column - Image Preview */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => {
                      setNewimage(e.target.value);
                      setImageError(false);
                    }}
                    placeholder={editItem?.images || "Enter image URL"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 mt-2">
                  <div className="p-3 bg-gray-100 border-b border-gray-200">
                    <h3 className="font-medium text-gray-700">Image Preview</h3>
                  </div>
                  <div className="p-4">
                    {newImage ? (
                      <div className="relative">
                        <div className="aspect-w-16 aspect-h-12 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
                          {imageError ? (
                            <div className="w-full h-64 flex items-center justify-center flex-col text-gray-500">
                              <svg
                                className="w-16 h-16 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                              </svg>
                              <p>Invalid image URL</p>
                              <p className="text-xs mt-1">
                                Please check the URL and try again
                              </p>
                            </div>
                          ) : (
                            <img
                              src={newImage}
                              alt="Product preview"
                              className="w-full h-64 object-contain"
                              onError={handleImageError}
                            />
                          )}
                        </div>
                        {!imageError && (
                          <div className="absolute top-2 right-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Preview
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-1">Enter image URL to see preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleGoBack}
                className="w-1/3 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                className={`w-2/3 py-2 ${
                  isLoading ? "bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
                } text-white font-medium rounded-lg transition-all duration-200 flex justify-center items-center`}
                onClick={afterEdit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
