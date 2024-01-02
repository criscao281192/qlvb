import React, { useState } from 'react'
import { BellOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Avatar, Badge } from 'antd';
import { useHistory } from "react-router-dom";
import NotificationTable from './NotificationTable';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 20px;
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
  color: "#000"
};


const Header = ({ notifications, toggleSidebar, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

  const onAccountHandler = () => {
    history.push("/trang-ca-nhan");
  }

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
            <BellOutlined
              style={iconStyle}
            />
          </Badge>
        </MenuItem>
        <MenuItem onClick={onAccountHandler}>
          <Avatar src="/avatar.jpg" />
        </MenuItem>

        <MenuItem onClick={onLogout}>
          <LogoutOutlined style={iconStyle} />
        </MenuItem>
      </MenuList>
      {isHovered && (
        <NotificationTable notifications={[...notifications, ...notifications, ...notifications]} onClickItem={() => {
          setIsHovered(false);
        }} />
      )}
    </Wrapper>
  )
}

export default Header
