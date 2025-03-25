import * as Yup from "yup";

export const validation = Yup.object({
  name: Yup.string().min(3).required("Enter name"),
  mail: Yup.string().email("Invalid e-mail").required("Enter Mail"),
  password: Yup.string()
    .min(5, "at least 5 characters")
    .required("Enter a password"),

  cpassword: Yup.string().oneOf([Yup.ref("password"), "Password not match"]),
});
