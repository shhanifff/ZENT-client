import Footer from "./Footer";

function About() {
  return (
    <>
      {/* Popular Brands Section */}
      <section className="py-8 bg-white">
        <h1 className="text-center font-bold text-2xl text-gray-800 mb-6">
          Popular Brands for Furniture
        </h1>
        <ul className="flex flex-wrap justify-center items-center gap-6 px-4">
          {[
            "https://ii1.pepperfry.com/assets/a06e028b-8317-46aa-9219-75c0ee0dc92b.jpg",
            "https://ii1.pepperfry.com/assets/6c5d7d87-8360-4870-b2f4-ef116aec5b23.jpg",
            "https://ii1.pepperfry.com/assets/c8fe8955-513b-4d54-868f-c17d1886fdfa.jpg",
            "https://ii1.pepperfry.com/assets/3cb67245-2f9f-42fd-9cfe-44e5b466158f.jpg",
          ].map((src, index) => (
            <li key={index} className="w-40 sm:w-48">
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={src}
                  alt={`Brand ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-gray-100">
        <ul className="flex flex-wrap justify-center items-center gap-6 px-4">
          {[
            {
              title: "5000+",
              text: "Discover Zent Furniture, where over <strong>5000+ visitors daily</strong> find stylish and functional furniture for every space. Upgrade your home or office with our modern, high-quality designs crafted for comfort and elegance.",
            },
            {
              title: "1500+",
              text: "Experience the trust of over <strong>1500+ daily buyers</strong> at <strong>Zent Furniture</strong>, your destination for premium, stylish, and functional furniture. Transform your spaces with our modern designs, crafted for quality and comfort.",
            },
            {
              title: "24/7",
              text: "At Zent Furniture, we offer <strong>24/7 service</strong> and fast <strong>shipping within 2 days</strong>. Discover premium furniture with quick delivery and unmatched quality.",
            },
          ].map((item, index) => (
            <li key={index} className="w-full sm:w-80">
              <div className="border-2 border-gray-200 w-full h-64 rounded-xl px-5 py-5 bg-white shadow-md hover:shadow-lg transition-shadow">
                <h1 className="text-left text-2xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h1>
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Info Section */}
      <section className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Buy Wooden Furniture For Home Online. Shop at Zent Furniture,
            India&apos;s premier home shopping destination offering a wide range
            of home and office furniture online. Choosing the right furniture
            for your home will add elegance and functionality to your interior
            decor while being cost-effective and long-lasting. Enjoy fast
            shipping and exceptional customer service with our online store.
          </p>
          <p className="text-xs text-gray-500">
            © Copyright 2025 Zent Furniture Limited
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
