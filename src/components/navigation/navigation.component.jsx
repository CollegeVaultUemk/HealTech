import React, { Fragment, useContext } from "react";
import { MdDarkMode } from "react-icons/md";
import "./navigation.styles.scss";
import Logo from "../../assets/HealTech.png";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { userSignOut } from "../../utils/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Fragment>
      <div className="navigation">
        <div className="logo-container">
          <Link to="/">
            <img src={Logo} alt="web-logo" />
          </Link>
        </div>

        <div className="nav-menu">
          <Link className="navlink" to="/">
            HOME
          </Link>
          {currentUser ? (
            <Link className="navlink" onClick={userSignOut}>
              SIGN OUT
            </Link>
          ) : (
            <Link className="navlink" to="/auth">
              SIGN IN
            </Link>
          )}
          <Link className="navlink" to="/dashboard/explore">
            DASHBOARD
          </Link>
          <MdDarkMode />
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
