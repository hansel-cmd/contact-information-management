import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./context/authContext";
import { LOGIN } from "./routes/route";
import { sendGETRequest, sendPOSTRequest } from "./services/service";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";
import { setItem, removeItem, getItem } from "./services/localStorage";
import Spinner from "./components/Spinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { showToast, handleShowToast } = useToast(3000);

  useEffect(() => {
    // check if access token is still valid by calling a request to the server.
    const getUser = async () => {
      try {
        const response = await sendGETRequest("user/me/");
        if (response?.status === 200) {
          setUser(response.data);
          return;
        }
      } catch (err) {
        // UnAuthorized 401. It means access token has expired.
        if (err.response?.status === 401) {
          // let's refresh the access token using refresh token.
          tryRefreshingAccessToken();
        } else {
          navigate(LOGIN);
        }
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryRefreshingAccessToken = async () => {
    try {
      /**
       * refresh = null, means there was no refresh_token and we cannot
       * further identify whether tokens are invalid or not.
       *
       * refresh = {value} means there was a refresh_token and we can
       * identify whether tokens are valid or not.
       */
      let refresh = getItem("refresh_token");
      if (refresh === null) {
        // There was no refresh_token given
        navigate(LOGIN);
        return;
      };

      const response = await sendPOSTRequest({ refresh }, "login/refresh/");
      if (response?.status === 200) {
        // access token is refreshed.
        setItem("token", response.data.access);
      }
    } catch (error) {
      // Unauthorized 401. It means all tokens are already invalid/expired.
      // We ask the user to log back in.
      if (error.response?.status === 401) {
        handleTokenExpiration();
        return;
      }
      // Other errors, just navigate back to login.
      navigate(LOGIN);
    }
  };

  const handleTokenExpiration = () => {
    removeItem("token");
    removeItem("refresh_token");
    // Show Toast
    handleShowToast();
    setTimeout(() => navigate(LOGIN, { replace: true }), 3500);
  };

  // MAKE SURE THAT WE ARE SHOWING LOADING SCREEN
  // WHEN WE SHOW THIS, NOT THE CHILDREN.
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

  if (Object.keys(user).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-">
          <Spinner isLoading={true} width={"w-10"} height={"h-10"}></Spinner>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
