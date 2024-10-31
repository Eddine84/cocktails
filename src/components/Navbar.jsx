import React from "react";
import { useMixMasterContext } from "../context/MixMasterContext";
import { useContext } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = () => {
  const { toggleDarkMode, isDarkMode } = useContext(useMixMasterContext);
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>

      <button onClick={toggleDarkMode} className="theme">
        {isDarkMode ? (
          <MdOutlineLightMode style={{ color: "#fff" }} />
        ) : (
          <MdDarkMode />
        )}
      </button>
    </Wrapper>
  );
};

export default Navbar;
