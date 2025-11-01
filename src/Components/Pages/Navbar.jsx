import { useContext, useEffect, useState } from "react";
import ZentTrans from "../../assets/ZentTrans.png";
import { Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductProvider } from "./ProductContext";

function Navbar() {
  const { searchProducts, allUsers, cartCount } = useContext(ProductProvider);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (allUsers.length > 0 && userId) {
      const userInformation = allUsers.find((item) => item._id === userId);
      setUser(userInformation || {});
    }
    console.log(userId);
    console.log("user details", user);
  }, [allUsers, userId]);

  console.log("cart item count", cartCount);

  return (
    <>
      <header className="flex justify-between items-center text-gray-800 py-4 px-8 md:px-22 bg-white shadow-md sticky top-0 z-20">
        <a href="">
          <img
            src={ZentTrans}
            alt="Zent-logo"
            className="w-40 h-10 hover:scale-105 transition-all ease"
            onClick={() => navigate("/")}
          />
        </a>

        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base ml-10">
          <li
            className="p-3 hover:text-gray-600 hover:underline hover:underline-offset-4 rounded-md transition-all cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className="p-3 hover:text-gray-600 hover:underline hover:underline-offset-4 rounded-md transition-all cursor-pointer"
            onClick={() => navigate("/shopping")}
          >
            Furniture
          </li>
          <li
            className="p-3 hover:text-gray-600 hover:underline hover:underline-offset-4 rounded-md transition-all cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className="p-3 hover:text-gray-600 hover:underline hover:underline-offset-4 rounded-md transition-all cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            Contact
          </li>
          <li>
            <div className="relative">
              <i className="bx bx-search-alt-2 text-xl absolute mt-1 px-2 text-gray-600"></i>
              <input
                type="text"
                className="rounded w-52 h-9 px-7 border border-gray-300 focus:border-gray-500"
                onChange={(e) => searchProducts(e.target.value)}
              />
            </div>
          </li>
        </ul>

        <div className="relative ml-auto mr-7 hidden md:flex items-center justify-center gap-2 left-3 text-xl text-gray-800">
          {/* Cart button with cart count */}
          <div className="relative">
            <i
              className="bx bx-cart text-3xl hover:text-gray-600 cursor-pointer"
              onClick={() =>
                userId ? navigate("/cart") : Swal.fire("Please Login")
              }
            ></i>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </div>

          {/* Wishlist */}
          <i
            className="bx bx-heart text-3xl px-2 hover:text-gray-600 cursor-pointer"
            onClick={() =>
              userId ? navigate("/wishlist") : Swal.fire("Please Login")
            }
          ></i>

          {/* Log or sign section */}
          {localStorage.getItem("token") === null ||
          localStorage.getItem("token") === "" ? (
            <button
              className="hidden xl:block text-sm bg-white border border-gray-300 w-20 h-8 rounded hover:bg-gray-100 hover:shadow-md transition-all"
              onClick={() => navigate("SignUp")}
            >
              Register
            </button>
          ) : (
            <i
              className="bx bx-user-circle text-3xl hover:text-gray-600 cursor-pointer"
              onClick={() => setProfile(!profile)}
            ></i>
          )}
        </div>

        {/* Phone menu bar icon section */}
        <i
          className="bx bx-menu xl:hidden block text-5xl cursor-pointer text-gray-800"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen), setProfile(false);
          }}
        ></i>

        <div
          className={`z-10 absolute xl:hidden top-24 left-0 w-full flex flex-col bg-white items-center gap-6 font-semibold text-lg transform transition-transform shadow-md ${
            isMenuOpen ? "" : "hidden"
          }`}
          style={{ transform: "transition 0.3s ease ,opacity 0.3s ease" }}
        >
          <li
            className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
            onClick={() => {
              navigate("/"), setIsMenuOpen(false);
            }}
          >
            Home
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
            onClick={() => {
              navigate("shopping"), setIsMenuOpen(false);
            }}
          >
            Furniture
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
            onClick={() => {
              navigate("about"), setIsMenuOpen(false);
            }}
          >
            About
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
            onClick={() => {
              navigate("contact"), setIsMenuOpen(false);
            }}
          >
            Contact
          </li>
          <li
            className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
            onClick={() => {
              navigate("cart"), setIsMenuOpen(false);
            }}
          >
            Cart
          </li>
          <div className="flex justify-center items-center w-full h-24 z-40">
            {localStorage.getItem("token") === null ||
          localStorage.getItem("token") === "" ?(
              <button
                className="list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
                onClick={() => {
                  navigate("SignUp"), setIsMenuOpen(false);
                }}
              >
                Register
              </button>
            ) : (
              <i
                className="bx bx-user-circle text-3xl list-none w-full text-center p-4 hover:bg-gray-100 hover:text-gray-600 transition-all cursor-pointer"
                onClick={() => {
                  setProfile(!profile), setIsMenuOpen(false);
                }}
              ></i>
            )}
          </div>
        </div>
      </header>

      {/* Profile details section */}
      <div
        className={`z-10 ${
          profile
            ? "opacity-100 translate-x-0 visible"
            : "opacity-0 translate-x-10 invisible"
        } fixed top-10 right-5 sm:top-20 sm:right-5 w-full sm:w-80 md:w-96 lg:w-96 xl:w-96 h-auto transform rounded-lg p-6 flex flex-col justify-center items-start space-y-6 sm:space-y-4 bg-white shadow-lg border border-gray-200 transition-all duration-500  mt-5 ml-2 z-50`}
      >
        {localStorage.getItem("token") === null ||
        localStorage.getItem("token") === "" ? (
          <button
            onClick={() => {
              navigate("SignIn"), setProfile(false);
            }}
            className="font-bold text-white bg-gradient-to-r from-gray-700 to-gray-900 px-4 py-2 rounded-md w-full sm:text-sm hover:bg-gradient-to-l hover:from-gray-900 hover:to-gray-700 transition duration-300"
          >
            Login
          </button>
        ) : (
          <div className="text-gray-800 space-y-4 w-full">
            <p className="text-left text-sm sm:text-base md:text-lg">
              <span className="font-semibold text-gray-600">E-mail:</span>{" "}
              <span className="text-gray-800">{user.email}</span>
            </p>
            <p className="text-left text-sm sm:text-base md:text-lg">
              <span className="font-semibold text-gray-600">Username:</span>{" "}
              <span className="text-gray-800">{user.name}</span>
            </p>

            <div className="space-y-3 w-full">
              <button
                onClick={() => {
                  setProfile(false), navigate("orders");
                }}
                className="font-semibold h-10 w-full bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300 text-sm sm:text-base"
              >
                View Orders
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  setProfile(false);
                  navigate("/");
                }}
                className="font-semibold h-10 w-full bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 text-sm sm:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}
export default Navbar;
