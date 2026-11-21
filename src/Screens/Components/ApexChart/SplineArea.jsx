import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const SplineArea = (props) => {
  const { id, data, name, category } = props;
  const [innitialData, setInitialData] = useState({
    series: [
      // {
      //   name: "series1",
      //   data: [31, 40, 28],
      // },
      {
        name: "Data",
        type: "area",
        data: [0, data],
      },
    ],
    options: {
      colors: [
        "#2a806f",
        "#FF0000",
        "#66DA26",
        "#546E7A",
        "#E91E63",
        "#FF9800",
      ],
      tooltip: false,
      chart: {
        //height: 100,
        //width: "80%",
        //type: "area",
        toolbar: false,
        tooltip: false,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: [2, 2, 2],
      },
      xaxis: {
        //type: "datetime",
        // categories: [
        //   "2018-09-19T00:00:00.000Z",
        //   "2018-09-19T01:30:00.000Z",
        //   "2018-09-19T02:30:30.000Z",
        // ],
        categories: [category.startDate, category.endDate],
        show: false,
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        // x: {
        //   format: "dd/MM/yy HH:mm",
        //   format: "dd/MM/yy",
        // },
        shared: true,
        intersect: false,
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  });

  const { options, series } = innitialData;

  return (
    <div id={`chart${id}`} className="chatWrapper">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        width={150}
        height={150}
      />
    </div>
  );
};

export default SplineArea;
