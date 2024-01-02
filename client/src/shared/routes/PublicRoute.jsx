import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
    </Switch>
  )
}

export default PublicRoute
