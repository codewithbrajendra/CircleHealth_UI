import React, { useState } from "react";
import Chart from "react-apexcharts";
import BarChart from "./BarChart";

const MultipleBar = (props) => {
  const { id, seriesName, seriesData, category, yAxis } = props;
  console.log(yAxis);

  return (
    <div id={id} className="chatWrapper2">
      <BarChart
        data={seriesData}
        category={category}
        name={seriesName}
        type="bar"
        width="100%"
        height={300}
        //yAxis={yAxis}
      />
    </div>
  );
};

export default MultipleBar;
