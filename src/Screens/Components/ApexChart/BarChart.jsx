import React, { useState } from "react";
import Chart from "react-apexcharts";

const BarChart = (props) => {
  //const { series, options, type } = props.data;
  console.log(props.data);

  const series = [
    {
      name: props.name[0],
      data: props.data.data1,
    },
    {
      name: props.name[1],
      data: props.data.data1,
    },
  ];
  const options = {
    chart: {
      zoom: {
        enabled: true,
      },
      toolbar: false,
    },
    dataLabels: {
      enabled: false,
      offsetX: -6,
    },
    stroke: {
      width: 1,
      // curve: "smooth",
      colors: ["#fff"],
    },
    colors: ["#035c4b", "#1b9cfd"],
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     inverseColors: true,
    //     gradientToColors: ["#2a806f"],
    //     opacityFrom: 1,
    //     opacityTo: 1,
    //     type: "vertical",
    //     stops: [0, 30],
    //   },
    // },
    xaxis: {
      categories: ["cat", "cat", "cat", "cat", "cat", "cat"],
    },
    yaxis: {
      // axisTicks: {
      //   show: true,
      // },
      // axisBorder: {
      //   show: true,
      //   color: "#008FFB",
      // },
      // labels: {
      //   style: {
      //     colors: "#008FFB",
      //   },
      // },
      title: {
        text: props.yAxis,
        // style: {
        //   color: "#008FFB",
        // },
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        type={props.type}
        height={props.height}
        width={props.width}
        series={series}
      />
    </div>
  );
};

export default BarChart;
