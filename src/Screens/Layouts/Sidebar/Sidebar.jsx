import React from "react";
import "./Sidebar.scss";
import { NavLink, useHistory } from "react-router-dom";
import {
  FaUserAlt,
  FaChartBar,
  FaHome,
  FaPowerOff,
  FaUserMd,
} from "react-icons/fa";

import { logOutUser } from "../../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

const SideBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const LogOut = () => {
    history.push("/");
    props.menuHandler();
    dispatch(logOutUser());
  };

  return (
    <div className="Sidebar_Wrapper  pt-3 ">
      <ul className="Nav_List">
        {props.UserType === "SUPER_ADMIN" && (
          <li>
            <NavLink
              className="menuItem"
              to="/admins"
              exact
              onClick={() => props.menuHandler()}
            >
              <div className="icon-box">
                <FaUserAlt />
              </div>{" "}
              Admins
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className="menuItem"
            to="/"
            exact
            onClick={() => props.menuHandler()}
          >
            <div className="icon-box">
              <FaUserAlt />
            </div>{" "}
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menuItem"
            to="/therapists"
            exact
            onClick={() => props.menuHandler()}
          >
            <div className="icon-box">
              <FaUserMd />
            </div>{" "}
            Therapists
          </NavLink>
        </li>
        <li>
          <NavLink
            className="menuItem"
            to="/analytics"
            exact
            onClick={() => props.menuHandler()}
          >
            <div className="icon-box">
              <FaChartBar />
            </div>{" "}
            Analytics
          </NavLink>
        </li>
        <li>
          <div className="menuItem logOutBtn" onClick={() => LogOut()}>
            <div className="icon-box">
              <FaPowerOff />
            </div>{" "}
            Logout
          </div>
        </li>
      </ul>
    </div>
  );
};
export default SideBar;
