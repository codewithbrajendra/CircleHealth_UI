import React from "react";
import CurrentDateTime from "../CurrentDateTime/CurrentDateTime";
import "./HeaderUserBox.scss";

function HeaderUserBox() {
  return (
    <div className="Right_area HeaderUserBox">
      <div className="LoggedIn_User_Info d-flex align-items-center">
        <div className="User_Icon">
          <div className="User_Profile"></div>
        </div>
        <div className="User_Details">
          <p className="User_Name mb-0">John Duck</p>
          <p className="Date mb-0">
            <CurrentDateTime></CurrentDateTime>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderUserBox;
