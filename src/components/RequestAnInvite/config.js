/* Core */
import * as Yup from "yup";

export const emailTypeOptions = [
  {
    label: "Primary Email",
    value: "email1",
  },
  {
    label: "Secondary Email",
    value: "email2",
  },
];

export const initialValues = {
  email: "",
  emailType: emailTypeOptions[0].value,
  username: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Email is required"),
});
