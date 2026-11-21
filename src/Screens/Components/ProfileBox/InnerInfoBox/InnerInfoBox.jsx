import React from "react";
import "./InnerInfoBox.scss";

const InnerInfoBox = (props) => {
  const { title, type, date, from, to, note, therapistPreference } = props.data;
  return (
    <div className={`InnerInfoBoxWrapper ${props.className}`}>
      <div className="titleArea">
        <h5>{title && title}</h5>
      </div>
      {type === "Wellness" && (
        <div className="infoArea">
          Date of The Last Wellness : <strong>{date && date}</strong>
        </div>
      )}
      {type === "Therapy" && (
        <div className="infoArea">
          <div className="row justify-content-between">
            <div className="col-sm-12 col-md mb-3">
              Requested Therapy Session : <strong>{date && date}</strong>
            </div>
            <div className="col-sm-auto col-md-auto col-lg-auto mb-3">
              <div className="d-flex">
                <div>
                  From : <strong>{from && from} </strong>
                </div>
                <span>&nbsp; &nbsp;</span>
                <div>
                  To : <strong>{to && to}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-auto col-md-auto col-lg-auto mb-3">
              Therapy Name :{" "}
              <strong>{therapistPreference && therapistPreference} </strong>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md mb-3">
              <div className="row">
                <div className="col-sm-12 col-md-auto">Note :</div>
                <div className="col-sm-12 col-md text-justify">
                  {note && note}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InnerInfoBox;
