import { useState, useEffect } from "react";
import Header from "./Screens/Layouts/Header/Header";
import Footer from "./Screens/Layouts/Footer/Footer";
import SideBar from "./Screens/Layouts/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

import Routing from "../src/Routes/Routing";
//redux
import { useSelector } from "react-redux";
import "./App.scss";
import gtag from "ga-gtag";
//import Example from "./demo11";

function App() {
  const Auth = useSelector((state) => state.authUser);

  let userId = localStorage.getItem("UserId");
  //console.log(Auth.LoggedIn);
  //ReactGA.set({ user_id: userId ? userId : 0 });
  gtag("config", "G-3W2QWQE659", {
    user_id: userId ? userId : 0,
  });
  gtag("set", "user_properties", {
    crm_id: userId ? userId : 0,
    user_id_dimensions: userId ? userId : 0,
  });

  /*****add class on small screen********/
  const getWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [winWidth, setWinWidth] = useState(getWidth());
  let [menuToggle, setMenuToggle] = useState(false);

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWinWidth(getWidth());
    };
    // set resize listener
    window.addEventListener("resize", resizeListener);
    window.addEventListener(
      "orientationchange",
      function () {
        //alert(window.orientation);
        window.location.reload();
      },
      false
    );
  }, []);

  /******menu handler******/
  const menuHandler = () => {
    setMenuToggle((menuToggle = !menuToggle));
  };

  let location = useLocation();

  useEffect(() => {
    //ga.send(["pageview", location.pathname]);

    // let oldPath = localStorage.getItem("path")
    //   ? localStorage.getItem("path")
    //   : "";
    // console.log(
    //   "location ",
    //   !location.pathname.includes("user_info"),
    //   "Old ",
    //   oldPath
    // );

    // if (
    //   oldPath.includes("user_info") &&
    //   !location.pathname.includes("user_info")
    // ) {
    //   alert("ok");
    // }

    // if (location.pathname)
    // window.addEventListener("beforeunload", function (e) {
    //   e.preventDefault();
    //   // alert("ok");
    //   console.log("location", "ss");
    // });
    localStorage.setItem("path", location.pathname);
  }, [location]);

  return (
    <div
      className={`App ${winWidth <= 700 ? "MobileScreen" : ""} ${
        menuToggle === true ? "menuOpen" : ""
      } ${Auth.LoggedIn === true ? "UserLoggedIn" : "UserLogout"} `}
    >
      <Header
        menuToggle={winWidth <= 700 ? true : false}
        menuHandler={menuHandler}
      />
      <SideBar menuHandler={menuHandler} UserType={Auth.UserType} />
      <Routing Auth={Auth.LoggedIn} UserType={Auth.UserType} />
      <Footer />
      {/* <Example /> */}
    </div>
  );
}

export default App;
