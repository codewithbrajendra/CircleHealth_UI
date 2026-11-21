import React from "react";
import "./WidgetBox.scss";
import SplineArea from "../../Components/ApexChart/SplineArea";

const WidgetBox = (props) => {
  let { className, count, graph, category } = props;
  let { graphData, item, name, bigTitle, shortInfo, shortInfoStatus } =
    props.data;

  // alert(bigTitle);
  console.log(category);

  return (
    <>
      <div className={`widgetBox cardBox ${className}`}>
        <div className="widgetInner">
          <div className="widgetTitle">{name}</div>
          <div className="d-flex justify-content-between">
            <div className="w-details  align-self-end">
              <h3 className="big-title">
                {count}
                {item === 3 && " Hr"}
              </h3>
              {/* <p
                className={`small-title ${
                  shortInfoStatus === "positive"
                    ? "success-color"
                    : "danger-color"
                }`}
              >
                {shortInfoStatus === "positive" ? "+" : "-"} {shortInfo}%
              </p> */}
            </div>
            {graph && (
              <div className="grafArea col-auto">
                <SplineArea
                  name={name}
                  data={count}
                  item={item}
                  category={category}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetBox;
