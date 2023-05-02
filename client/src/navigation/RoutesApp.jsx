import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Account from "../pages/account/Account";
import Customers from "../pages/customers/Customers";
import DashBoard from "../pages/dashboard/DashBoard";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Staffs from "../pages/staffs/Staffs";
import Login from "../pages/login/Login";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/home">
        <Route path="/orders" element={<Orders />}>
          <Orders />
        </Route>
        <Route path="/customers" element={<Customers />}>
          <Customers />
        </Route>
        <Route path="/products" element={<Products />}>
          <Products />
        </Route>
        <Route path="/staffs" element={<Staffs />}>
          <Staffs />
        </Route>
        <Route path="/account" element={<Account />}>
          <Account />
        </Route>
        <Route path="/" element={<DashBoard />}>
          <DashBoard />
        </Route>

        <Route path="*" element={<> not found</>} />
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
