import { NavLink } from "react-router-dom";
import { House } from "lucide-react";
import { Space } from "antd";
import UserInfo from "../userInfo/User-Info";

import "../../styles/components/header/Header.scss";

const Header = () => {
  return (
    <header>
      <div className="content">
        <nav>
          <NavLink to="/">
            <House />
          </NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/library/auth">Auth</NavLink>
          <NavLink to="/library/login">Login</NavLink>
        </nav>

        <Space size={"small"} style={{ marginLeft: "auto" }}>
          <UserInfo />
        </Space>
      </div>
    </header>
  );
};

export default Header;
