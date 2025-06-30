import axios from "axios";
import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Swal from "sweetalert2";

function SignIn() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("mail :", mail);
      console.log("pass :", password);

      // Post user datas
      const res = await axios.post(
        "https://zent-server.onrender.com/api/login",
        {
          email: mail,
          password
        }
      );
      console.log("response token", res.data.token);
      const currentUser = res.data.data;
      console.log(currentUser.role);
      const userToken = res.data.token;

      console.log("currentUser", currentUser);

      // Admin login check
      if (currentUser?.role === "admin" && userToken) {
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("name", currentUser?.name);
        navigate("/dashboard");
        Swal.fire("Welcome Admin");
        return;
      }

      if (userToken) {
        if (currentUser) {
          localStorage.setItem("userId", currentUser._id);
          localStorage.setItem("token", userToken);

          navigate("/");
          Swal.fire("Welcome back to Zent Harmony");
        } else {
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: "Invalid password or E-mail",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Sorry",
          text: "User not found",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Invalid password or E-mail",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r bg-white">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
            Welcome back to Zent
          </h1>

          <form onSubmit={handleIn}>
            <div className="mb-4">
              <label
                className="block text-gray-600 text-sm font-medium mb-2"
                htmlFor="email"
              >
                E-mail
              </label>
              <input
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-600 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-indigo-600 hover:underline"
                onClick={() => navigate(-1)}
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default SignIn;
