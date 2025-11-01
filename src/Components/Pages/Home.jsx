// import Footer from "./Footer";
// import landImage from "../../assets/istockphoto-1473673099-612x612.jpg";
// import { useNavigate } from "react-router-dom";

// function SofaOffer() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="h-screen w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden">
//         {/* Left Side - Text and Button */}
//         <div className="z-10 w-full md:w-1/2 px-8 md:px-16 text-center md:text-left space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
//             Decorate Your Interior <br /> With Modern Elegance
//           </h1>
//           <p className="text-gray-600 text-lg md:text-xl">
//             Discover stylish furniture that transforms your space into comfort
//             and class.
//           </p>
//           <button
//             className="bg-white text-gray-900 px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition-all duration-300"
//             onClick={() => navigate("/shopping")}
//           >
//             Explore All
//           </button>
//         </div>

//         {/* Right Side - Image */}
//         <div className="w-full md:w-1/2 relative mt-10 md:mt-0">
//           <img
//             src={landImage}
//             alt="Furniture Offer"
//             className="w-full h-[60vh] md:h-screen object-cover md:object-right rounded-l"
//           />
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default SofaOffer;



import Footer from "./Footer";
import landImage from "../../assets/istockphoto-1473673099-612x612.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SofaOffer() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">
        {/* Left Side - Text + Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 w-full md:w-1/2 px-6 md:px-16 text-center md:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Decorate Your Interior <br />
            <span className="text-gray-700">With Modern Elegance</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
            Discover stylish furniture that brings comfort, charm, and class to
            your living space. Designed for modern homes with timeless taste.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/shopping")}
            className="bg-white text-gray-900 px-8 py-3 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:bg-gray-50 transition-all duration-300"
          >
            Explore All
          </motion.button>
        </motion.div>

        {/* Right Side - Image with Overlay */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative mt-10 md:mt-0"
        >
          <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-white/10 to-transparent md:hidden"></div>
          <img
            src={landImage}
            alt="Furniture Offer"
            className="w-full h-[50vh] sm:h-[60vh] md:h-screen object-cover md:object-right rounded-t-2xl md:rounded-l-2xl"
          />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}

export default SofaOffer;
