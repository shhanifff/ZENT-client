import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { ProductProvider } from "./ProductContext"; // Correct context import
import toast from "react-hot-toast";

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function OrderPayment() {
  const { allProducts,setCartCount } = useContext(ProductProvider); // Use correct context
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const location = useLocation();
  const totalCost = location.state?.totalCost;

  const { id } = useParams();

  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [add, setAdd] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    console.log("totalCost in Buy all", totalCost);
  }, [totalCost]);

  const orderItem = allProducts.find((product) => product.id === id);
  const price = orderItem ? orderItem.price : 0;
  console.log(price);

  const handleCheckOut = async (response) => {
    try {
      const paymentVerification = await axios.post(
        `https://zent-server.onrender.com/api/paymentVerification/${userId}`,
        {
          address: add,
          pincode: pin,
          phone: phone,
          name: fname,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        }
      );

      if (paymentVerification.data.success) {
        toast.success("You Paid Successfully");
        // setFname("");
        // setPhone("");
        // setAdd("");
        // setPin("");
        navigate("/shopping/products");
        // window.location.reload();
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Error occurred during verification", error);
      toast.error("Payment verification failed");
    }
  };

  const handlePayment = async () => {
    if (!fname || !phone || !add || !pin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all the details",
      });
      return;
    }

    // Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load payment gateway");
      return;
    }

    try {
      const res = await axios.post(
        `https://zent-server.onrender.com/api/payment/${userId}`,
        {
          address: add,
          pincode: pin,
          phone: phone,
          name: fname,
          amount: totalCost, // Pass the total cost to backend
          currency: "INR",
        }
      );

      if (res.data.success) {
        console.log("ressssss", res.data.data.id);

        const options = {
          key: "rzp_test_ixy6Bhh22PPlC1", // Replace with your Razorpay key
          amount: totalCost * 100, // Amount in paise
          currency: "INR",
          name: "zent",
          description: "Test Transaction",
          image: "",
          order_id: res.data.data.id, // Order ID from backend
          handler: function (response) {
            handleCheckOut(response); // Verify payment after success
          },
          prefill: {
            name: fname,
            contact: phone,
          },
          notes: {
            address: add,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error(`Payment failed: ${response.error.description}`);
        });
        rzp1.open();
      } else {
        toast.error("Failed to initiate payment");
      }
      setCartCount(0)
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="self-start mb-4 bg-gray-200 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 transition-all duration-300 text-sm sm:text-base"
      >
        <span>←</span> Back
      </button>

      <div className="relative w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-teal-400"></div>
        <div className="p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 text-center">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center mb-4 sm:mb-6">
            Complete your order in just a few steps
          </p>

          {/* Delivery Details Card */}
          <div className="space-y-4 sm:space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                value={fname}
                className="w-full p-3 sm:p-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setFname(e.target.value)}
              />
              <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                👤
              </span>
            </div>

            <div className="relative">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                className="w-full p-3 sm:p-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setPhone(e.target.value)}
              />
              <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📞
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Delivery Address"
                value={add}
                className="w-full p-3 sm:p-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setAdd(e.target.value)}
              />
              <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🏠
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="PIN Code"
                value={pin}
                className="w-full p-3 sm:p-4 pl-9 sm:pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                onChange={(e) => setPin(e.target.value)}
              />
              <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📍
              </span>
            </div>
          </div>

          {/* Price Display */}
          <div className="mt-4 sm:mt-6 flex justify-between items-center bg-gray-50 p-3 sm:p-4 rounded-lg">
            <span className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
              Total Amount:
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
              ₹{totalCost}
            </span>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base md:text-lg hover:from-blue-600 hover:to-teal-500 transform hover:scale-105 transition-all duration-300 shadow-md"
          >
            Pay Now ₹{totalCost}
          </button>
        </div>

        {/* Footer Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-400 opacity-50"></div>
      </div>
    </div>
  );
}

export default OrderPayment;
