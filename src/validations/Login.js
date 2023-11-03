import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username cannot be empty."),
  password: Yup.string().required("Password cannot be empty."),
});

export { LoginSchema };
