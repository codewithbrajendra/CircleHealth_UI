import React, { useState } from "react";
import Chart from "react-apexcharts";
import NewChart from "./GraphNew";

const MultipleLine = (props) => {
  const {
    id,
    data: chartData,
    seriesName,
    seriesData,
    category,
    yAxis,
  } = props;
  console.log(yAxis);

  // const [innitialData, setInitialData] = useState({
  //   series: [
  //     {
  //       name: seriesName,
  //       data: seriesData
  //         ? seriesData
  //         : [(1, 2, 3, 1, 0, 2, 2, 2, 0, 3, 2, 1, 2, 2, 0, 3, 2, 1)],
  //     },
  //     // {
  //     //   name: seriesName2,
  //     //   data: seriesData2
  //     //     ? seriesData2
  //     //     : [13, 5, 8, 10, 5, 7, 18, 25, 8, 13, 22, 10, 12, 21, 20, 23, 12, 10],
  //     // },
  //   ],
  //   options: {
  //     chart: {
  //       type: "bar",
  //       height: 630,
  //       width: "100%",
  //       toolbar: false,
  //     },
  //     plotOptions: {
  //       bar: {
  //         horizontal: false,
  //         // dataLabels: {
  //         //   // position: "top",
  //         // },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //       offsetX: -6,
  //       style: {
  //         fontSize: "12px",
  //         colors: ["#fff"],
  //       },
  //     },
  //     stroke: {
  //       show: true,
  //       width: 1,
  //       colors: ["#fff"],
  //     },
  //     tooltip: {
  //       shared: true,
  //       intersect: false,
  //     },
  //     xaxis: {
  //       categories: category
  //         ? category
  //         : [
  //             "PHQ1",
  //             "PHQ2",
  //             "PHQ3",
  //             "PHQ4",
  //             "PHQ5",
  //             "PHQ6",
  //             "PHQ7",
  //             "PHQ8",
  //             "PHQ9",
  //             "PHQ10",
  //             "GAD1",
  //             "GAD2",
  //             "GAD3",
  //             "GAD4",
  //             "GAD5",
  //             "GAD6",
  //             "GAD7",
  //             "GAD8",
  //           ],
  //     },
  //   },
  // });

  // const { options, series } = innitialData;

  return (
    <div id={id} className="chatWrapper2">
      {/* <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={300}
      /> */}

      <NewChart
        data={seriesData}
        category={category}
        name={seriesName}
        type="bar"
        width="100%"
        height={300}
        yAxis={yAxis}
      />
    </div>
  );
};

export default MultipleLine;
