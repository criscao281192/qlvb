import React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import NewUserForm from "../../pages/Users/Create";
import Login from "../../pages/Login";

const PublicRoute = ({ handleLoginSuccess }) => {
  return (
    <Switch>
      <Route path="/dang-ky-tai-khoan">
        <NewUserForm />
      </Route>
      <Route path="/">
        <Login onLogin={handleLoginSuccess} />
      </Route>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  );
};

export default PublicRoute;
