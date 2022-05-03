import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <NavLink to={`/`} className="">
        <div className="header__logo"></div>
      </NavLink>
      <Search />
    </div>
  );
};

export default Header;
