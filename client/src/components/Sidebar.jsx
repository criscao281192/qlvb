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

const iconStyle = {
  fontSize: "18px",
  color: 'red',
};

let MENUS = [
  {
    name: "Trang chủ",
    icon: <HomeOutlined style={iconStyle} />,
    link: "/",
    outside: false,
  },
  {
    name: "Văn bản đến",
    icon: <CloudUploadOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban",
    outside: false,
  },
  {
    name: "Văn bản đi",
    icon: <SendOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban-ban-hanh",
    outside: false,
  },
  {
    name: "Nhắc việc",
    icon: <ClockCircleOutlined style={iconStyle} />,
    link: "/thong-bao",
    outside: false,
  },
  {
    name: "Văn bản lưu",
    icon: <FolderOpenOutlined style={iconStyle} />,
    link: 'http://192.168.1.28/vanban/',
    outside: true,
  },
];

const Header = ({ isFold }) => {
  const [menus, setMenus] = useState(MENUS);
  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      if (userInfo.phan_quyen === "1") {
        setMenus([...menus, {
          name: "Quản lý tài khoản",
          icon: (
            <SolutionOutlined style={iconStyle} />
          ),
          link: "/quan-ly-tai-khoan",
          outside: false,
        }]);
      }
    }
  }, []);

  return (
    <Layout.Sider trigger={null} collapsible collapsed={isFold} style={{ background: '#defdda' }}>
      <AppLogoWrapper>
        <LogoImage src={logoImage} alt="Logo" className="logo"
          width={isFold ? '30px' : '110px'}
        />
      </AppLogoWrapper>
      <MenuWrapper mode="inline" style={{ backgroundColor: '#defdda' }}>
        {menus.map((menu, index) => {
          return (
            <Menu.Item key={index}>
              {menu.outside ? (
                <a href={menu.link} target="_blank">
                  {menu.icon}
                  <MenuTitle>
                    {menu.name}
                  </MenuTitle>
                </a>
              ) : (
                <Link to={menu.link}>
                  {menu.icon}
                  <MenuTitle>
                    {menu.name}
                  </MenuTitle>
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
