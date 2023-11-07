import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INDEX } from "./routes/route";
import { sendPOSTRequest } from "./services/service";
import { getItem } from "./services/localStorage";
import AuthContext from "./context/authContext";
import Spinner from "./components/Spinner";

const IsNotAuthenticated = ({ children }) => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // check if refresh token exists or not yet blacklisted.
    const getUser = async () => {
      try {
        setIsLoading(true)
        const refresh = getItem("refresh_token");
        if (refresh === null) return;

        const response = await sendPOSTRequest({ refresh }, "login/refresh/");
        if (response.status === 200) {
          navigate(INDEX, { replace: true });
          setIsLoading(false)
          return;
        }
        return;
      } catch (error) {
        console.log("isNotAuthenticated", error)
      }
    };
    
    getUser();
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If user is not empty, and it is still fetching data
  if (Object.keys(user).length !== 0 && isLoading) {
    console.log(user)
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

export default IsNotAuthenticated;
