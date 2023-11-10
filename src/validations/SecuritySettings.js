import * as Yup from "yup";

const SecuritySettingsSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old Password is required.")
    .test(
      "Incorrect Old Password",
      "Old Password is incorrect.",
      function (value) {}
    ),
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

export default SecuritySettingsSchema;
