import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Account from "../../pages/account/Account";
import Customers from "../../pages/customers/Customers";
import DashBoard from "../../pages/dashboard/DashBoard";
import Orders from "../../pages/orders/Orders";
import Products from "../../pages/products/Products";
import Staffs from "../../pages/staffs/Staffs";
import SideBar from "../sidebar/SideBar";
import "./Layout.css";

const Layout = () => {
  return (
    <Router>
      <SideBar>
        <Routes>
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
        </Routes>
      </SideBar>
    </Router>
  );
};
export default Layout;
