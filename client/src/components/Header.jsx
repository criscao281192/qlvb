import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Menu = styled.div`
  background-color: green;
  padding: 10px;
`;

const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;
const MenuItem = styled.li`
  list-style: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: 20px;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

const Container = styled.div`
  max-width: 1680px;
  margin: auto;
`;

const Header = () => {
  return (
    <div>
      <Menu>
        <Container>
          <MenuList>
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/quan-ly-van-ban">CÔNG VĂN</Link>
            </MenuItem>
            <MenuItem>
              <a href="http://192.168.1.28/vanban/" rel="noreferrer" target="_blank">
                Lưu văn bản
              </a>
            </MenuItem>
          </MenuList>
        </Container>
      </Menu>
    </div>
  );
};

export default Header;
