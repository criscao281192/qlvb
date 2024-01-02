import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CloudUploadOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logoImage from "../assets/img/Logo.png";
import { jwtDecode } from "jwt-decode";
import { Layout, Menu } from "antd";
import { Roles } from "../shared/constants/roles";

const MenuWrapper = styled(Menu)`
  &&& .ant-menu-item-selected {
    background-color: orange;
  }

  &&& .ant-menu-item::after {
    border-right: 3px solid red;
  }
`;

const AppLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 64px;
`;

const LogoImage = styled.img``;

const MenuTitle = styled.span`
  font-size: 18px;
  color: black;
  text-transform: uppercase;
  font-weight: 600;
`;

const iconStyle = {
  fontSize: "18px",
  color: "red",
};

let menus = [
  {
    name: "Trang chủ",
    icon: <HomeOutlined style={iconStyle} />,
    link: "/",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Văn bản đến",
    icon: <CloudUploadOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Văn bản đi",
    icon: <SendOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban-ban-hanh",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Nhắc việc",
    icon: <ClockCircleOutlined style={iconStyle} />,
    link: "/thong-bao",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Văn bản lưu",
    icon: <FolderOpenOutlined style={iconStyle} />,
    link: "http://192.168.1.28/vanban/",
    outside: true,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Quản lý tài khoản",
    icon: <SolutionOutlined style={iconStyle} />,
    link: "/quan-ly-tai-khoan",
    outside: false,
    roles: [Roles.Admin],
  },
];

const Header = ({ isFold }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={isFold}
      style={{ background: "#defdda", height: "100vh" }}
    >
      <AppLogoWrapper>
        <LogoImage
          src={logoImage}
          alt="Logo"
          className="logo"
          width={isFold ? "30px" : "110px"}
        />
      </AppLogoWrapper>
      <MenuWrapper
        mode="inline"
        style={{ backgroundColor: "#defdda", height: "calc(100vh - 64px)" }}
      >
        {menus.map((menu, index) => {
          return (
            <Menu.Item key={index}>
              {menu.outside ? (
                <a href={menu.link} target="_blank" rel="noreferrer">
                  {menu.icon}
                  <MenuTitle>{menu.name}</MenuTitle>
                </a>
              ) : (
                <Link to={menu.link}>
                  {menu.icon}
                  <MenuTitle>{menu.name}</MenuTitle>
                </Link>
              )}
            </Menu.Item>
          );
        })}
      </MenuWrapper>
    </Layout.Sider>
  );
};

export default Header;
