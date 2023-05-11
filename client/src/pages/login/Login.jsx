import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import useFormLogin from "./useFormLogin";
import validateUser from "./validateUser";
const Login = ({ setIsAuticated }) => {
  const [errorLogin, setErorLogin] = useState("");
  const navigate = useNavigate()
  const submitForm = () => {
    const username = user.username;
    const password = user.password;
    axios
      .post(
        `http://localhost:5000/api/auth/login?account=${username}&password=${password}`
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        //setIsAuticated(true);
        console.log(res)
        navigate("/home");
      })
      .catch((e) => {
        console.log(e)
        setErorLogin("Tên tài khoản hoặc mật khẩu không chính xác");
      });
    //Navigate to Screen
  };
  const { handleChange, handleSubmit, user, errors } = useFormLogin(
    submitForm,
    validateUser
  );

  return (
    <div className="login-container">
      <div className="login-form">
        <h3 id="login-form-title">ĐĂNG NHẬP</h3>

        <div className="login-form-inputs">
          <input
            value={user.username}
            className="login-form-input"
            type="text"
            placeholder="Tài khoản"
            onChange={handleChange}
            name="username"
          />
          <p className="login-form-error">{errors.username}</p>
        </div>
        <div className="login-form-inputs">
          <input
            className="login-form-input"
            type="password"
            placeholder="Mật khẩu"
            value={user.password}
            name="password"
            onChange={handleChange}
          />
          <p className="login-form-error">{errors.password}</p>
        </div>

        <div className="login-form-row login-failed">
          <p>{errorLogin}</p>
        </div>
        <div className="login-form-item">
          <button onClick={handleSubmit} className="btn-login">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
