import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CloudUploadOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import logoImage from "../assets/img/Logo.png";
import "./stylesHeader.css";
import { jwtDecode } from "jwt-decode";

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

const BottomLeftContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ff0033;
  border-radius: 5px;
  z-index: -1;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;

  .custom-menu-item-user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const MenuItemUser = styled.li`
  list-style: none;
  color: #000000;
  &.custom-menu-item-user {
    text-transform: uppercase;
    display: flex;
    align-items: center;
    font-size: 20px;
    a {
      text-decoration: none;
    }
    transition: transform 0.2s, color 0.2s, box-shadow 0.2s;
    &:hover {
      transform: scale(1.1);
      font-weight: bold;
      text-decoration: underline;
    }
    &.custom-menu-item-user:hover {
      cursor: pointer;
    }
  }
`;

const Header = ({ onLogout }) => {
  const [userFullName, setUserFullName] = useState(null);
  const [showLeverAccount, setShowLeverAccount] = useState(false);
  const [isAccountMenuVisible, setAccountMenuVisible] = useState(false);

  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      setUserFullName(userInfo.fullname);
      setShowLeverAccount(userInfo.phan_quyen === "1");
    }
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  const toggleAccountMenu = () => {
    setAccountMenuVisible(!isAccountMenuVisible);
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
          {/* <MenuItem className="custom-menu-item">
            <Link to="/ChatCase">
              <CommentOutlined style={{ fontSize: "18px", color: "Red" }} />
              <span style={{ fontSize: "18px", color: "black" }}>NHẮN TIN</span>
            </Link>
          </MenuItem> */}
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
        </MenuList>
        <BottomLeftContainer>
          {userFullName && (
            <>
              <MenuItemUser
                className="custom-menu-item-user"
                onClick={toggleAccountMenu}
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#cd201f",
                  }}
                >
                  {userFullName}
                </span>
              </MenuItemUser>
              {isAccountMenuVisible && (
                <>
                  <hr />
                  {showLeverAccount && (
                    <MenuItemUser className="custom-menu-item-user">
                      <Link to="/indexUserName">
                        <UserAddOutlined
                          style={{ fontSize: "18px", color: "Red" }}
                        />
                      </Link>
                    </MenuItemUser>
                  )}
                  <MenuItemUser className="custom-menu-item-user">
                    <span onClick={handleLogout}>
                      <LogoutOutlined
                        style={{ fontSize: "18px", color: "Red" }}
                      />
                    </span>
                  </MenuItemUser>
                </>
              )}
            </>
          )}
        </BottomLeftContainer>
      </Menu>
    </div>
  );
};

export default Header;
