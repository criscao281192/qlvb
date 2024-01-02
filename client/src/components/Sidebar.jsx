import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CloudUploadOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  UserAddOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import logoImage from "../assets/img/Logo.png";
import { jwtDecode } from "jwt-decode";
import { Layout, Menu } from "antd";

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

const LogoImage = styled.img`
`;

const MenuTitle = styled.span`
  font-size: 18px;
  color: black;
  text-transform: uppercase;
  font-weight: 600;
`;

let MENUS = [
  {
    name: "Trang chủ",
    icon: <HomeOutlined style={{ fontSize: "18px", color: "Red" }} />,
    link: "/",
    outside: false,
  },
  {
    name: "Văn bản đến",
    icon: <CloudUploadOutlined style={{ fontSize: "18px", color: "Red" }} />,
    link: "/quan-ly-van-ban",
    outside: false,
  },
  {
    name: "Văn bản đi",
    icon: <SendOutlined style={{ fontSize: "18px", color: "Red" }} />,
    link: "/quan-ly-van-ban-ban-hanh",
    outside: false,
  },
  {
    name: "Nhắc việc",
    icon: <ClockCircleOutlined style={{ fontSize: "18px", color: "Red" }} />,
    link: "/thong-bao",
    outside: false,
  },
  {
    name: "Văn bản lưu",
    icon: <FolderOpenOutlined style={{ fontSize: "18px", color: "Red" }} />,
    link: 'http://192.168.1.28/vanban/',
    outside: true,
  },
];

const Header = ({ isFold }) => {
  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      if (userInfo.phan_quyen === "1") {
        MENUS.push({
          name: "Quản lý tài khoản",
          icon: (
            <SolutionOutlined style={{ fontSize: "18px", color: "Red" }} />
          ),
          link: "/quan-ly-tai-khoan",
          outside: false,
        })
      }
    }
  }, []);

  return (
    <Layout.Sider trigger={null} collapsible collapsed={isFold} style={{ background: '#defdda' }}>
      <AppLogoWrapper>
        <LogoImage src={logoImage} alt="Logo" className="logo"
          width={isFold ? '50px' : '110px'}
        />
      </AppLogoWrapper>
      <MenuWrapper mode="inline" collapsed={isFold} style={{ backgroundColor: '#defdda' }}>
        {MENUS.map((menu, index) => {
          return (
            <Menu.Item className="custom-menu-item" key={index}>
              <Link to={menu.link} target={menu.outside ? '_blank' : ''}>
                {menu.icon}
                <MenuTitle>
                  {menu.name}
                </MenuTitle>
              </Link>
            </Menu.Item>
          );
        })}
      </MenuWrapper>
    </Layout.Sider>
  );
};

export default Header;
