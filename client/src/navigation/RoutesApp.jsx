import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Login from "../pages/login/Login";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/home">
        <Layout />
      </Route>
      <Route exact path="/">
        <Navigate to="/login" />
      </Route>
      <Route exact path="*">
        <Navigate to="/home" />
      </Route>
    </Routes>
  );
};
export default RoutesApp;
