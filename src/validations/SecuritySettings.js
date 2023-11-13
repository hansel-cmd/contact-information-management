import * as Yup from "yup";
import Api from "../services/api";

const SecuritySettingsSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old Password is required.")
    .test(
      "Incorrect Old Password",
      "Old Password is incorrect.",
      function (value) {
        return new Promise((resolve, reject) => {
          Api()
            .get(`user/update-password/?oldPassword=${value}`)
            .then((res) => {
              if (res.status === 200) {
                if ("error" in res.data) {
                  resolve(false);
                  return;
                }
                resolve(true);
              }
            })
            .catch((err) => {
              console.log("err", err)
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

export default SecuritySettingsSchema;
