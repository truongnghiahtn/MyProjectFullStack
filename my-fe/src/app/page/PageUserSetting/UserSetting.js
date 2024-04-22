import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet,useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
const { Header, Sider, Content } = Layout;

const UserSetting = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {auth}= useSelector((state)=>state.auth);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const onHandleMenu = (value) => {
    navigate(value);
  };

  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["/user-setting"]}
            selectedKeys={[location.pathname]}
            onClick={(e) => onHandleMenu(e.key)}
            items={[
              {
                key: "/user-setting",
                icon: <UserOutlined />,
                label: `${auth.userName}`, // xem các thông tin cơ bản của bản thân.... //
                // chỉnh hình ảnh // chỉnh thông tin // chỉnh password
              },
              {
                key: "/user-setting/quick-view",
                icon: <VideoCameraOutlined />,
                label: "Sơ lược ", // tại đây trình bày thông tin bản thân theo dạng cv// cho phép cho in pdf
              },
              {
                key: "/user-setting/practice",
                icon: <UploadOutlined />,
                label: "Luyện tập", // tại đây cho phép viết nhật ký luyện tập /// có các thông tin luyện tập như bình thường
              },
              {
                key: "/admin",
                icon: <VideoCameraOutlined />,
                label: "Login dashboard", // tại đây cho phép vô trang admin //
                // user => chỉ cho phép xem, thêm , tạo mới, chính những bài quiz của mình,thêm những bài viết của bản thân
                // xem bản thân có những bài viết nào tương tác cuẩ những bài viết đó
                // manager => cho phép như user nhưng được quản lý tất các các bài viết và bài quiz đồng thời cả user
                // admin => như managaer tuy nhiên được thêm quyền chỉnh sửa các key quan trọng về hình ảnh trong trang web
              },
            ]}
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
            {/* Content */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default UserSetting;
