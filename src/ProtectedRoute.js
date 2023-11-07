import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/authContext";
import { LOGIN } from "./routes/route";
import { sendGETRequest, sendPOSTRequest } from "./services/service";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";
import { setItem, removeItem } from "./services/localStorage";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { showToast, handleShowToast } = useToast(3000);

  useEffect(() => {
    // check if access token is still valid by calling a request to the server.
    const getUser = async () => {
      try {
        const response = await sendGETRequest("user/me/");
        if (response.status === 200) {
          setUser(response.data);
          return;
        }
      } catch (err) {
        // UnAuthorized 401. It means access token has expired.
        if (err.response.status === 401) {
          // let's refresh the access token using refresh token.
          try {
            const refresh = localStorage.getItem("refresh_token");
            const response = await sendPOSTRequest(
              { refresh },
              "login/refresh/"
            );
            if (response.status === 200) {
              setItem("token", response.data.access);
              return;
            }
          } catch (error) {
            // Unauthorized 401. It means all  tokens are already invalid/expired.
            // We ask the user to log back in.
            if (error.response.status === 401) {
              removeItem('token');
              removeItem('refresh_token');
              // Show Toast
              handleShowToast();
              setTimeout(() => {
                navigate(LOGIN, { replace: true });
              }, 3500);
              return;
            }
          }
        }

        navigate(LOGIN);
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showToast) {
    return (
      <>
        {children}
        <Toast
          message="Your session has expired. Please log in again."
          showToast={showToast}
        ></Toast>
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
