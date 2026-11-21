import React from "react";
import "./CalendlyBooking.scss";

const CalendlyBooking = () => {
  return (
    <div className="text-center calendlyBookingWrapper">
      <iframe
        className="Iframe"
        src="https://calendly.com/bagnallconsultancyltd/circles?month=2021-11"
      ></iframe>
    </div>
  );
};

export default CalendlyBooking;
