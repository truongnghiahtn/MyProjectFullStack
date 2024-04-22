import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined 
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet,useLocation, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const PageAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    getItem("DashBoard", "1", <PieChartOutlined />),
    getItem("Users", "sub1", <UserOutlined />, [
      getItem("Tom", "3"),
      getItem("Bill", "4"),
      getItem("Alex", "5"),
    ]),
    getItem("Quizs", "sub2", <TeamOutlined />, [
      getItem("Manager question", "6"),
      getItem("Manager quiz", "8"),
    ]),
    getItem("Blog", "sub3", <TeamOutlined />, [
      getItem("Manager Blog", "9"),
    ]),
    getItem("Home", "11", <HomeOutlined />),
  ];
  console.log(items);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default PageAdmin;
