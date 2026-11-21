import React from "react";
import "./Breadcrumb.scss";

const Breadcrumb = (props) => {
  return (
    <div className="Breadcrumb bg_gray_light1 p-20">
      <div className="d-flex breadcrumb_inner justify-content-between align-items-center">
        <div className="Left_area">
          <div className="Page_Title">
            <h3 className=""> {props.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
