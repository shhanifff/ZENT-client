import axios from "axios";
import { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProductProvider } from "../Pages/ProductContext";

function Addproduct() {
  const {handleAllProducts} =useContext(ProductProvider)
  const navigate = useNavigate();
  // const [itemID, setItemID] = useState();
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemURL, setItemURL] = useState("");
  const [itemDetails, setItemDetails] = useState("");
  const [itemPrice, setItemPrice] = useState();

  const addNewProduct = () => {
    if (!itemCategory || !itemName || !itemURL || !itemDetails || !itemPrice) {
      toast.error("Please all fields");
      return;
    }

    const obj = {
      // id: itemID,
      name: itemName,
      category: itemCategory,
      image: itemURL,
      details: itemDetails,
      price: itemPrice,
      quantity: 1,
    };

    console.log(obj);

    axios.post(`https://zent-server.onrender.com/api/addproduct`, {
      name: itemName,
      category: itemCategory,
      images: [itemURL],
      details: itemDetails,
      price: itemPrice,
    });

    handleAllProducts()
    toast.success("Produuct added");
    setItemCategory(""),
      setItemDetails(""),
      setItemName(""),
      setItemPrice(""),
      setItemURL("");
    // navigate to back page
    navigate(-1);
  };

  return (
    <>
      {/* Add New Product Form */}
      <Sidebar />
      <div className="p-8 max-w-xl mx-auto bg-white shadow-md rounded-xl mt-10 transition-all duration-300 hover:shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 underline underline-offset-4 decoration-gray-200">
          Add New Product
        </h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ID
              </label>
              <input
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
                value={itemID}
                onChange={(e) => setItemID(e.target.value)}
                placeholder="Enter Product ID"
              />
            </div> */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="Enter Price (₹)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter Product Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Category
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              <option value="" disabled>
                {"Select a category"}
              </option>
              <option value="SofaSeating">Sofa & Seating</option>
              <option value="Mattresses">Mattresses</option>
              <option value="Dining">Dining</option>
              <option value="HomeKitchen">HomeKitchen</option>
              <option value="LampsLighting">Lamps & Lighting</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
              value={itemURL}
              onChange={(e) => setItemURL(e.target.value)}
              placeholder="Enter Image URL"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Details
            </label>
            <textarea
              type="text"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-800 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
              value={itemDetails}
              onChange={(e) => setItemDetails(e.target.value)}
              placeholder="Enter Product Details"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={addNewProduct}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 hover:shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
export default Addproduct;
