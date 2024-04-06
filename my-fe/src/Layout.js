import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./PrivateRoute.js";
import React,{Suspense} from "react";
import Login from "./app/page/auth/Login.js";
import Register from "./app/page/auth/Register.js";
import ActiveUser from "./app/page/auth/PageActive.js";
import PageNotFound from "./app/page/PageNotFound.js";

const Layout = (props) => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* <Route index element={<Home />} /> */}
            {/* <Route path="user" element={<PrivateRoute><ListQuiz /></PrivateRoute>} /> */}
          </Route>
          {/* <Route path="quiz/:id" element={<DetailQuiz />} /> */}
          {/* <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="manager-user" element={<ManagerUser />} />
            <Route path="manager-quiz" element={<ManagerQuiz />} />
            <Route path="manager-questions" element={<ManagerQuestion />} />
          </Route> */}
          <Route path="/active-user/:token" element={<ActiveUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='*' element={<PageNotFound/>} />
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
