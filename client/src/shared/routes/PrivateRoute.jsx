import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

const PrivateRoute = () => {
  return (
    <Switch>
      <Route exact path="/">
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
    </Switch>
  )
}

export default PrivateRoute;
