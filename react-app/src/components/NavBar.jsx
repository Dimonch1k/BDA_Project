import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../data/images/bda_logo.png";
import { useStateContext } from "../contexts/ContextProvider";
import UserInfo from "./library/UserInfo";

const links = [
  { name: "Library", link: "/library" },
  { name: "Favorite", link: "/favorite" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact Us", link: "/contact-us" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useStateContext();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <div className="navBar">
      <div className="navBar__content">
        <NavLink to="/">
          <img src={logo} alt="logo" className="xl:w-40 w-36 h-full" />
        </NavLink>

        <div
          onClick={toggleMenu}
          className="absolute right-8 top-7 cursor-pointer md:hidden text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        <ul
          className={`navBar__links ${
            open ? "top-12" : "top-[-490px] container"
          }`}
        >
          {links.map((link) => (
            <li className="lg:ml-8 md:ml-5 md:my-0 my-7" key={link.name}>
              <NavLink
                to={link.link}
                className="navBar__link"
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {user === true ? (
            <NavLink to="/library/sign-in">
              <button className="signBtn" onClick={closeMenu}>
                Sign in
              </button>
            </NavLink>
          ) : (
            <UserInfo />
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
