import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  HomeOutlined,
  CloudUploadOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
  HourglassOutlined,
  UserOutlined,
  TeamOutlined
} from "@ant-design/icons";
import logoImage from "../assets/img/Logo.png";
import { jwtDecode } from "jwt-decode";
import { Layout, Menu } from "antd";
import { Roles } from "../shared/constants/roles";
import { bangVanBanDenHan, bangBaoCaoDinhKy, bangThongTinCanBo, bangThongTinThanNhanCanBo } from "../api";

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

const LogoImage = styled.img``;

const MenuTitle = styled.span`
  font-size: 18px;
  color: black;
  text-transform: uppercase;
  font-weight: 600;
`;

const iconStyle = {
  fontSize: "18px",
  color: "red",
};

let menus = [
  {
    name: "Trang chủ",
    icon: <HomeOutlined style={iconStyle} />,
    link: "/",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Văn bản đến",
    icon: <CloudUploadOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Văn bản đi",
    icon: <SendOutlined style={iconStyle} />,
    link: "/quan-ly-van-ban-ban-hanh",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Nhắc việc",
    icon: <ClockCircleOutlined style={iconStyle} />,
    link: "/thong-bao",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Định kỳ",
    icon: <HourglassOutlined style={iconStyle} />,
    link: "/thong-bao-dinh-ki",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Cán bộ",
    icon: <UserOutlined style={iconStyle} />,
    link: "/quan-ly-can-bo",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Thân nhân",
    icon: <TeamOutlined style={iconStyle} />,
    link: "/quan-ly-than-nhan-can-bo",
    outside: false,
    roles: [Roles.Admin, Roles.User],
  },
  {
    name: "Tài khoản",
    icon: <SolutionOutlined style={iconStyle} />,
    link: "/quan-ly-tai-khoan",
    outside: false,
    roles: [Roles.Admin],
  },
  {
    name: "Văn bản lưu",
    icon: <FolderOpenOutlined style={iconStyle} />,
    link: "http://192.168.1.28/vanban/",
    outside: true,
    roles: [Roles.Admin, Roles.User],
  },
];

const Header = ({ isFold }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const [overdueDocuments, setOverdueDocuments] = useState([]);
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState(0);
  const [numberOfOverdueDocuments, setNumberOfOverdueDocuments] = useState(0);
  const [numberOfScheduledReports, setNumberOfScheduledReports] = useState(0);
  const [numberOfOfficerNotifications, setNumberOfOfficerNotifications] = useState(0);
  const [numberOfFamilyNotifications, setNumberOfFamilyNotifications] = useState(0);

  const fetchOverdueDocuments = async () => {
    try {
      const response = await bangVanBanDenHan({});
      setOverdueDocuments(response.data.result);
      setNumberOfOverdueDocuments(response.data.result.length);
    } catch (error) {
      console.error("Error fetching overdue documents:", error);
    }
  };

  const fetchScheduledReports = async () => {
    try {
      const response = await bangBaoCaoDinhKy({});
      setNumberOfScheduledReports(response.data.result.length);
    } catch (error) {
      console.error("Error fetching scheduled reports:", error);
    }
  };

  const fetchOfficerNotifications = async () => {
    try {
      const response = await bangThongTinCanBo({});
      setNumberOfOfficerNotifications(response.data.result.length);
    } catch (error) {
      console.error("Error fetching officer notifications:", error);
    }
  };

  const fetchFamilyNotifications = async () => {
    try {
      const response = await bangThongTinThanNhanCanBo({});
      setNumberOfFamilyNotifications(response.data.result.length);
    } catch (error) {
      console.error("Error fetching family notifications:", error);
    }
  };

  useEffect(() => {
    fetchOverdueDocuments();
    fetchScheduledReports();
    fetchOfficerNotifications();
    fetchFamilyNotifications();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDocumentIndex(
        (prevIndex) => (prevIndex + 1) % overdueDocuments.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [overdueDocuments]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={isFold}
      style={{ background: "#defdda", height: "100vh" }}
    >
      <AppLogoWrapper>
        <LogoImage
          src={logoImage}
          alt="Logo"
          className="logo"
          width={isFold ? "30px" : "110px"}
        />
      </AppLogoWrapper>
      <MenuWrapper
        mode="inline"
        style={{ backgroundColor: "#defdda", height: "calc(100vh - 64px)" }}
      >
        {menus.map((menu, index) => {
          const handleClick = (e) => {
            if (menu.outside) {
              window.open(menu.link, "_blank");
              history.push("/");
            } else {
              history.push(menu.link);
            }
          };

          return (
            <Menu.Item key={index} onClick={handleClick}>
              {menu.icon}
              <MenuTitle>{menu.name}</MenuTitle>
              {(menu.name === "Nhắc việc" && numberOfOverdueDocuments > 0) && (
                <span style={{ marginLeft: 5, fontSize: 12, color: "Blue" }}>
                  ({numberOfOverdueDocuments})
                </span>
              )}
              {(menu.name === "Định kỳ" && numberOfScheduledReports > 0) && (
                <span style={{ marginLeft: 5, fontSize: 12, color: "Blue" }}>
                  ({numberOfScheduledReports})
                </span>
              )}
              {(menu.name === "Cán bộ" && numberOfOfficerNotifications > 0) && (
                <span style={{ marginLeft: 5, fontSize: 12, color: "Blue" }}>
                  ({numberOfOfficerNotifications})
                </span>
              )}
              {(menu.name === "Thân nhân" && numberOfFamilyNotifications > 0) && (
                <span style={{ marginLeft: 5, fontSize: 12, color: "Blue" }}>
                  ({numberOfFamilyNotifications})
                </span>
              )}
            </Menu.Item>
          );
        })}
      </MenuWrapper>
      <div style={{ position: "fixed", bottom: 0, width: "100%", left: 0, zIndex: "1000" }}>
        {overdueDocuments.length > 0 && (
          <marquee behavior="scroll" direction="left" style={{ fontSize: "18px", color: "blue", backgroundColor: "lightyellow" }}>
            {overdueDocuments.map((document, index) => (
              <span key={index} style={{ color: "red" }}>
                {"  "}- Văn bản số {document.so_van_ban} của{" "}
                {document.ten_don_vi} do đồng chí {document.noi_nhan} phụ trách
                đến hạn báo cáo {"./*****/."}
              </span>
            ))}
          </marquee>
        )}
      </div>
    </Layout.Sider>
  );
};

export default Header;
