import Api from "../services/api";
import * as Yup from "yup";
import { PasswordSchema } from "./Signup";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required.")
    .test(
      "Existing Email Address",
      "This Email is not associated with any account.", // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          Api()
            .get(`is-email-existing/?email=${value}`)
            .then((res) => {
              if (res.status === 200) {
                if ("error" in res.data) {
                  resolve(false);
                  return;
                }
                resolve(true);
              }
            })
            .catch((error) => {
              resolve(false);
            });
        });
      }
    ),
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

export { ForgotPasswordSchema, PasswordSchema };
