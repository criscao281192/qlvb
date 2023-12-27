import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { countCasesVanBanDenDay, bangVanBanDen } from "../src/api";
import styled from "styled-components";
import { Badge } from "antd";
import { BellTwoTone } from "@ant-design/icons";
import Header from "./components/Header";
import Cases from "./pages/Cases";
import CaseVanBanBanHanhs from "./pages/Cases/indexVanBanBanHanh";
import UserList from "./pages/Users/UserList";
import NewCase from "./pages/Cases/NewCase";
import NewCaseHandle from "./pages/Cases/NewCaseHandle";
import NewCaseMember from "./pages/Cases/NewCaseMember";
import NewCaseVanBanBanHanh from "./pages/Cases/NewCaseVanBanBanHanh";
import ThongBaoVanBanDenHan from "./pages/Home/ThongBaoVanBanDenHan";
import ChatCase from "./pages/Cases/ChatCase";
import Home from "./pages/Home/ThongKe";
import Login from "./components/Login";
import NewUserForm from "./pages/Users/Create";

import "./stylesApp.css";
import moment from "moment";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
  position: relative;
`;

const HeaderContainer = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 20px;
`;

const MainContainer = styled.div`
  padding: 20px;
`;

const MainContainerSignIn = styled.div`
  padding: 20px;
`;

const NotificationPopup = styled.div`
  position: fixed;
  top: 40px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  z-index: 1;
  max-height: 100%;
  max-width: 300px;
  overflow-y: auto;

  &.visible {
    display: block;
  }
`;

function App() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const fetchDataVanBanDen = async () => {
    try {
      const response = await bangVanBanDen();
      setNotifications(response.data.result);
    } catch (err) {
      handleApiError(err, "LỖI API LẤY DANH SÁCH THÔNG BÁO");
    }
  };

  useEffect(() => {
    countCasesVanBanDenDay({})
      .then((response) => {
        setNotificationCount(response.data);
      })
      .catch((err) => {
        console.error("LỖI API:", err);
      });
  }, []);

  useEffect(() => {
    if (isHovered) {
      fetchDataVanBanDen();
      setIsTableVisible(true);
      setTimeout(() => {
        setIsTableVisible(false);
      }, 10000);
    }
  }, [isHovered]);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <AppContainer>
        {isLoggedIn ? (
          <>
            <HeaderContainer>
              <Header onLogout={handleLogout} />
            </HeaderContainer>
            <MainContainer>
              <div className="notification-container">
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link to="/quan-ly-van-ban">
                    <Badge count={notificationCount}>
                      <BellTwoTone
                        style={{ fontSize: "24px", color: "#08979c" }}
                      />
                    </Badge>
                  </Link>
                  {isHovered && (
                    <NotificationPopup
                      style={{
                        display: isTableVisible ? "block" : "none",
                      }}
                    >
                      {isTableVisible && (
                        <table>
                          <tbody>
                            {notifications.map((notification) => (
                              <tr key={notification.id}>
                                <td style={{ fontSize: "10px" }}>
                                  {notification.ten_don_vi}
                                </td>
                                <td style={{ fontSize: "10px" }}>
                                  {notification.so_van_ban}
                                </td>
                                <td style={{ fontSize: "10px" }}>
                                  {notification.ngay_ban_hanh
                                    ? moment(notification.ngay_ban_hanh).format(
                                        "DD/MM/YYYY"
                                      )
                                    : "-"}
                                </td>
                                <td style={{ fontSize: "10px" }}>
                                  {notification.ngay_tiep_nhan
                                    ? moment(
                                        notification.ngay_tiep_nhan
                                      ).format("DD/MM/YYYY")
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </NotificationPopup>
                  )}
                </div>
              </div>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/ChatCase">
                  <ChatCase />
                </Route>
                <Route path="/ThongBaoVanBanDenHan">
                  <ThongBaoVanBanDenHan />
                </Route>
                <Route path="/quan-ly-van-ban/new">
                  <NewCase />
                </Route>
                <Route path="/quan-ly-van-ban/edit/:id">
                  <NewCase />
                </Route>
                <Route path="/quan-ly-van-ban/edithandle/:id">
                  <NewCaseHandle />
                </Route>
                <Route path="/quan-ly-van-ban/editmember/:id">
                  <NewCaseMember />
                </Route>
                <Route path="/quan-ly-van-ban">
                  <Cases />
                </Route>
                <Route path="/quan-ly-van-ban-ban-hanh/new-van-ban-ban-hanh">
                  <NewCaseVanBanBanHanh />
                </Route>
                <Route path="/quan-ly-van-ban-ban-hanh/edit/:id">
                  <NewCaseVanBanBanHanh />
                </Route>
                <Route path="/quan-ly-van-ban-ban-hanh">
                  <CaseVanBanBanHanhs />
                </Route>
                <Route path="/quan-ly-tai-khoan/tao-moi">
                  <NewUserForm />
                </Route>
                <Route path="/quan-ly-tai-khoan/edit/:id">
                  <NewUserForm />
                </Route>
                <Route path="/quan-ly-tai-khoan">
                  <UserList />
                </Route>
              </Switch>
            </MainContainer>
          </>
        ) : (
          <>
            <MainContainerSignIn>
              <div className="user-signin">
                <Switch>
                  <Route path="/dang-ky-tai-khoan">
                    <NewUserForm />
                  </Route>
                  <Route path="/">
                    <Login onLogin={handleLoginSuccess} />
                  </Route>
                </Switch>
              </div>
            </MainContainerSignIn>
          </>
        )}
      </AppContainer>
    </Router>
  );
}

export default App;
