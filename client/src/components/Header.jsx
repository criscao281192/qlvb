import React, { useState, useEffect } from "react";
import {
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Avatar, Badge } from "antd";
import { useHistory } from "react-router-dom";
import NotificationTable from "./NotificationTable";
import { jwtDecode } from "jwt-decode";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100%;
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 20px;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const iconStyle = {
  fontSize: "20px",
  color: "#000",
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Header = ({ notifications, toggleSidebar, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [avatarBackgroundColor, setAvatarBackgroundColor] = useState("");
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = jwtDecode(accessToken);
      if (userInfo && userInfo.fullname) {
        const initials = userInfo.fullname
          .split(" ")
          .map((word) => word[0])
          .join("");
        setUserInitials(initials);
        setAvatarBackgroundColor(getRandomColor());
      }
    }
  }, []);

  const onAccountHandler = () => {
    history.push("/trang-ca-nhan");
  };

  return (
    <Wrapper>
      <MenuFoldOutlined style={iconStyle} onClick={toggleSidebar} />

      <MenuList>
        <MenuItem
          onClick={() => {
            setIsHovered(!isHovered);
          }}
        >
          <Badge count={notifications.length}>
            <BellOutlined style={iconStyle} />
          </Badge>
        </MenuItem>
        <MenuItem onClick={onAccountHandler}>
          <Avatar
            style={{
              backgroundColor: avatarBackgroundColor,
              color: "#fff",
            }}
          >
            {userInitials}
          </Avatar>
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <LogoutOutlined style={iconStyle} />
        </MenuItem>
      </MenuList>
      {isHovered && (
        <NotificationTable
          notifications={[...notifications]}
          onClickItem={() => {
            setIsHovered(false);
          }}
        />
      )}
    </Wrapper>
  );
};

export default Header;
