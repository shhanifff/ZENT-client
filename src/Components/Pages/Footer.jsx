

function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* --- Top Grid Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 hover:text-orange-400 transition-colors duration-300">
              Zent Furniture
            </h2>
            <p className="text-sm md:text-base italic text-gray-600 mt-2 hover:text-orange-400 transition-colors duration-300">
              Crafting Home Harmony
            </p>
          </div>

          {/* Categories (Hidden on small screens) */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Furniture", "Living Room", "Bedroom", "Office"].map((item) => (
                <li
                  key={item}
                  className="text-gray-600 text-sm md:text-base hover:text-orange-400 cursor-pointer transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* About Us (Hidden on small screens) */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About Us
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed hover:text-orange-400 transition-colors duration-200">
              Zent Furniture brings elegance and comfort to your spaces with
              premium, thoughtfully designed pieces. Your home, our passion.
            </p>
          </div>

          {/* Quick Links (Hidden on small screens) */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "FAQ",
                "Shipping Information",
                "Returns & Exchanges",
                "Privacy Policy",
              ].map((item) => (
                <li
                  key={item}
                  className="text-gray-600 text-sm md:text-base hover:text-orange-400 cursor-pointer transition-colors duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* --- Social Media & Contact --- */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Social Media */}
          <div className="text-center w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-orange-400 transition-colors duration-300">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-5">
              {["Instagram", "Facebook", "Twitter"].map((platform) => (
                <p
                  key={platform}
                  className="text-gray-600 text-sm md:text-base hover:text-orange-400 cursor-pointer transition-transform duration-200 hover:scale-110"
                >
                  {platform}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* --- Copyright --- */}
        <div className="mt-10 text-center border-t border-gray-200 pt-4">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2025 Zent Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
