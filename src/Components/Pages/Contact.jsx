import { useState } from "react";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const HandleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_zaognik";
    const templateId = "template_ytwd4p2";
    const publicKey = "8GgViKFuXpvDzSz0J";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Zent Furniture",
      Message: msg,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully:", response);
        setName("");
        setEmail("");
        setMsg("");
        alert("Message sent successfully! We'll get back to you soon.");
      })
      .catch((error) => {
        console.error("Email failed to send:", error);
        alert("Oops! Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {/* Contact Header */}
      <section className="py-10 md:py-16 bg-white border-b border-gray-200">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Contact Us
        </h1>
        <p className="text-center mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
          Need help with your shopping? Reach out to Zent Furniture—we’re here
          to assist you!
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto px-4 sm:px-6">
          <form
            onSubmit={HandleSubmit}
            className="p-6 sm:p-8 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <ul className="flex flex-col gap-5 sm:gap-6">
              {/* Name Field */}
              <li>
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                />
              </li>

              {/* Email Field */}
              <li>
                <label
                  htmlFor="email"
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                />
              </li>

              {/* Message Field */}
              <li>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base md:text-lg font-medium text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us how we can help..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  required
                  className="w-full p-2 sm:p-3 mt-1 sm:mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-gray-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400 text-sm sm:text-base resize-none"
                />
              </li>
            </ul>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-5 sm:mt-6 py-2 sm:py-3 bg-gray-800 text-white font-semibold text-sm sm:text-base md:text-lg rounded-lg hover:bg-gray-900 focus:ring-2 focus:ring-gray-400 transition-all duration-200 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
