import React, { useState, useRef } from "react";
import "./WidgetBox.scss";
import MultipleBar from "../ApexChart/MultipleBar";

const WidgetBox3 = (props) => {
  let { className, seriesDataGroup, seriesName, category, filter, yAxis } =
    props;
  let { id, name } = props.data;

  let [seriesData, setSeriesData] = useState(seriesDataGroup[0]);
  let [yAxisLabel, setYAxisLabel] = useState(yAxis ? "Minutes" : "");

  const filterRef = useRef(0);

  //alert(filterRef.current.value);

  const filterHandler = (data) => {
    //alert(data);
    setSeriesData(seriesDataGroup[data]);
    //setSeriesName(data == 0 ? seriesName1 : seriesName1);
    //yAxis && setYAxisLabel(data == 0 ? "Minutes" : "Seconds");
  };

  return (
    <>
      <div className={`widgetBox cardBox ${className}`}>
        <div className="widgetInner">
          <div className="widgetTitle">
            <div className="d-flex justify-content-between">
              <div className="mb-3">{name}</div>
              {filter && (
                <div className="col-auto filterArea">
                  <select
                    name=""
                    id=""
                    className="form-control barFilter"
                    onChange={(e) => filterHandler(e.target.value)}
                    ref={filterRef}
                  >
                    {filter.names.map((item, index) => (
                      <option
                        key={index}
                        selected={index === 0 ? "selected" : ""}
                        value={index}
                      >
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex">
            <div className="col-12">
              {seriesData && (
                <MultipleBar
                  id={id}
                  seriesName={seriesName}
                  seriesData={seriesData}
                  category={category}
                  yAxis={yAxisLabel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetBox3;
