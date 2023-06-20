import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import "./Account.css";

const Account = () => {
  const userLocal = (localStorage.getItem("user"));
  console.log(userLocal);
  const [user, setUser] = useState();

  const [userUpdate, setUserUpdate] = useState({
    fullname: "",
    phone: "",
    address: "",
    email: "",

    birthday: user?.birthday || new Date(),
  });
  
  return (
    <div className="main">
      <div className="search_name"></div>

      <div className="account_header">
        <h1 className="userTitle">Thông tin người dùng</h1>
        <div className="account_header-control">
          <div className="action-btn mg-0 ani_fade-in-top account-logout">
            <button
              className="btn mg-0"
              style={{ fontSize: "16px", padding: ".5rem 2rem !important" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              <i class="bx bx-log-out action-btn-icon"></i>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="main_list">
        <div className="list_left">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/04/p2.jpg"
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">toilaaiday</span>
                <span className="userShowUserTitle">nhanvien</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Tài khoản</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">toilaaiday</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle"></span>
              </div>
              <span className="userShowTitle">Liên hệ</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">123456789</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">toilaaiday@gmail.com</span>
              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">hhhhhhhhhhhhhhhhhhhhhh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
