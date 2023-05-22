import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import useFormStaff from "./form_validate/useFormStaff";
import validateStaff from "./form_validate/validateStaff";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscChromeClose } from "react-icons/vsc";

const AddStaff = ({ setShowFormAddStaff }) => {
  const inputAvatarRef = useRef(null);
  const birthdayRef = useRef(null);
  const [staff, setStaff] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    birthday: new Date(),
    sex: "",
    email: "",
    fullname: "",
    gender: "Nam",
  });

  //Call API
  const submitForm = () => {
    var formStaff = new FormData();
    formStaff.append("username", staff.username);
    formStaff.append("password", staff.password);
    formStaff.append("fullname", staff.fullname);
    formStaff.append("address", staff.address);
    formStaff.append("birthday", staff.birthday);
    formStaff.append("gender", staff.gender);
    formStaff.append("email", staff.email);
    formStaff.append("phone", staff.phone);
    formStaff.append("image", avatar);

    //post to API
    axios
      .post(
        "http://localhost:5000/api/auth/register",
        formStaff,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        },
        { timeout: 1000 }
      )
      .then((res) => {
        setShowFormAddStaff(false);
        toast("Thêm mới nhân viên thành công");
      })
      .catch((err) => {
        toast("Thêm mới nhân viên thất bại");
      });
  };
  const { handleChange, handleChangeBirthday, handleSubmit, errors } =
    useFormStaff(submitForm, staff, setStaff, validateStaff);
  const [avatar, setAvatar] = useState();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };
  const onExitClick = () => {
    setShowFormAddStaff(false);
  };

  return (
    <div className="form-container">
      <div className="form-heading">
        <h3 className="form-heading-title">Thêm mới nhân viên</h3>
        <div onClick={onExitClick} className="form-btn-exit flex justify-center items-center"><VscChromeClose/></div>
      </div>
      <div className="form-body">
        <div className="form_img">
          <img
            src=""
            alt=""
            className="form-avatar"
          />
          <input
            ref={inputAvatarRef}
            type="file"
            onChange={onImageChange}
            style={{ display: "none" }}
          />
          <button
            className="btn-pickImage"
            onClick={() => {
              inputAvatarRef.current.click();
            }}
          >
            Chọn ảnh
          </button>
        </div>
        <div className="form">
          <div className="form-row">
            <span>Tên tài khoản</span>
            <input
              className={errors.username ? "error" : ""}
              onChange={handleChange}
              name="username"
              value={staff.username}
              type="text"
              autoComplete="off"
            />
            <p className="form-error">{errors.username}</p>
          </div>
          <div className="form-row">
            <span>Ngày sinh</span>
            <p className="form-error">{errors.birthday}</p>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                ref={birthdayRef}
                views={["day", "month", "year"]}
                value={staff.birthday}
                name="birthday"
                onChange={handleChangeBirthday}
                renderInput={(params) => (
                  <TextField
                    open
                    fullWidth
                    size="small"
                    style={{
                      height: "100%",
                      width: "206px",
                      borderRadius: 5,
                      zIndex: 4,
                      border: "1px solid #4e5052",
                    }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="form-row">
            <span>Mật khẩu</span>
            <input
              className={errors.password ? "error" : ""}
              onChange={handleChange}
              type="password"
              value={staff.password}
              name="password"
            />
            <p className="form-error">{errors.password}</p>
          </div>

          <div className="form-row">
            <span>Giới tính</span>

            <select
              value={staff.gender}
              className="form-select"
              name="gender"
              onChange={handleChange}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-row">
            <span>Xác nhận mật khẩu</span>
            <input
              type="password"
              name="confirmPassword"
              value={staff.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error" : ""}
            />
            <p className="form-error">{errors.confirmPassword}</p>
          </div>
          <div className="form-row">
            <span>Họ tên</span>
            <input
              name="fullname"
              onChange={handleChange}
              value={staff.fullname}
              className={errors.fullname ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.fullname}</p>
          </div>
          <div className="form-row">
            <span>Email</span>
            <input
              name="email"
              onChange={handleChange}
              value={staff.value}
              type="text"
              className={errors.email ? "error" : ""}
            />
            <p className="form-error">{errors.email}</p>
          </div>
          <div className="form-row">
            <span>Địa chỉ</span>
            <input
              name="address"
              onChange={handleChange}
              value={staff.address}
              className={errors.address ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.address}</p>
          </div>
          <div className="form-row">
            <span>Số điện thoại</span>
            <input
              name="phone"
              value={staff.phone}
              onChange={handleChange}
              className={errors.phone ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.phone}</p>
          </div>
        </div>
      </div>
      <div className="form-btn-row">
        <button onClick={handleSubmit} className="form-btn-save">
          Lưu
        </button>
        <button onClick={onExitClick} className="form-btn-cancel">
          Bỏ qua
        </button>
      </div>
    </div>
  );
};

export default AddStaff;
