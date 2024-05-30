import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoSettings } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { Button, Col, Row, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { logOut } from "../../redux/auth/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const HeaderAdmin = ({ collapsed, setCollapsed }) => {
  const dispatch = useDispatch();
  const [userLogo, setUserLogo] = useState(null);
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    let logo = auth.photo.find((item) => item.active === true);
    setUserLogo(`http://localhost:8100/${logo?.src}`);
  }, [auth]);

  const navigate = useNavigate();
  const onHanddleLink = (link) => {
    navigate(link);
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="header__menu--setting"
          style={{ justifyContent: "start" }}
        >
          <img src={userLogo} className="header__img" />
          <span
            style={{ fontSize: "16px", fontWeight: "600", marginLeft: "10px" }}
          >
            {auth.userName}
          </span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="header__menu--setting"
          style={{ justifyContent: "start" }}
          onClick={onHanddleLink.bind(this, "/user-setting")}
        >
          <IoSettings className="menu__icon menu__icon--small" />
          <span
            style={{ fontSize: "16px", fontWeight: "600", marginLeft: "10px" }}
          >
            Cài đặt & quyền riêng tư
          </span>
        </div>
      ),
    },
    {
      key: "3",
      danger: true,
      label: (
        <div
          className="header__menu--setting"
          style={{ justifyContent: "start" }}
          onClick={() => dispatch(logOut())}
        >
          <ImExit className="menu__icon menu__icon--small" />
          <span
            style={{ fontSize: "16px", fontWeight: "600", marginLeft: "10px" }}
          >
            Đăng xuất
          </span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Row
        className="header__menu"
        style={{
          padding: 0,
          justifyContent: "space-between",
          height: "initial",
        }}
      >
        <Col sm={2} xl={1} className="header__menu--col-1">
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
        </Col>
        <Col sm={16} xl={8} className="header__menu--col-2">
          <div className="search">
            <input type="text" className="search__input" placeholder="Search" />
            <button className="search__button">
              <FaSearch className="search__icon" />
            </button>
          </div>
          <div
            className="header__menu--setting header__menu--setting-admin"
            style={{ marginRight: "2rem" }}
          >
            <IoIosNotifications className="menu__icon" />
            <Dropdown menu={{ items }} overlayStyle={{ padding: "20px" }}>
              <img
                src={userLogo}
                className="header__img"
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default HeaderAdmin