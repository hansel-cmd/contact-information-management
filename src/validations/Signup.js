import Api from "../services/api";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z ]+$/,
      "First Name should contain only alphabetic characters."
    )
    .required("First Name is required."),
  lastName: Yup.string()
    .matches(
      /^[A-Za-z ]+$/,
      "Last Name should contain only alphabetic characters."
    )
    .required("Last Name is required."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Email is required.")
    .test(
      "Unique Email Address",
      "Email is already in use.", // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          Api()
            .get(`unique-email/?email=${value}`)
            .then((res) => {
              if (res.status === 200) {
                if ('error' in res.data) {
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
  username: Yup.string()
    .required("Username is required.")
    .matches(/^\S*$/, 'Username should not contain spaces')
    .test(
      "Unique Username",
      "Username is already in use.", // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          Api()
            .get(`unique-username/?username=${value}`)
            .then((res) => {
              if (res.status === 200) {
                if ('error' in res.data) {
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
    )
    .test("len", "(Minimum of 4 characters)", (value) => {
      return value.length >= 4;
    }),
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .required("Confirm Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .test("len", "Very weak (Minimum of 8 characters)", (value) => {
      return value.length > 3;
    })
    .test("len", "Weak (Minimum of 8 characters)", (value) => {
      return value.length >= 8;
    })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least 1 uppercase, 1 lowercase, and 1 special character, without spaces."
    ),
});

export { SignUpSchema, PasswordSchema };
