import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  countCasesVanBanDenDay,
  bangVanBanDen,
  bangVanBanDenHan,
} from "../src/api";
import styled, { keyframes } from "styled-components";
import { Badge } from "antd";
import { BellTwoTone } from "@ant-design/icons";
import Header from "./components/Header";
import Cases from "./pages/Cases";
import CaseVanBanBanHanhs from "./pages/Cases/indexVanBanBanHanh";
import CaseUserNames from "./pages/Cases/indexUserName";
import NewCase from "./pages/Cases/NewCase";
import NewCaseHandle from "./pages/Cases/NewCaseHandle";
import NewCaseMember from "./pages/Cases/NewCaseMember";
import NewCaseVanBanBanHanh from "./pages/Cases/NewCaseVanBanBanHanh";
import ThongBaoVanBanDenHan from "./pages/Home/ThongBaoVanBanDenHan";
import ChatCase from "./pages/Cases/ChatCase";
import Home from "./pages/Home/ThongKe";
import Login from "./components/Login";
import NewUserForm from "./pages/Cases/userName";

import "./stylesApp.css";
import moment from "moment";
import { } from "react-router-dom";

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

const MarqueeContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const marqueeAnimation = keyframes`
  0% { transform: translateX(500%); }
  100% { transform: translateX(-200%); }
`;

const MarqueeText = styled.div`
  display: inline-block;
  animation: ${marqueeAnimation} 20s linear infinite;
  font-size: 18px;
  color: #ff0000;
`;

function App() {
  const [notificationCount, setNotificationCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [marqueeTexts, setMarqueeTexts] = useState([]);
  const [currentMarqueeIndex, setCurrentMarqueeIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
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

  const fetchDataVanBanDenHan = async () => {
    try {
      const response = await bangVanBanDenHan();
      const data = response.data.result;

      if (data.length > 0) {
        const marqueeTexts = data.map((record) => {
          const dueDate = moment(record.ngay_het_han);
          const today = moment();
          const daysDifference = dueDate.diff(today, "days");

          if (daysDifference < 0) {
            return `Công văn số ${record.so_van_ban} của ${record.ten_don_vi} đã quá hạn`;
          } else {
            return `Đến hạn báo cáo Công văn số ${record.so_van_ban} của ${record.ten_don_vi} do ${record.noi_nhan} thực hiện`;
          }
        });

        const sortedMarqueeTexts = marqueeTexts.sort((a, b) => {
          const aDueDate = moment(a.ngay_het_han);
          const bDueDate = moment(b.ngay_het_han);
          return aDueDate - bDueDate;
        });

        setMarqueeTexts(sortedMarqueeTexts);
      }
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
    fetchDataVanBanDenHan();
    const intervalId = setInterval(() => {
      fetchDataVanBanDenHan();
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (marqueeTexts.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentMarqueeIndex(
          (prevIndex) => (prevIndex + 1) % marqueeTexts.length
        );
      }, 15000);

      return () => clearInterval(intervalId);
    }
  }, [marqueeTexts]);

  useEffect(() => {
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    setRememberMe(storedRememberMe);

    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedCurrentUser = localStorage.getItem("currentUser");

    if (storedIsLoggedIn && storedCurrentUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedCurrentUser);
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
            <MarqueeContainer>
              {marqueeTexts.map((marqueeText, index) => (
                <MarqueeText
                  key={index}
                  style={{
                    display:
                      index === currentMarqueeIndex ? "inline-block" : "none",
                  }}
                >
                  {marqueeText}
                </MarqueeText>
              ))}
            </MarqueeContainer>
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
                <Route path="/indexUserName">
                  <CaseUserNames />
                </Route>
                <Route path="/userName">
                  <NewUserForm />
                </Route>
              </Switch>
            </MainContainer>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Login onLogin={handleLoginSuccess} />
          </>
        )}
      </AppContainer>
    </Router>
  );
}

export default App;
