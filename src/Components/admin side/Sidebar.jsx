import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [navbar, setNavbar] = useState(false);
  const [activePath, setActivePath] = useState("");
  const adminName = localStorage.getItem('name');

  // Set active path based on current location
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const adminLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="w-full h-16 bg-white shadow-md border-b border-gray-200 sticky top-0 z-10">
        <ul className="flex justify-between items-center px-6 h-full">
          {/* Menu Section and Brand */}
          <li className="flex items-center">
            <span
              className="bx bx-menu-alt-left sm:text-3xl font-bold cursor-pointer text-gray-800 hover:text-gray-900 transition-transform duration-300 hover:rotate-180"
              onClick={() => setNavbar(!navbar)}
            ></span>
            <span className="sm:text-2xl font-bold px-2 text-gray-800 uppercase tracking-wider hover:text-gray-900 transition-colors duration-300">
              ZENT
            </span>
          </li>
        </ul>
      </header>

      {/* Sidebar Section */}
      <div
        className={`fixed top-0 left-0 z-20 h-full w-64 bg-white shadow-lg border-r border-gray-200 text-gray-800 transition-all duration-500 transform ${
          navbar ? "translate-x-0" : "-translate-x-full"
        } flex flex-col overflow-hidden`}
      >
        {/* Close Sidebar Button */}
        <span
          className="bx bx-x text-3xl absolute top-4 right-4 cursor-pointer text-gray-800 hover:text-gray-900 transition-all duration-300"
          onClick={() => setNavbar(false)}
        ></span>

        {/* Admin Profile Section */}
        <div className="flex flex-col items-center gap-3 p-6 mb-2 border-b border-gray-200 pb-6 bg-gradient-to-r from-blue-50 to-gray-50">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/005/276/776/small_2x/logo-icon-person-on-white-background-free-vector.jpg"
            alt="Admin Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover transform hover:scale-110 transition-all duration-300"
          />
          <span className="text-base font-bold text-gray-800 uppercase tracking-wide">
            {adminName}
          </span>
          <div className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
            Administrator
          </div>
        </div>

        {/* Main Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            <li
              className={`cursor-pointer rounded-lg p-3 transition-all duration-300 text-base font-medium tracking-wide ${
                activePath === "/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setNavbar(false);
                navigate("/dashboard");
              }}
            >
              Dashboard
            </li>
            <li
              className={`cursor-pointer rounded-lg p-3 transition-all duration-300 text-base font-medium tracking-wide ${
                activePath === "/OurProducts"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setNavbar(false);
                navigate("/OurProducts");
              }}
            >
              Products
            </li>
            <li
              className={`cursor-pointer rounded-lg p-3 transition-all duration-300 text-base font-medium tracking-wide ${
                activePath === "/users"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setNavbar(false);
                navigate("/users");
              }}
            >
              Users
            </li>
            <li
              className={`cursor-pointer rounded-lg p-3 transition-all duration-300 text-base font-medium tracking-wide ${
                activePath === "/ordered"
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => {
                setNavbar(false);
                navigate("/ordered");
              }}
            >
              Orders
            </li>
          </ul>
        </div>

        {/* Logout Button at Bottom */}
        <div className="mt-auto border-t border-gray-200 p-4">
          <button
            onClick={adminLogout}
            className="w-full py-2 px-4 text-sm font-medium bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-all duration-300 flex justify-center items-center"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
