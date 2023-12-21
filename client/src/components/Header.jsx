import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CloudUploadOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  CommentOutlined,
  LogoutOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import logoImage from "../assets/img/Logo.png";
import "./stylesHeader.css";

const Menu = styled.div`
  background-color: #defdda;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.li`
  list-style: none;
  padding: 10px;
  color: #000000;
  &.custom-menu-item {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    font-size: 20px;
    a {
      text-decoration: none;
    }
    .anticon svg {
      margin-right: 10px;
    }
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.1);
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Header = ({ onLogout }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("currentUser"));
  //   if (storedUser) {
  //     setCurrentUser(storedUser);
  //   }
  // }, []);

  const handleLogout = () => {
    // localStorage.removeItem("currentUser");
    onLogout();
  };
  return (
    <div className="menu-container">
      <Menu>
        <MenuList>
          <img src={logoImage} alt="Logo" className="logo" />
          <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{ fontSize: "20px", fontWeight: "bold", color: "#1A1249" }}
            >
              QUẢN LÝ VĂN BẢN
            </span>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/">
              <HomeOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                TRANG CHỦ
              </span>
            </Link>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/quan-ly-van-ban">
              <CloudUploadOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                VĂN BẢN ĐẾN
              </span>
            </Link>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/quan-ly-van-ban-ban-hanh">
              <SendOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                VĂN BẢN ĐI
              </span>
            </Link>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/ThongBaoVanBanDenHan">
              <ClockCircleOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                NHẮC VIỆC
              </span>
            </Link>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/ChatCase">
              <CommentOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>NHẮN TIN</span>
            </Link>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <a
              href="http://192.168.1.28/vanban/"
              rel="noreferrer"
              target="_blank"
            >
              <FolderOpenOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                VĂN BẢN LƯU
              </span>
            </a>
          </MenuItem>
          <MenuItem className="custom-menu-item">
            <Link to="/indexUserName">
              <UserAddOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>TÀI KHOẢN</span>
            </Link>
          </MenuItem>
          {/* <MenuItem
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentUser && (
              <span
                style={{ fontSize: "20px", fontWeight: "bold", color: "#1A1249" }}
              >
                {currentUser.fullname}
              </span>
            )}
          </MenuItem> */}
          <MenuItem className="custom-menu-item">
            <span onClick={handleLogout}>
              <LogoutOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>
                ĐĂNG XUẤT
              </span>
            </span>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Header;
