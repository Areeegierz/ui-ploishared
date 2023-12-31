import React from "react";
import { ConfigProvider, Menu } from "antd";
import { NavLink } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import SubMenu from "antd/lib/menu/SubMenu";
import { authUser } from "../../repositories/repository";

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          {/* <UserProfile /> */}
          {/* <AppsNavigation /> */}
          <h3 style={{ color: "white" }}>เมนู</h3>
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemColor: "#ffffff",
                },
              },
            }}
          >
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={"dark"}
              mode="inline"
              itemColor={"#ffffff"}
            >
              <Menu.Item key="content">
                <NavLink
                  to="/content"
                  style={{ color: "#E5E4E2" }}
                  activeStyle={{ color: "orange" }}
                >
                  <i className={"icon icon-search"} />
                  <span>
                    <IntlMessages id="แก้ไขเนื้อหาลูกค้า" />
                  </span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="staffcontent">
                <NavLink
                  to="/staffcontent"
                  style={{ color: "#E5E4E2" }}
                  activeStyle={{ color: "orange" }}
                >
                  <i className={"icon icon-search"} />
                  <span>
                    <IntlMessages id="แก้ไขเนื้อหาพนักงาน" />
                  </span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </ConfigProvider>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
