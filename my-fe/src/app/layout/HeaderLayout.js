/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Col, Row, Dropdown, Layout, Space } from "antd";
import { FaSearch } from "react-icons/fa";
import {
  IoGameController,
  IoNewspaper,
  IoHomeSharp,
  IoVideocam,
} from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
const { Header } = Layout;
const HeaderLayout = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      danger: true,
      label: "a danger item",
    },
  ];
  return (
    <>
      <Header className="header">
        <Row className="header__bg"></Row>
        <Row className="header__menu">
          <Col xs={2} xl={1} className="header__menu--col-1">
            <img
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              className="header__img"
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
              <IoHomeSharp className="menu__icon menu__icon--active" />
              <IoNewspaper className="menu__icon" />
              <IoGameController className="menu__icon" />
              <IoVideocam className="menu__icon" />
            </div>
          </Col>
          <Col xs={6} xl={5} className="header__menu--col-4">
            <div className="header__menu--setting">
              <IoIosNotifications className="menu__icon" />
              <CgMenuGridO className="menu__icon" />
              
              <Dropdown menu={{ items }}>
              <img
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                className="header__img"
                style={{cursor:"po"}}
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
