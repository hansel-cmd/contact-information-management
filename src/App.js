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
import IsNotAuthenticated from "./isNotAuthenticated";
import ContactDetail from "./pages/ContactDetail";
import { useDarkMode } from "./hooks/useDarkMode";
import FavoriteContacts from "./pages/FavoriteContacts";
import BlockedContacts from "./pages/BlockedContacts";
import EmergencyContacts from "./pages/EmergencyContacts";

function App() {
  const [user, setUser] = useState({});
  useDarkMode();
  const Provider = AuthContext.Provider;

  return (
    <div className="dark:bg-primaryDark-700 ">
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
                    <FavoriteContacts />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.EMERGENCY_CONTACTS}
              element={
                <ProtectedRoute>
                  <Layout>
                    <EmergencyContacts />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.BLOCKED}
              element={
                <ProtectedRoute>
                  <Layout>
                    <BlockedContacts />
                  </Layout>
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path={route.CONTACT_DETAIL}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Scroller>
                      <ContactDetail></ContactDetail>
                    </Scroller>
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
            <Route
              path={route.LOGIN}
              element={
                <IsNotAuthenticated>
                  <Login />
                </IsNotAuthenticated>
              }
            ></Route>
            <Route
              path={route.SIGNUP}
              element={
                <IsNotAuthenticated>
                  <Signup />
                </IsNotAuthenticated>
              }
            ></Route>
            <Route
              path={route.FORGOT_PASSWORD}
              element={
                <IsNotAuthenticated>
                  <ForgotPassword />
                </IsNotAuthenticated>
              }
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
