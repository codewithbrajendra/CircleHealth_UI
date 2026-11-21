import React from "react";
import "./Footer.scss";

const Footer = () => {
  let d = new Date();

  return (
    <section className="Footer">
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <p className="text-center mb-0">
              <small>
                Copyright © {d.getFullYear()} Circles Health & Wellbeing
              </small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
