/* Core */
import * as Yup from "yup";

export const initialValues = {
  fname: "",
  lastname: "",
  email: "",
  phone: "",
};

export const validationSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .max(20, "Phone number must be at most 20 characters")
    .matches(/^[0-9]+$/, "Phone number should contain numeric characters only"),
});
