import React, {useContext, useState} from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";
import SignOutButton from "../login/SignOut.js";

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <NavbarAuth /> : <NavbarNonAuth />}</div>;
};

const NavbarAuth = () => {
  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        SkiFindr
      </Link>
      <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/find">Find Resorts</CustomLink>
        <CustomLink to="/about">About</CustomLink>
        <CustomLink to="/account">Account</CustomLink>
      </ul>
    </nav>
  )
};
const NavbarNonAuth = () => {
  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
        SkiFindr
      </Link>
      <ul>
        <CustomLink to="/signin">Sign In</CustomLink>
        <CustomLink to="/signup">Sign Up</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navigation;