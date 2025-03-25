import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Pages/Navbar";
import SignUp from "./Components/In&up/SignUp";
import SignIn from "./Components/In&up/SignIn";
import Furniture from "./Components/Pages/Furniture";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import SofaOffer from "./Components/Pages/Home";
import Allproducts from "./Components/Pages/Allproducts";
import ProductDetails from "./Components/Pages/ProductDetails";
import ProductContext from "./Components/Pages/ProductContext";
import AddToCart from "./Components/Pages/AddToCart";
import OrderPayment from "./Components/Pages/OrderPayment";
import OrderedItem from "./Components/Pages/OrderedItems";
import Users from "./Components/admin side/Users";
import Dashboard from "./Components/admin side/Dashboard";
import Orders from "./Components/admin side/Orders";
import Products from "./Components/admin side/Products";
import UserDetail from "./Components/admin side/userDetail";
import EditProduct from "./Components/admin side/editProduct";
import PrivateRoute from "./Components/PrivateRoute";
import Wishlist from "./Components/Pages/wishlist";
import { Toaster } from "react-hot-toast";
import Addproduct from "./Components/admin side/addproduct";

function App() {
  const location = useLocation();

  // Hide navbar based on specific routes
  const hideNav =
    location.pathname === "/SignIn" ||
    location.pathname === "/SignUp" ||
    location.pathname === "/Sidebar" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/users" ||
    location.pathname === "/ordered" ||
    location.pathname === "/OurProducts" ||
    location.pathname=== '/addproduct' ||
    location.pathname.startsWith("/editProduct/") || // Handles /editProduct/:id dynamically
    location.pathname.startsWith("/userDetail/"); // Handles /userDetail/:id dynamically

  return (
    <>
      <ProductContext>
        {/* Render Navbar only if hideNav is false */}
        {!hideNav && <Navbar />}
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<SofaOffer />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/shopping" element={<Furniture />} />
          <Route path="/shopping/products" element={<Allproducts />} />
          <Route path="/shopping/products/:id" element={<ProductDetails />} />
          <Route path="/payment" element={<OrderPayment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/orders" element={<OrderedItem />} />
          <Route path="/wishlist" element={<Wishlist/>} />

          {/* Admin Routes (Protected by PrivateRoute) */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard/>} />}
          />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route
            path="/userDetail/:id"
            element={<PrivateRoute element={<UserDetail />} />}
          />
          <Route
            path="/OurProducts"
            element={<PrivateRoute element={<Products />} />}
          />
          <Route
            path="/editProduct/:id"
            element={<PrivateRoute element={<EditProduct />} />}
          />
          <Route
            path="/ordered"
            element={<PrivateRoute element={<Orders />} />}
          />
          <Route
            path="/addproduct"
            element={<PrivateRoute element={< Addproduct />} />}
          />
        </Routes>
        <Toaster />
      </ProductContext>
    </>
  );
}

export default App;
