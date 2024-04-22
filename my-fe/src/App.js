import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import HeaderLayout from "./app/layout/HeaderLayout";
import FooterLayout from "./app/layout/FooterLayout";
import ContentLayout from "./app/layout/ContentLayout";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMe, setIsLoadingAuth } from "./redux/auth/auth";
import { setLoading } from "./redux/systerm/systerm";
import Loading from "./app/page/loading/Loading";

function App() {
  const auth = useSelector((state) => state.auth);
  const {isloading} = useSelector((state) => state.systerm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(setIsLoadingAuth());
      dispatch(getMe());
      setLoading(true);
    }
  }, [auth.isAuthenticated]);
  useEffect(() => {
    if (auth.status !== false && auth.isLoading === false) {
      setLoading(false);
    }
  }, [auth.status, auth.isLoading]);
  return (
    <>
      <Loading isLoading={isloading} />
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
