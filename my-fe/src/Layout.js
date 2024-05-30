import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute.js";
import React, { Suspense } from "react";
import Login from "./app/page/auth/Login.js";
import Register from "./app/page/auth/Register.js";
import ActiveUser from "./app/page/auth/PageActive.js";
import PageNotFound from "./app/page/PageNotFound.js";

//APP
import Home from "./app/page/PageHome/Home.js";
import Quiz from "./app/page/PageQuiz/Quiz.js";
import Video from "./app/page/PageVideo/Video.js";
import New from "./app/page/PageNew/New.js";

import UserSetting from "./app/page/PageUserSetting/UserSetting.js";
import HomeSetting from "./app/page/PageUserSetting/HomeSetting.js";
import Quickview from "./app/page/PageUserSetting/Quickview.js";
// import Practice from "./app/page/PageUserSetting/Practice.js";
import Practice from "./app/page/PageUserSetting/Practice.js";

//admin
import PageAdmin from "./admin/PageAdmin.js";
import Dashboard from "./admin/page/dashboard/Dashboard.js";
import ManagerQuestion from "./admin/page/managerQuestion/ManagerQuestion.js";
import ManagerUser from "./admin/page/managerUser/ManagerUser.js";

const Layout = (props) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <Quiz />
                </PrivateRoute>
              }
            />
            <Route
              path="/new"
              element={
                <PrivateRoute>
                  <New />
                </PrivateRoute>
              }
            />
            <Route
              path="/video"
              element={
                <PrivateRoute>
                  <Video />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-setting"
              element={
                <PrivateRoute>
                  <UserSetting />
                </PrivateRoute>
              }
            >
              <Route
                index
                element={
                  <PrivateRoute>
                    <HomeSetting />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-setting/quick-view"
                element={
                  <PrivateRoute>
                    <Quickview />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user-setting/practice"
                element={
                  <PrivateRoute>
                    <Practice />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
          <Route path="/admin" element={<PageAdmin />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/manager-user"
              element={
                <PrivateRoute>
                  <ManagerUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/manager-question"
              element={
                <PrivateRoute>
                  <ManagerQuestion />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/active-user/:token" element={<ActiveUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Suspense>
  );
};
export default Layout;
