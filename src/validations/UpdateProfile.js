import * as Yup from "yup";
import Api from "../services/api";

const createEmailUpdateSchema = (id) => {
  return Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required.")
      .test(
        "Unique Email Address",
        "Email is already in use.", // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            Api()
              .get(`unique-email/?email=${value}&id=${id}`)
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
  });
};

const UpdateProfileSchema = Yup.object().shape({
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
  phoneNumber: Yup.string()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .test("len", "Invalid Phone Number", (value) => {
      if (!value || value.length === 0) {
        return true;
      }
      let number = value?.replace(/\s|\(|\)|-|_/g, "");
      return number?.length >= 13;
    })
    .test("Invalid Phone Number.", "Invalid Phone Number", function (value) {
      if (!value) {
        return true;
      }
      let number = value.replace(/[()\s-_]/g, "");
      number = encodeURIComponent(number);

      return new Promise((resolve, reject) => {
        Api()
          .get(`check-phone-number/?phoneNumber=${number}`)
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
    }),
});

export { createEmailUpdateSchema, UpdateProfileSchema };
