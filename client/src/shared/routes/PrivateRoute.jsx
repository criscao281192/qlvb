import React from "react";
import { Switch, Route } from "react-router-dom";

import Cases from "../../pages/Cases";
import CaseVanBanBanHanhs from "../../pages/Cases/indexVanBanBanHanh";
import UserList from "../../pages/Users/UserList";
import PersonnelList from "../../pages/Personnel/PersonnelList";
import PersonList from "../../pages/Person/PersonList";

import NewCase from "../../pages/Cases/NewCase";
import NewBaoCaoDinhKy from "../../pages/Cases/NewBaoCaoDinhKy";
import NewCaseHandle from "../../pages/Cases/NewCaseHandle";
import NewCaseVanBanBanHanh from "../../pages/Cases/NewCaseVanBanBanHanh";

import NewCasePersonnel from "../../pages/Personnel/CreatePersonnel";
import NewCasePerson from "../../pages/Person/CreatePerson";

import ThongBaoVanBanDenHan from "../../pages/Home/ThongBaoVanBanDenHan";
import ThongBaoBaoCaoDinhKy from "../../pages/Home/ThongBaoBaoCaoDinhKy";
import ThongBaoBoNhiemLai from "../../pages/Home/ThongBaoBoNhiemLai";

import ThongKeCanBo from "../../pages/Home/ThongKeCanBo";
import Home from "../../pages/Home";
import NewUserForm from "../../pages/Users/Create";
import Profile from "../../pages/Users/Profile";
import NotFound from "../../pages/404";

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: <Home /> },
  {
    path: "/thong-bao",
    key: "ThongBaoVanBanDenHan",
    exact: true,
    component: <ThongBaoVanBanDenHan />,
  },
  {
    path: "/thong-bao-dinh-ki",
    key: "ThongBaoBaoCaoDinhKy",
    exact: true,
    component: <ThongBaoBaoCaoDinhKy />,
  },
  {
    path: "/thong-bao-bo-nhiem-lai",
    key: "ThongBaoBoNhiemLai",
    exact: true,
    component: <ThongBaoBoNhiemLai />,
  },
  {
    path: "/thong-ke-can-bo",
    key: "ThongKeCanBo",
    exact: true,
    component: <ThongKeCanBo />,
  },
  {
    path: "/quan-ly-van-ban/tao-moi-bao-cao-dinh-ky",
    key: "NewBaoCaoDinhKy",
    exact: true,
    component: <NewBaoCaoDinhKy />,
  },
  { path: "/quan-ly-van-ban", key: "Cases", exact: true, component: <Cases /> },
  {
    path: "/quan-ly-van-ban/tao-moi",
    key: "NewCase",
    exact: true,
    component: <NewCase />,
  },
  {
    path: "/quan-ly-van-ban/chinh-sua/:id",
    key: "NewCase",
    exact: true,
    component: <NewCase />,
  },
  {
    path: "/quan-ly-van-ban/xu-ly-van-ban/:id",
    key: "NewCaseHandle",
    exact: true,
    component: <NewCaseHandle />,
  },

  {
    path: "/quan-ly-van-ban-ban-hanh",
    key: "CaseVanBanBanHanhs",
    exact: true,
    component: <CaseVanBanBanHanhs />,
  },
  {
    path: "/quan-ly-van-ban-ban-hanh/tao-moi",
    key: "NewCaseVanBanBanHanh",
    exact: true,
    component: <NewCaseVanBanBanHanh />,
  },
  {
    path: "/quan-ly-van-ban-ban-hanh/chinh-sua/:id",
    key: "NewCaseVanBanBanHanh",
    exact: true,
    component: <NewCaseVanBanBanHanh />,
  },

  {
    path: "/quan-ly-tai-khoan",
    key: "UserList",
    exact: true,
    component: <UserList />,
  },
  {
    path: "/quan-ly-tai-khoan/tao-moi",
    key: "NewUserForm",
    exact: true,
    component: <NewUserForm />,
  },
  {
    path: "/quan-ly-tai-khoan/chinh-sua/:id",
    key: "NewUserForm",
    exact: true,
    component: <NewUserForm />,
  },

  {
    path: "/quan-ly-can-bo",
    key: "PersonnelList",
    exact: true,
    component: <PersonnelList />,
  },
  {
    path: "/quan-ly-can-bo/tao-moi",
    key: "NewCasePersonnel",
    exact: true,
    component: <NewCasePersonnel />,
  },
  {
    path: "/quan-ly-can-bo/chinh-sua/:id",
    key: "NewCasePersonnel",
    exact: true,
    component: <NewCasePersonnel />,
  },
  {
    path: "/quan-ly-than-nhan-can-bo",
    key: "PersonList",
    exact: true,
    component: <PersonList />,
  },
  {
    path: "/quan-ly-than-nhan-can-bo/them-moi",
    key: "NewCasePerson",
    exact: true,
    component: <NewCasePerson />,
  },
  {
    path: "/quan-ly-than-nhan-can-bo/chinh-sua/:id",
    key: "NewCasePerson",
    exact: true,
    component: <NewCasePerson />,
  },
  {
    path: "/trang-ca-nhan",
    key: "Profile",
    exact: true,
    component: <Profile />,
  },

  { path: "*", key: "NotFound", component: <NotFound /> },
];

const PrivateRoute = () => {
  return (
    <Switch>
      {ROUTES.map(({ path, key, exact, component }) => (
        <Route path={path} key={key} exact={exact}>
          {component}
        </Route>
      ))}
    </Switch>
  );
};

export default PrivateRoute;
