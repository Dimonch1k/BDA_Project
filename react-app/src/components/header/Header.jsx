import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { House } from "lucide-react";
import { Image, Space } from "antd";
import UserInfo from "../userInfo/User-Info";

import "../../styles/components/header/Header.scss";

import logo from "../images/bda_logo-removebg-preview.png";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.screenY)
        if (window.scrollY > lastScrollY) setIsVisible(false); // Scrolling down
        else {
          setIsVisible(true); // Scrolling up
        }
      setLastScrollY(window.scrollY); // Update last scroll position
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader); // Cleanup the event listener
    };
  }, [lastScrollY]);

  return (
    <header
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div className="content">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <nav>
          <NavLink to="/">
            <House />
          </NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/library/auth">Auth</NavLink>
          <NavLink to="/library/login">Login</NavLink>
        </nav>

        <Space size={"small"}>
          <UserInfo />
        </Space>
      </div>
    </header>
  );
};

export default Header;
