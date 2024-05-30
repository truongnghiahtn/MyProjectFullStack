import React, { useState,useEffect } from "react";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet,useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllTopic,setDefaultTopic,setIsLoadingTopic } from "../redux/topic/topic";

//
import HeaderAdmin from "./Layout/HeaderAdmin";

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("DashBoard", "/admin", <PieChartOutlined />),
  getItem("Users", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Quizs", "sub2", <TeamOutlined />, [
    getItem("Manager question", "/admin/manager-question"),
    getItem("Manager quiz", "8"),
  ]),
  getItem("Blog", "sub3", <TeamOutlined />, [getItem("Manager Blog", "9")]),
  getItem("Home", "11", <HomeOutlined />),
];

const PageAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch=useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoadingTopic());
    dispatch(getAllTopic());
  
    return () => {
      dispatch(setDefaultTopic());
    }
  }, [])
  
  
  // const [isloading, setIsloading] = useState(true);
  // const { auth } = useSelector((state) => state.auth);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();




  const onHandleMenu = (value) => {
    navigate(value);
  };
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
          mode="inline"
          defaultSelectedKeys={["/admin"]}
          selectedKeys={[location.pathname]}
          onClick={(e) => onHandleMenu(e.key)}
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
          <HeaderAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
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
