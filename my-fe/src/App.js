import { Layout } from "antd";
import React, { useEffect } from "react";
import HeaderLayout from "./app/layout/HeaderLayout";
import FooterLayout from "./app/layout/FooterLayout";
import ContentLayout from "./app/layout/ContentLayout";
import { Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getMe } from "./redux/auth/auth";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(auth.isAuthenticated){
      console.log("chay dong nay");
      dispatch(getMe());
    }
  },[auth])
  return (
    <>
      <Layout theme="light">
        <HeaderLayout />
        <ContentLayout>
          <Outlet />
        </ContentLayout>
        <FooterLayout />
      </Layout>
    </>
  );
}

export default App;
