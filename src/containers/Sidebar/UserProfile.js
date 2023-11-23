import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "../../appRedux/actions";
import { authUser } from "../../repositories/repository";
import { UserOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const removeLocalStorage = () => {
    localStorage.removeItem("user");
  };

  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li
        onClick={() => {
          localStorage.clear();
          window.location.assign("/signin");
        }}
      >
        Logout
      </li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar style={{ backgroundColor: "#87d068" }}>
          {" "}
          {authUser.name.charAt(0)}
        </Avatar>
        <span className="gx-avatar-name">
          {" "}
          {authUser.name}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
