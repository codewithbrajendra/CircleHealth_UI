import axios from "axios";

const ApiHelper = async (EndPoint, Type, Body, accessToken, userUniqueId) => {
  //var basrUrl = "http://3.10.188.151:8989/"; //qa build-qa
  //var basrUrl = "http://18.134.37.34:8989/"; //dev build-dev
  //var basrUrl = "https://chdev.techment.com/"; //dev build-new
  var basrUrl = "https://chuat.techment.com/"; //uat build-new
  //var basrUrl = "https://chqa.techment.com/"; //qa build-new
  //var basrUrl = "https://admin.mhaia.ai/"; //Prod build-new
  //var basrUrl = "https://chqa.techment.com/"; //qa build-new

  // if (window.location.origin.includes("localhost")) {
  //   var basrUrl = "https://chqa.techment.com"; //qa build-new
  // } else {
  //   var baseUrl = window.location.origin;
  // }

  //let accessToken = localStorage.getItem("Token");
  //let userUniqueId = localStorage.getItem("UserUniqueId");
  //console.warn("api token", accessToken);
  //console.warn("api id", userUniqueId);

  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    userUniqueId: userUniqueId,
  };

  if (Type === "GET") {
    return await axios.get(basrUrl + "" + EndPoint, { headers: myHeaders });
  } else {
    return await axios.post(basrUrl + "" + EndPoint, Body, {
      headers: myHeaders,
    });
  }
};
export default ApiHelper;
