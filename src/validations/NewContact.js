import * as Yup from "yup";
import Api from "../services/api";

const NewContactSchema = Yup.object().shape({
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
    .required("Phone Number is required.")
    .test("Invalid Phone Number.", "Invalid Phone Number", function (value) {
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
  houseNo: Yup.string()
    .required("House No is required.")
    .matches(/^[0-9]*$/, "House No should contain only numbers."),
  street: Yup.string().required("Street is required."),
  city: Yup.string().required("City is required."),
  province: Yup.string().required("Province is required."),
  zipCode: Yup.string()
    .required("Zip Code is required.")
    .matches(/^[0-9]*$/, "ZIp Code should contain only numbers."),
  delivery_houseNo: Yup.string()
    .required("House No is required.")
    .matches(/^[0-9]*$/, "House No should contain only numbers."),
  delivery_street: Yup.string().required("Street is required."),
  delivery_city: Yup.string().required("City is required."),
  delivery_province: Yup.string().required("Province is required."),
  delivery_zipCode: Yup.string()
    .required("Zip Code is required.")
    .matches(/^[0-9]*$/, "Zip Code should contain only numbers."),
});

export { NewContactSchema };
