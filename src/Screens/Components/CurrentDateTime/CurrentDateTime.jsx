import React, { useEffect, useState } from "react";

const CurrentDateTime = () => {
  let d = new Date();
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let [day, setDay] = useState(days[d.getDay()]);
  let [month, setMonth] = useState(months[d.getMonth()]);
  let [hour, setHour] = useState(d.getHours());
  let [minut, setMinut] = useState(d.getMinutes());

  const timeUpdate = () => {
    let d = new Date();
    setDay(days[d.getDay()]);
    setMonth(months[d.getMonth()]);
    setHour(d.getHours());
    setMinut(d.getMinutes());
    //console.log(d.getMinutes());
  };

  useEffect(() => {
    const everySec = setInterval(() => {
      timeUpdate();
    }, 1000);
    return () => clearInterval(everySec);
  });

  return (
    <>{`${day} ${String(d.getDate()).padStart(2, "0")} ${month}, ${
      hour > 12
        ? String(hour - 12).padStart(2, "0")
        : String(hour).padStart(2, "0")
    }:${String(minut).padStart(2, "0")} 
    ${hour > 11 ? "PM" : "AM"}`}</>
  );
};

export default CurrentDateTime;
