import React from "react";
import { FaBell } from "react-icons/fa";
import "./Notification.scss";

const NotificationBox = (props) => {
  const { className } = props;
  return (
    <div className={`Notification ${className}`}>
      <div className="notification_iconBox">
        <FaBell className="notification_icon"></FaBell>
        <span className="notification_count">5</span>
      </div>
      <div className="notification_listBox"></div>
    </div>
  );
};

export default NotificationBox;
