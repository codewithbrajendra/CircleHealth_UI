import React, { useEffect } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
const Home = () => {
  useEffect(() => {
    return () => {
      //clearInterval();
    };
  }, []);

  return (
    <>
      <Breadcrumb title="Home"></Breadcrumb>
      <div className="Page_Inner Home px-20 pt-0">
        <div className="row">
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
