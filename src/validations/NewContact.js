import * as Yup from "yup";

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
  phoneNumber: Yup.string().required("Phone Number is required."),
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
