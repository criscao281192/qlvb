import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { bangVanBanDen } from "../src/api";
import styled from "styled-components";
import { Layout } from "antd";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./stylesApp.css";
import PrivateRoute from "./shared/routes/PrivateRoute";
import PublicRoute from "./shared/routes/PublicRoute";

const AppContainer = styled.div`
`;


const MainContainerSignIn = styled.div`
  background-color: rgb(230 100 100);
`;

const LayoutHeader = styled(Layout.Header)`
  background-color: #fff;
  padding: 0;
  border-bottom: 1px solid #f5f5f5;
`;

const LayoutContent = styled(Layout.Content)`
  margin: 24px 16px;
  padding: 24px;
  background-color: #fff;
  min-height: 280px;
`;



function App() {
  const [notifications, setNotifications] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFold, setIsFold] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
  };

  const handleApiError = (error, message) => {
    console.error(`${message}:`, error);
  };


  useEffect(() => {
    const fetchDataVanBanDen = async () => {
      try {
        const response = await bangVanBanDen();
        setNotifications(response.data.result);
      } catch (err) {
        handleApiError(err, "LỖI API LẤY DANH SÁCH THÔNG BÁO");
      }
    };

    fetchDataVanBanDen();
  }, []);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleSidebar = () => {
    setIsFold(!isFold);
  }

  return (
    <Router>
      <AppContainer>
        {isLoggedIn ? (
          <Layout style={{ background: 'white' }}>
            <Sidebar isFold={isFold} />
            <Layout style={{ background: 'white' }}>
              <LayoutHeader>
                <Header
                  notifications={notifications}
                  toggleSidebar={toggleSidebar}
                  onLogout={handleLogout}
                />
              </LayoutHeader>
              <LayoutContent>
                <PrivateRoute />
              </LayoutContent>
            </Layout>
          </Layout>
        ) : (
          <MainContainerSignIn>
            <PublicRoute handleLoginSuccess={handleLoginSuccess} />
          </MainContainerSignIn>
        )}
      </AppContainer>
    </Router>
  );
}

export default App;
