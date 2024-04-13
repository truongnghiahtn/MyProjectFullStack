import { Layout } from "antd";
import React from "react";
const { Content } = Layout;
const ContentLayout = ({children}) => {

  return (
    <>
      <Content>{children}</Content>
    </>
  );
};

export default ContentLayout;
