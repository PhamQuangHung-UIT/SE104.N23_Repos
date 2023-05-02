import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import "./Layout.css";

const Layout = () => {
  return (
    <Router>
      <SideBar>
        <Routes>
          
        </Routes>
      </SideBar>
    </Router>
  );
};
export default Layout;
