import Sidebar from "./Sidebar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductProvider } from "../Pages/ProductContext";

function Products() {
  const navigate = useNavigate();
  const { allProducts, stockChanger, productDelet } =
    useContext(ProductProvider);

  const itemDelete = (id) => {
    productDelet(id);
  };

  const handlestock = (id, stock) => {
    stockChanger(id, stock);
  };

  return (
    <>
      <Sidebar />

      {/* All Products Section */}
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto mt-6 md:mt-10 bg-gray-50">
        {/* Header and Add New Product Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Product Management
          </h1>
          <button
            onClick={() => navigate("/addproduct")}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-white text-indigo-600 border border-indigo-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 shadow-sm"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Add New Product
            </span>
          </button>
        </div>

        {/* All Products Table */}
        <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 p-6 border-b border-gray-100">
            All Products
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Stock Status
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 bg-white">
                {allProducts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-gray-500 font-mono">
                      {item._id}
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                      {item.name}
                    </td>

                    <td className="px-4 py-3 sm:px-6 sm:py-4">
                      <button
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                          item.stock
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-red-50 text-red-600 border border-red-200"
                        }`}
                        onClick={() => handlestock(item._id, item.stock)}
                      >
                        {item.stock ? "In Stock" : "Out of Stock"}
                      </button>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 space-x-2 sm:space-x-3">
                      <button
                        className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 text-xs sm:text-sm font-medium transition-all duration-200"
                        onClick={() => navigate(`/editProduct/${item._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50 text-xs sm:text-sm font-medium transition-all duration-200"
                        onClick={() => itemDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {allProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No products found. Click &quot;Add New Product&quot; to
                      get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
