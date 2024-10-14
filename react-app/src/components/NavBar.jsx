import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../data/images/bda_logo.png";
import { useNavigate } from "react-router-dom";

const links = [
  { name: "Library", link: "/library" },
  { name: "Favorite", link: "/favorite" },
  { name: "About Us", link: "/about-us" },
  { name: "Contact Us", link: "/contact-us" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <div className="navBar">
      <div className="navBar__content">
        {/* Logo link */}
        <NavLink to="/">
          <img src={logo} alt="logo" className="xl:w-40 w-36 h-full" />
        </NavLink>

        {/* Menu button --- appear when the screen with is less than 768px */}
        <div
          onClick={toggleMenu}
          className="absolute right-8 top-7 cursor-pointer md:hidden text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation links */}
        <ul
          className={`navBar__links ${
            open ? "top-12" : "top-[-490px] container"
          }`}
        >
          {links.map((link) => (
            <li className="md:ml-8 md:my-0 my-7 font-semibold">
              <NavLink
                to={link.link}
                className="navBar__link"
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* Sign in/up button */}
          <NavLink to="/library/sign-in">
            <button
              className="signBtn"
              onClick={() => {
                closeMenu();
              }}
            >
              Sign in
            </button>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
