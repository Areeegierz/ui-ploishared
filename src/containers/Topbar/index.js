import React, { useState } from "react";
import { Button, Layout, Popover } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import languageData from "./languageData";
import { switchLanguage, toggleCollapsedSideNav } from "../../appRedux/actions";
import SearchBox from "../../components/SearchBox";
import UserInfo from "../../components/UserInfo";
import AppNotification from "../../components/AppNotification";
import MailNotification from "../../components/MailNotification";
import Auxiliary from "util/Auxiliary";

import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  TAB_SIZE,
} from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "../Sidebar/UserProfile";
import { PoweroffOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Topbar = () => {
  const { navStyle } = useSelector(({ settings }) => settings);
  const navCollapsed = useSelector(({ common }) => common.navCollapsed);
  const width = useSelector(({ common }) => common.width);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value);
  };
  function removeLocalstorage() {
    localStorage.removeItem("user");
    window.location.assign("/");
  }
  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER ||
      ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) &&
        width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn icon icon-menu"
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}
      {/* 
      <SearchBox
        styleName="gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg"
        placeholder="ค้นหาอะไหล่ด้วย รหัส หรือ ชื่อ อะไหล่"
        onChange={updateSearchChatUser}
        value={searchText}
      />

      <div className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
        <Popover
          overlayClassName="gx-popover-horizantal"
          placement="bottomRight"
          content={
            <SearchBox
              styleName="gx-popover-search-bar"
              placeholder="ค้นหาอะไหล่ด้วย รหัส หรือ ชื่อ อะไหล่"
              onChange={updateSearchChatUser}
              value={searchText}
            />
          }
          trigger="click"
        >
          <span className="gx-pointer gx-d-block">
            <i className="icon icon-search-new" />
          </span>
        </Popover>
      </div> */}

      <ul
        className="gx-header-notifications gx-ml-auto"
        style={{ verticalAlign: "middle" }}
      >
        {width >= TAB_SIZE ? (
          <div className="mt-3">
            <UserProfile />
          </div>
        ) : (
          <Button
            onClick={() => {
              removeLocalstorage();
            }}
            className="gx-d-block gx-d-lg-none gx-pointer gx-mt-2"
            icon={<PoweroffOutlined />}
          ></Button>
        )}
      </ul>
    </Header>
  );
};

export default Topbar;
