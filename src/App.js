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
import Settings from "./pages/Settings";
import Scroller from "./components/Scroller";
import EditContact from "./pages/EditContact";
import { useState } from "react";
import AuthContext from "./context/authContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [user, setUser] = useState({});
  const Provider = AuthContext.Provider;

  return (
    <div className="min-h-screen">
      <Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path={route.INDEX}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.FAVORITES}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.BLOCKED}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.NEW_CONTACT}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Scroller>
                      <NewContact />
                    </Scroller>
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.UPDATE_PROFILE}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Scroller>
                      <UpdateProfile />
                    </Scroller>
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.SETTINGS}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.UPDATE_CONTACT}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Scroller>
                      <EditContact />
                    </Scroller>
                  </Layout>
                </ProtectedRoute>
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
      </Provider>
    </div>
  );
}

export default App;
