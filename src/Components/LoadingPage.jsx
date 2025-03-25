const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Spinner with Gradient and Bounce Effect */}
      <div className="relative flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute w-12 h-12 border-4 border-t-teal-400 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin animate-reverse"></div>
        <div className="absolute w-8 h-8 bg-white rounded-full flex justify-center items-center animate-bounce">
          <span className="text-xl font-bold text-gray-800">Z</span>
        </div>
      </div>

      {/* Branding Text with Pulse Animation */}
      <div className="mt-6 flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
          Zent Furniture
        </h1>
        <span className="text-sm sm:text-base md:text-lg text-gray-600 animate-pulse">
          Loading...
        </span>
      </div>

      {/* Subtle Tagline */}
      <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500">
        Crafting your perfect space
      </p>
    </div>
  );
};

export default LoadingPage;
