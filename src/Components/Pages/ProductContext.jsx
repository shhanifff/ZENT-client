import axios from "axios";
import { useState, useEffect, createContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// ProductContext create cheyyunnu
export const ProductProvider = createContext();

// eslint-disable-next-line react/prop-types
function ProductContext({ children }) {
  const [allProducts, setAllProducts] = useState([]); // Products store cheyyan state
  const [allUsers, setAllUsers] = useState([]); // Users data store cheyyan state
  const [loading, setLoading] = useState(true); // Loading state
  const [cartCount, setCartCount] = useState(0); // Cart count state

  // Function to fetch cart count
  const fetchCartCount = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/userCart/${userId}`
      );
      const cartProducts = response.data?.data[0]?.products || [];
      setCartCount(cartProducts.length); // Update cart count
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const addCart = async (id) => {
    const userId = localStorage.getItem("userId"); // User id localStorage il ninn edukkan

    // Check user login
    if (!userId) {
      Swal.fire("Please Login");
      return;
    }

    // Selected product find cheyyunnu
    const cartItem = allProducts.find((item) => item._id === id);

    if (!cartItem) {
      console.error("Product not found");
      return;
    }

    try {
      // Fetch user's cart
      const cartResponse = await axios.get(
        `http://localhost:3000/api/userCart/${userId}`
      );
      const cartProducts = cartResponse.data?.data[0]?.products || [];

      // Check if product already exists in cart
      const isProductInCart = cartProducts.some(
        (item) => item.productId === id
      );

      if (isProductInCart) {
        toast.error("already in Cart");
      } else {
        // Add product to cart
        await axios.post(`http://localhost:3000/api/addCart/${userId}`, {
          productId: id,
        });
        toast.success("added to Cart");

        // Fetch updated cart count
        await fetchCartCount(userId);
      }
    } catch (error) {
      console.error("Error in addCart:", error);
    }
  };

  async function handleAllProducts() {
    try {
      const response = await axios.get("http://localhost:3000/api/allproducts");
      setAllProducts(response.data.data); // Products state update cheyyuka
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch all products on component mount
  useEffect(() => {
    handleAllProducts();
  }, []);

  // Fetch all users
  async function user() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/allUsers");
      setAllUsers(response.data.data);
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  }

  // Fetch cart count & users when component mounts
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchCartCount(userId);
    }
    user();
  }, []);

  // Add to Wishlist
  async function addWishlist(id) {
    console.log("wishlist id", id);

    const userId = localStorage.getItem("userId");

    if (!userId) {
      Swal.fire("Please Login");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/api/getWishlist/${userId}`
      );
      const currentProduct = response.data.data.products.find(
        (item) => item.productId._id === id
      );

      if (currentProduct) {
        toast.error("already in Wishlist");
        return;
      }

      await axios.post(`http://localhost:3000/api/addToWhislist/${userId}`, {
        productId: id,
      });
      toast.success("added to wishlist");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }
  //======

  // Handle stock update
  const stockChanger = async (id, stock) => {
    try {
      const action = stock ? "outStock" : "inStock";

      await axios.patch("http://localhost:3000/api/handleStock", {
        productId: id,
        action,
      });

      setAllProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id ? { ...product, stock: !stock } : product
        )
      );

      toast.success(
        stock ? "Product is now Out of Stock" : "Product is now In Stock"
      );
    } catch (error) {
      toast.error("Could not update stock.");
      console.log("error occuered", error);
    }
  };

  // Delete product
  async function productDelet(id) {
    try {
      await axios.post(`http://localhost:3000/api/deleteproduct`, {
        productId: id,
      });
      handleAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Delete user
  async function userDelete(id) {
    try {
      await axios.post(`http://localhost:3000/api/removeUser`, { userId: id });
      user();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // Block & Unblock user
  async function blockAndUnblock(id) {
    try {
      await axios.patch(`http://localhost:3000/api/blockAndUnblock/${id}`);
      user(); // Fetch updated users
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  }

  return (
    <ProductProvider.Provider
      value={{
        allProducts,
        addCart,
        allUsers,
        loading,
        cartCount,
        addWishlist,
        stockChanger,
        productDelet,
        userDelete,
        blockAndUnblock,
        handleAllProducts,
        setCartCount,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
}

export default ProductContext;
