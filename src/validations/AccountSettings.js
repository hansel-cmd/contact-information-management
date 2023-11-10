import * as Yup from "yup";
import Api from "../services/api";

const createUsernameSchema = (id) => {
  return Yup.object().shape({
    username: Yup.string()
      .required("Username is required.")
      .matches(/^\S*$/, "Username should not contain spaces")
      .test(
        "Unique Username",
        "Username is already in use.", // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            Api()
              .get(`unique-username/?username=${value}&id=${id}`)
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
      )
      .test("len", "(Minimum of 4 characters)", (value) => {
        return value.length >= 4;
      }),
  });
};

export default createUsernameSchema