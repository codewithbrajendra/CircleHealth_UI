import React, { useState, useRef } from "react";
import "./WidgetBox.scss";
import MultipleLine from "../../Components/ApexChart/MultipleLine";

const WidgetBox2 = (props) => {
  let {
    className,
    seriesName1,
    seriesName2,
    seriesData1,
    seriesData2,
    category,
    filter,
    yAxis,
  } = props;
  let { graphData, id, name } = props.data;

  let [seriesName, setSeriesName] = useState(seriesName2);
  let [seriesData, setSeriesData] = useState(seriesData2);
  let [yAxisLabel, setYAxisLabel] = useState(yAxis ? "Minutes" : "");

  const filterRef = useRef(0);

  const filterHandler = (data) => {
    //alert(data);
    setSeriesData(data == 0 ? [...seriesData2] : [...seriesData1]);
    setSeriesName(data == 0 ? seriesName2 : seriesName1);
    yAxis && setYAxisLabel(data == 0 ? "Minutes" : "Seconds");
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
                <MultipleLine
                  data={graphData}
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

export default WidgetBox2;
