/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Col, Row, Dropdown, Layout, Space } from "antd";
import { FaSearch } from "react-icons/fa";
import {
  IoGameController,
  IoNewspaper,
  IoHomeSharp,
  IoVideocam,
  IoSettings,
} from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { CgMenuGridO } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useLocation,Link, useNavigate } from 'react-router-dom';
import { logOut } from "../../redux/auth/auth";
import { useDispatch } from "react-redux";

import logo from "../../assets/img/logo2.png"
const { Header } = Layout;
const HeaderLayout = () => {

  const [userLogo,setUserLogo]=useState(null);
  const [url,setUrl]=useState(null);

  const { auth } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const currentURL = location.pathname;
  const dispatch=useDispatch();
  useEffect(()=>{
    let logo= auth.photo.find((item)=>item.active===true);
    setUserLogo(`http://localhost:8100/${logo.src}`);

  },[auth])
  useEffect(()=>{
    let newUrl=currentURL.toLocaleLowerCase().replace('/', '');
    setUrl(newUrl);
  },[currentURL]);

  const onHanddleLink=(link)=>{
    navigate(link);
  }

  const items = [
    {
      key: "1",
      label: (
        <div
          className="header__menu--setting"
          style={{ justifyContent: "start" }}
        >
          <img
            src={userLogo}
            className="header__img"
          />
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
          onClick={onHanddleLink.bind(this,"/user-setting")}
        >
          <IoSettings className="menu__icon menu__icon--small" />
          <span
            style={{ fontSize: "16px", fontWeight: "600", marginLeft: "10px" }}
          >
            Cài đặt & quyền riêng tư
          </span>
        </div>
      )
    },
    {
      key: "3",
      danger: true,
      label: (
        <div
          className="header__menu--setting"
          style={{ justifyContent: "start" }}
          onClick={()=>dispatch(logOut())}
        >
          <ImExit className="menu__icon menu__icon--small"/>
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
      <Header className="header">
        <Row className="header__bg"></Row>
        <Row className="header__menu">
          <Col xs={2} xl={1} className="header__menu--col-1" >
            <img
              src={logo}
              className="header__img"
              style={{cursor:"pointer"}}
            />
          </Col>
          <Col xs={6} xl={4} className="header__menu--col-2">
            <div className="search">
              <input
                type="text"
                className="search__input"
                placeholder="Search"
              />
              <button className="search__button">
                <FaSearch className="search__icon" />
              </button>
            </div>
          </Col>
          <Col xs={10} xl={14} className="header__menu--col-3">
            <div className="header__menu--center">
              <IoHomeSharp onClick={onHanddleLink.bind(this,"/")} className={url===""?"menu__icon menu__icon--active":"menu__icon"} />
              <IoNewspaper onClick={onHanddleLink.bind(this,"/new")} className={url==="new"?"menu__icon menu__icon--active":"menu__icon"} />
              <IoGameController onClick={onHanddleLink.bind(this,"/quiz")} className={url==="quiz"?"menu__icon menu__icon--active":"menu__icon"} />
              <IoVideocam onClick={onHanddleLink.bind(this,"/video")} className={url==="video"?"menu__icon menu__icon--active":"menu__icon"} />
            </div>
          </Col>
          <Col xs={6} xl={5} className="header__menu--col-4">
            <div className="header__menu--setting">
              <IoIosNotifications className="menu__icon" />
              <CgMenuGridO className="menu__icon" />

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
      </Header>
    </>
  );
};

export default HeaderLayout;
