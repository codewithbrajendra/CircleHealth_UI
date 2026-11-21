import React, { useState } from "react";
import Chart from "react-apexcharts";

const NewChart = (props) => {
  //const { series, options, type } = props.graphData;

  const series = [
    {
      name: props.name,
      data: props.data,
    },
    // {
    //   name: props.name,
    //   data: props.data,
    // },
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
      categories: props.category
        ? props.category
        : [
            "PHQ1",
            "PHQ2",
            "PHQ3",
            "PHQ4",
            "PHQ5",
            "PHQ6",
            "PHQ7",
            "PHQ8",
            "PHQ9",
            "PHQ10",
            "GAD1",
            "GAD2",
            "GAD3",
            "GAD4",
            "GAD5",
            "GAD6",
            "GAD7",
            "GAD8",
          ],
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

export default NewChart;
