import axios from "axios";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFormStaff from "./form_validate/useFormStaff";
import validateUpdateStaff from "./form_validate/validateUpdateStaff";
import { GrClose } from "react-icons/gr";

const UpdateStaff = ({ staff, setStaff, setShowFormUpdateStaff }) => {
  const inputAvatarRef = useRef(null);
  //Call API
  const submitForm = () => {
    const formStaff = {
      account: staff.account,
      password: staff.password,
      fullname: staff.fullname,
      address: staff.address,
      birthday: staff.birthday,
      sex: staff.sex,
      email: staff.email,
      telephoneNumber: staff.telephoneNumber,
      avatarUrl: staff.avatarUrl,
    };

    //post to API
    axios
      .put("http://localhost:5000/api/auth/update/", formStaff)
      .then((res) => {
        setShowFormUpdateStaff(false);
        toast("Cập nhật nhân viên thành công");
      })
      .catch((err) => {
        toast("Cập nhật nhân viên thất bại");
      });
  };
  const { handleChange, handleSubmit, errors } = useFormStaff(
    submitForm,
    staff,
    setStaff,
    validateUpdateStaff
  );
  const [avatar, setAvatar] = useState();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };
  const onExitClick = () => {
    setShowFormUpdateStaff(false);
  };
  return (
    <div className="form-container">
      <div className="form-heading">
        <h3 className="form-heading-title">Cập nhật thông tin nhân viên</h3>
        <div onClick={onExitClick} className="form-btn-exit">
          <GrClose />
        </div>
      </div>
      <div className="form-body">
        <div className="form_img">
          <img
            src={avatar ? URL.createObjectURL(avatar) : staff.imgUrl}
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
            <span>Mã nhân viên</span>
            <input
              name="account"
              value={staff._id.substr(staff._id.length - 7)}
              type="text"
            />
            <p className="form-error">{errors.account}</p>
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
            <span>Email</span>
            <input
              name="email"
              onChange={handleChange}
              value={staff.email}
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
              name="telephoneNumber"
              value={staff.telephoneNumber}
              onChange={handleChange}
              className={errors.telephoneNumber ? "error" : ""}
              type="text"
            />
            <p className="form-error">{errors.telephoneNumber}</p>
          </div>
        </div>
      </div>
      <div className="form-btn-row">
        <button onClick={handleSubmit} className="form-btn-save">
          Cập nhật
        </button>
        <button onClick={onExitClick} className="form-btn-cancel">
          Bỏ qua
        </button>
      </div>
    </div>
  );
};

export default UpdateStaff;
