import React from 'react';
import { Switch, Route, } from "react-router-dom";

import Cases from "../../pages/Cases";
import CaseVanBanBanHanhs from "../../pages/Cases/indexVanBanBanHanh";
import UserList from "../../pages/Users/UserList";
import NewCase from "../../pages/Cases/NewCase";
import NewCaseHandle from "../../pages/Cases/NewCaseHandle";
import NewCaseVanBanBanHanh from "../../pages/Cases/NewCaseVanBanBanHanh";
import ThongBaoVanBanDenHan from "../../pages/Home/ThongBaoVanBanDenHan";
import ChatCase from "../../pages/Cases/ChatCase";
import Home from "../../pages/Home/ThongKe";
import NewUserForm from "../../pages/Users/Create";
import Profile from '../../pages/Users/Profile';

const ROUTES = [
  { path: '/', key: 'ROOT', exact: true, component: <Home /> },
  { path: '/chat', key: 'ChatCase', exact: true, component: <ChatCase /> },
  { path: '/thong-bao', key: 'ThongBaoVanBanDenHan', exact: true, component: <ThongBaoVanBanDenHan /> },
  { path: '/quan-ly-van-ban', key: 'Cases', exact: true, component: <Cases /> },
  { path: '/quan-ly-van-ban/tao-moi', key: 'NewCase', exact: true, component: <NewCase /> },
  { path: '/quan-ly-van-ban/chinh-sua/:id', key: 'NewCase', exact: true, component: <NewCase /> },
  { path: '/quan-ly-van-ban/xu-ly-van-ban/:id', key: 'NewCaseHandle', exact: true, component: <NewCaseHandle /> },
  { path: '/quan-ly-van-ban-ban-hanh', key: 'CaseVanBanBanHanhs', exact: true, component: <CaseVanBanBanHanhs /> },
  { path: '/quan-ly-van-ban-ban-hanh/tao-moi', key: 'NewCaseVanBanBanHanh', exact: true, component: <NewCaseVanBanBanHanh /> },
  { path: '/quan-ly-van-ban-ban-hanh/chinh-sua/:id', key: 'NewCaseVanBanBanHanh', exact: true, component: <NewCaseVanBanBanHanh /> },
  { path: '/quan-ly-tai-khoan', key: 'UserList', exact: true, component: <UserList /> },
  { path: '/quan-ly-tai-khoan/tao-moi', key: 'NewUserForm', exact: true, component: <NewUserForm /> },
  { path: '/quan-ly-tai-khoan/chinh-sua/:id', key: 'NewUserForm', exact: true, component: <NewUserForm /> },
  { path: '/trang-ca-nhan', key: 'Profile', exact: true, component: <Profile /> },
];



const PrivateRoute = () => {
  return (
    <Switch>
      {ROUTES.map(({ path, key, exact, component }) => (
        <Route
          path={path}
          key={key}
          exact={exact}
        >
          {component}
        </Route>
      ))}

      {/* <Route exact path="/">
        <Home />
      </Route>
      <Route path="/ChatCase">
        <ChatCase />
      </Route>
      <Route path="/thong-bao">
        <ThongBaoVanBanDenHan />
      </Route>
      <Route path="/quan-ly-van-ban/tao-moi">
        <NewCase />
      </Route>
      <Route path="/quan-ly-van-ban/chinh-sua/:id">
        <NewCase />
      </Route>
      <Route path="/quan-ly-van-ban/xu-ly-van-ban/:id">
        <NewCaseHandle />
      </Route>
      <Route path="/quan-ly-van-ban">
        <Cases />
      </Route>
      <Route path="/quan-ly-van-ban-ban-hanh/tao-moi">
        <NewCaseVanBanBanHanh />
      </Route>
      <Route path="/quan-ly-van-ban-ban-hanh/chinh-sua/:id">
        <NewCaseVanBanBanHanh />
      </Route>
      <Route path="/quan-ly-van-ban-ban-hanh">
        <CaseVanBanBanHanhs />
      </Route>
      <Route path="/quan-ly-tai-khoan/tao-moi">
        <NewUserForm />
      </Route>
      <Route path="/quan-ly-tai-khoan/chinh-sua/:id">
        <NewUserForm />
      </Route>
      <Route path="/quan-ly-tai-khoan">
        <UserList />
      </Route>
      <Route path="/trang-ca-nhan">
        <Profile />
      </Route> */}
    </Switch>
  )
}

export default PrivateRoute;
