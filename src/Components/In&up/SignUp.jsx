import { Formik, Form, Field, ErrorMessage } from "formik";
import { validation } from "./Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const initialValues = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

function SignUp() {
  // const [id, setId] = useState();
  const navigate = useNavigate();
  const [checkUser, setCheckUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/allUsers")
      .then((response) => setCheckUser(response.data.data));
  }, []);

  useEffect(() => {
    console.log("users", checkUser);
  }, [checkUser]);

  const handleSubmit = (values) => {
    const userMail = checkUser.filter((users) => users.mail === values.mail);

    if (userMail.length > 0) {
      alert("Already registered");
    } else {
      axios.post("http://localhost:3000/api/register", {
        email: values.mail,
        password: values.password,
        name: values.name,
      });
      navigate("/SignIn");
      alert("Successfully Registered");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Your Account
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Name :
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  E-mail :
                </label>
                <Field
                  type="email"
                  name="mail"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Password :
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm Password :
                </label>
                <Field
                  type="password"
                  name="cpassword"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Already have an account?</p>
            <button
              onClick={() => navigate("/SignIn")}
              className="text-indigo-600 hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;


// // new design
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { validation } from "./Validation";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const initialValues = {
//   name: "",
//   email: "",
//   password: "",
//   cpassword: "",
// };

// function SignUp() {
//   const navigate = useNavigate();
//   const [checkUser, setCheckUser] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/allUsers")
//       .then((response) => setCheckUser(response.data.data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);

//   useEffect(() => {
//     console.log("users", checkUser);
//   }, [checkUser]);

//   const handleSubmit = (values) => {
//     const userMail = checkUser.filter((users) => users.mail === values.mail);

//     if (userMail.length > 0) {
//       alert("Already registered");
//     } else {
//       axios
//         .post("http://localhost:3000/api/register", {
//           email: values.mail,
//           password: values.password,
//           name: values.name,
//         })
//         .then(() => {
//           navigate("/SignIn");
//           alert("Successfully Registered");
//         })
//         .catch((error) => console.error("Error registering user:", error));
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//           Create Your Account
//         </h1>

//         <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-md border border-gray-100">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validation}
//             onSubmit={handleSubmit}
//           >
//             <Form className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name
//                 </label>
//                 <Field
//                   type="text"
//                   name="name"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
//                   placeholder="Enter your name"
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   E-mail
//                 </label>
//                 <Field
//                   type="email"
//                   name="mail"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
//                   placeholder="Enter your email"
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="password"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
//                   placeholder="Enter your password"
//                 />
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <Field
//                   type="password"
//                   name="cpassword"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-800 placeholder-gray-400"
//                   placeholder="Confirm your password"
//                 />
//                 <ErrorMessage
//                   name="cpassword"
//                   component="div"
//                   className="text-red-500 text-sm mt-1"
//                 />
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </Form>
//           </Formik>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{" "}
//               <button
//                 onClick={() => navigate("/SignIn")}
//                 className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
//               >
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUp;