function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-6 sm:py-8 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 transition-colors duration-300 hover:text-teal-500">
              Zent Furniture
            </h2>
            <p className="text-xs sm:text-sm md:text-base italic text-gray-600 mt-2">
              Crafting Home Harmony
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Furniture", "Living Room", "Bedroom", "Office"].map((item) => (
                <li key={item}>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div className="flex flex-col items-start">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              About Us
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              Zent Furniture brings elegance and comfort to your spaces with
              premium, thoughtfully designed pieces. Your home, our passion.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "FAQ",
                "Shipping Information",
                "Returns & Exchanges",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-6 sm:mt-8 text-center">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Follow Us
          </h3>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            {["Instagram", "Facebook", "Twitter"].map((platform) => (
              <p
                key={platform}
                className="text-xs sm:text-sm md:text-base text-gray-600 hover:text-teal-500 cursor-pointer transition-all duration-200 transform hover:scale-110"
              >
                {platform}
              </p>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 sm:mt-8 text-center">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
            Contact Us
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Email: support@zentfurniture.com
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Phone: +1 800 123 4567
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Zent Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
