import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as route from "./routes/route";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Layout from "./Layout";
import NewContact from "./pages/NewContact";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route
            path={route.INDEX}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>
          <Route
            path={route.FAVORITES}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>
          <Route
            path={route.BLOCKED}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>
          <Route
            path={route.NEW_CONTACT}
            element={
              <Layout>
                <NewContact />
              </Layout>
            }
          ></Route>
          <Route
            path={route.UPDATE_PROFILE}
            element={
              <Layout>
                <UpdateProfile />
              </Layout>
            }
          ></Route>
          <Route
            path={route.SETTINGS}
            element={
              <Layout>
                <Home />
              </Layout>
            }
          ></Route>
          <Route path={route.LOGIN} element={<Login />}></Route>
          <Route path={route.SIGNUP} element={<Signup />}></Route>
          <Route
            path={route.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          ></Route>
          <Route path={route.NOT_FOUND} element={<NotFound />}></Route>
          <Route path={"*"} element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
