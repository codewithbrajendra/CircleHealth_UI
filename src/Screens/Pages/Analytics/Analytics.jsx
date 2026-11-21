import React, { useRef, useState, useEffect } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
import GetSelectOptions from "../../Components/GetSelectOptins/GetSelectOptions";
import WidgetBox from "../../Components/Widgets/WidgetBox";
import WidgetBox2 from "../../Components/Widgets/WidgetBox2";
import ApiHelper from "../../../Helpers/ApiHelpers";

import AlertBox from "../../Components/AlertBox/AlertBox";
import DateRangePicker from "react-bootstrap-daterangepicker";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import "./Analytics.scss";

const Analytics = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  //console.log(new Date().toISOString());
  let [alertBox, setAlertBox] = useState({ show: false });
  //console.log(nowDate);
  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    type: "",
    data: [],
  });

  const {
    totalVisitCount,
    uniqueUserCount,
    totalWellnessCheck,
    uniqueVisitorWellnessCheck,
    usersPercentageWhoAttemptedWellnessCheck,
    totalProfileQuestion,
    uniqueVisitorsProfileQuestion,
    booking,
    bookingPercentage,
    totalTimeVideoWatched,
    perPageDetails,
    wellnessPageDetails,
    profilePageDetails,
    blogPageDetails,
    exitPageDetails,
  } = initialData.data;

  const ethnicityRef = useRef(null);
  const genderRef = useRef(null);
  const RangeRef = useRef(null);
  const ageRef = useRef(null);

  const [formData, setFormData] = useState({
    startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    ageStart: null,
    ageEnd: null,
    ethnicity: null,
    gender: null,
    age: null,
  });
  const [formError, setFormError] = useState({
    age: "",
    ethnicity: "",
    gender: "",
  });

  const myRange = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 15 Days": [moment().subtract(14, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
    "Last 6 Month": [
      moment().subtract(5, "month").startOf("month"),
      moment().subtract(1, "month").endOf("month"),
    ],
    "This Year": [moment().startOf("year"), moment().endOf("year")],
    "Last Year": [
      moment().subtract(1, "year").startOf("year"),
      moment().subtract(1, "year").endOf("year"),
    ],
    All: [moment("2021-01-01"), moment().subtract(1, "days")],
  };

  // const handleEvent = (event, picker) => {
  //   console.log(event);
  //   console.log(picker.startDate);
  // };
  const handleCallback = (start, end, label) => {
    //alert("ok");
    const sdate = start.format("DD-MM-YYYY");
    const edate = end.format("DD-MM-YYYY");
    console.log(sdate, edate, label);
    setFormData((item) => ({
      ...item,
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
    }));
  };

  const setAgeRange = (data) => {
    let ageRange = {
      start: null,
      end: null,
    };

    switch (data) {
      case "1":
        ageRange.end = moment().subtract(18, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(25, "year").format("YYYY-MM-DD");
        //alert(moment().subtract(1, "year").format("YYYY-MM-DD"));
        break;
      case "2":
        ageRange.end = moment().subtract(26, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(35, "year").format("YYYY-MM-DD");
        break;
      case "3":
        ageRange.end = moment().subtract(36, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(45, "year").format("YYYY-MM-DD");
        break;
      case "4":
        ageRange.end = moment().subtract(46, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(55, "year").format("YYYY-MM-DD");
        break;
      case "5":
        ageRange.end = moment().subtract(56, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(65, "year").format("YYYY-MM-DD");
        break;
      case "6":
        ageRange.end = moment().subtract(66, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(75, "year").format("YYYY-MM-DD");
        break;
      case "7":
        ageRange.end = moment().subtract(76, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(85, "year").format("YYYY-MM-DD");
        break;
      case "8":
        ageRange.end = moment().subtract(86, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(95, "year").format("YYYY-MM-DD");
        break;
      case "9":
        ageRange.end = moment().subtract(96, "year").format("YYYY-MM-DD");
        ageRange.start = moment().subtract(150, "year").format("YYYY-MM-DD");
        break;
      default:
        ageRange.start = null;
        ageRange.end = null;
    }
    return ageRange;
  };

  const formHandler = (e) => {
    //alert(e.target.value);
    if (e.target.name === "age") {
      let age = setAgeRange(e.target.value);

      //console.log("ages", age);
      setFormData((data) => ({
        ...data,
        ageStart: e.target.value == "" ? null : age.start,
        ageEnd: e.target.value == "" ? null : age.end,
        age: e.target.value == "" ? null : e.target.value,
      }));
    } else {
      if (e.target.name === "ethnicity") {
        //slice ethnicity value max 30 character
        setFormData((data) => ({
          ...data,
          [e.target.name]:
            e.target.value == "" ? null : e.target.value.slice(0, 30),
        }));
      } else {
        setFormData((data) => ({
          ...data,
          [e.target.name]: e.target.value == "" ? null : e.target.value,
        }));
      }
    }
  };

  const [totalViews, setTotalViews] = useState({
    id: 1,
    name: "Total Visits",
    bigTitle: totalVisitCount ? totalVisitCount : 0,
    shortInfo: "2",
    shortInfoStatus: "negative",
    graphData: "",
  });

  const [uniqueCustomers, setUniqueCustomers] = useState({
    id: 2,
    name: "Unique Customers",
    bigTitle: uniqueUserCount ? uniqueUserCount : 0,
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [averageSpendTime, setAverageSpendTime] = useState({
    id: 3,
    name: "User average Spend Time",
    bigTitle: "37",
    shortInfo: "5",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [totalWellnessChecks, setTotalWellnessChecks] = useState({
    id: 6,
    name: "Total Wellness Checks",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [uniqueUserHadWellnessChecks, setUserHadWellnessChecks] = useState({
    id: 7,
    name: "Unique Users had Wellness Checks",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [
    percentageUniqueUserHadWellnessChecks,
    setpercentageUniqueUserHadWellnessChecks,
  ] = useState({
    id: 12,
    name: "Unique Users had Wellness Checks %",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [userWellnessProfiling, setUserWellnessProfiling] = useState({
    id: 13,
    name: "Users had Wellness & Profiling",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [totalBookings, setTotalBookings] = useState({
    id: 14,
    name: "Total Bookings",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [perUserTotalBookings, setPerUserTotalBookings] = useState({
    id: 15,
    name: "Booking %",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [totalNumberVideoWatched, setTotalNumberVideoWatched] = useState({
    id: 16,
    name: "Total Video Watched",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [assessmentTimes, setAssessmentTimes] = useState({
    id: 17,
    name: "Time spent on each Wellness question",
    shortInfoStatus: "positive",
    wellnessDate: "2021-12-05",
    PHQ: 12,
    GAD: 5,
    TOTAL: 17,
  });

  const [profilingTimes, setProfilingTimes] = useState({
    id: 18,
    name: "Time spent on each Profiling question",
    shortInfoStatus: "positive",
    wellnessDate: "2021-12-05",
    PHQ: 12,
    GAD: 5,
    TOTAL: 17,
  });

  const [pagesTimes, setPagesTimes] = useState({
    id: 19,
    name: "Time spent on each Page",
  });

  const [blogPageVisits, setBlogPageVisits] = useState({
    id: 20,
    name: "Blog page visits count",
  });

  const [wellnessExit, setWellnessExit] = useState({
    id: 21,
    name: "User exit count from wellness question",
  });

  const [profileExit, setProfileExit] = useState({
    id: 22,
    name: "User exit count from profiling question",
  });

  // const downloadHandler = () => {
  //   setInitialData((item) => ({ ...item, loading: true }));
  //   ApiHelper(
  //     "auth-service/analytics/getanalyticscsvforallusers",
  //     "POST",
  //     formData,
  //     accessToken,
  //     userUniqueId
  //   )
  //     .then((res) => {
  //       console.warn("Download true", res);
  //       // if (res && res.data.code === 200) {
  //       //   setInitialData((item) => ({
  //       //     ...item,
  //       //     loading: false,
  //       //     error: res.data.message,
  //       //     type: "FormSuccess",
  //       //     data: res.data.data,
  //       //   }));
  //       // } else {
  //       //   throw new Error("Error");
  //       // }
  //     })
  //     .catch((err) => {
  //       console.warn("Download false", err);
  //       // if (err.response && err.response.data.message) {
  //       //   setInitialData((item) => ({
  //       //     ...item,
  //       //     loading: false,
  //       //     type: "FormError",
  //       //     error: err.response.data.message,
  //       //   }));
  //       // } else {
  //       //   setInitialData((item) => ({
  //       //     ...item,
  //       //     loading: false,
  //       //     type: "FormError",
  //       //     error: "Something went wrong try again.",
  //       //   }));
  //       // }
  //     });
  // };

  useEffect(() => {
    setInitialData((item) => ({ ...item, loading: true }));
    ApiHelper(
      "auth-service/analytics/getanalyticsdataforallusers",
      "POST",
      formData,
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //console.warn("get Analytics true", res.data.message);
        if (res && res.data.code === 200) {
          const gData = res.data.data == null ? [] : res.data.data;
          //console.log("gdata", res.data.data);
          setInitialData((item) => ({
            ...item,
            loading: false,
            error: res.data.message,
            type: "FormSuccess",
            data: gData,
          }));
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) => {
        console.warn("get Analytics false", err);

        if (err?.response) {
          setInitialData((item) => ({
            ...item,
            loading: false,
            type: "FormError",
            error: err.response.data.message,
          }));

          if (err.response.data.code === 401) {
            setAlertBox({ show: true, type: "TokenExpire" });
            return;
          }
        } else {
          setInitialData((initialData) => ({
            ...initialData,
            loading: false,
          }));
          setAlertBox({ show: true, type: "NetError" });
        }
      });
  }, [formData]);

  const showModal = (data) => {
    setAlertBox((item) => ({ ...item, show: true, ...data }));
  };
  //confirm delete user
  const confirmModal = () => {
    //alert("ok");
    setAlertBox({ show: false });
  };
  const closeModal = () => {
    setAlertBox({ show: false });
  };

  return (
    <>
      <Breadcrumb title="Analytics"></Breadcrumb>
      <div className="Page_Inner AnalyticsPage px-20 pt-0">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 ">
            <div className="row">
              <div className="col-sm-12 ">
                <label
                  style={{ fontSize: 13, fontWeight: 600, paddingBottom: 10 }}
                >
                  Filter
                </label>
              </div>

              <div className="col-sm-12 text-center userTableWrapper">
                <div className="tableFilter row flex-xs-direction">
                  <div className="col-lg-3 col-md-6">
                    <div className="mb-3 input__Wrapper">
                      <div className="dateRangePickerBox">
                        <DateRangePicker
                          initialSettings={{
                            startDate: moment().subtract(6, "days"),
                            endDate: moment(),
                            ranges: myRange,
                            //timePicker: true,
                            //timePickerSeconds: true,
                            showCustomRangeLabel: true,
                          }}
                          //onApply={(e, p) => handleEvent(e, p)}
                          onCallback={(s, e, p) => handleCallback(s, e, p)}
                        >
                          <input
                            ref={RangeRef}
                            className={`form-control ${
                              formData.startDate && "valid"
                            }`}
                          />
                        </DateRangePicker>
                      </div>

                      {/* <InputBox
                    styled="2"
                    name="date"
                    label="Date"
                    type="date"
                    className="form-control text-left"
                    onChange={(e) => formHandler(e)}
                    required="required"
                    error=""
                    defaultValue={todayDate}
                    max={todayDate}
                    ref={dateRef}
                  /> */}
                    </div>
                  </div>
                  <div className="col-md-9">
                    <div className="row">
                      <div className="col-lg-3 col-md-6">
                        <div className="mb-3 input__Wrapper  mr-2 input__Wrapper">
                          <select
                            className={` form-control selectStyle ${
                              formError.age && "error"
                            } ${formData.age && "valid"}`}
                            name="age"
                            onChange={(e) => formHandler(e)}
                            ref={ageRef}
                          >
                            <option value="">Select Age</option>
                            <option value="1">18-25</option>
                            <option value="2">26-35</option>
                            <option value="3">36-45</option>
                            <option value="4">46-55</option>
                            <option value="5">56-65</option>
                            <option value="6">66-75</option>
                            <option value="7">76-85</option>
                            <option value="8">86-95</option>
                            <option value="9">96+</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <div className="mb-3 input__Wrapper  mr-2 input__Wrapper">
                          <select
                            className={` form-control selectStyle ${
                              formError.ethnicity && "error"
                            } ${formData.ethnicity && "valid"}`}
                            name="ethnicity"
                            onChange={(e) => formHandler(e)}
                            ref={ethnicityRef}
                          >
                            {/* <option value="">Select Ethnicity</option>
                    <GetSelectOptions
                      key={1}
                      value="df"
                      name="ff"
                      selected={"dd" === "das" ? true : false}
                    />
                    <GetSelectOptions
                      key={2}
                      value="df"
                      name="ff"
                      selected={"dd" === "das" ? true : false}
                    />
                    <GetSelectOptions
                      key={3}
                      value="df"
                      name="ff"
                      selected={"dd" === "das" ? true : false}
                    /> */}

                            <option value="">Select Ethnicity</option>
                            <option value="White">White</option>
                            <option value="Mixed or Multiple ethnic groups">
                              Mixed or Multiple ethnic groups
                            </option>
                            <option value="Asian or Asian British">
                              Asian or Asian British
                            </option>
                            <option value="Black, African, Caribbean or Black British">
                              Black, African, Caribbean or Black British
                            </option>
                            <option value="Other Ethnic Group">
                              Other Ethnic Group
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <div className="mb-3 input__Wrapper  mr-2 input__Wrapper">
                          <select
                            className={` form-control selectStyle ${
                              formError.gender && "error"
                            } ${formData.gender && "valid"}`}
                            name="gender"
                            onChange={(e) => formHandler(e)}
                            ref={genderRef}
                          >
                            <option value="">Select Gender</option>
                            <GetSelectOptions
                              key={1}
                              value="Male"
                              name="Male"
                              selected={"dd" === "das" ? true : false}
                            />
                            <GetSelectOptions
                              key={2}
                              value="Female"
                              name="Female"
                              selected={"dd" === "das" ? true : false}
                            />
                            <GetSelectOptions
                              key={3}
                              value="Other"
                              name="Other"
                              selected={"dd" === "das" ? true : false}
                            />
                          </select>
                        </div>
                      </div>
                      <div className="col-auto mb-3">
                        {initialData.data.length == 0 ? (
                          ""
                        ) : (
                          <a
                            //onClick={() => downloadHandler()}
                            className="btn btn-theme1-circle px-3 w-sm-100 mw-120"
                            href={`${window.location.origin}/auth-service/analytics/getanalyticscsvforallusers/${formData.startDate}/${formData.endDate}/${formData.ageStart}/${formData.ageEnd}/${formData.gender}/${formData.ethnicity}`}
                            target="_blank"
                            download
                          >
                            Download CSV
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {initialData.loading === true ? (
              <div className="text-center">
                <span className="loader d-inline"></span>
              </div>
            ) : (
              <>
                {initialData.data == "" ? (
                  <div className="text-center">Sorry No Data Found.</div>
                ) : (
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalViews}
                        count={totalVisitCount ? totalVisitCount : 0}
                        className="totalViews"
                        graph={true}
                        category={formData}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={uniqueCustomers}
                        count={uniqueUserCount ? uniqueUserCount : 0}
                        className="uniqueCustomers"
                        graph={true}
                        category={formData}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalWellnessChecks}
                        count={totalWellnessCheck ? totalWellnessCheck : 0}
                        className="totalWellnessChecks"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={uniqueUserHadWellnessChecks}
                        count={
                          uniqueVisitorWellnessCheck
                            ? uniqueVisitorWellnessCheck
                            : 0
                        }
                        className="uniqueUserHadWellnessChecks"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={percentageUniqueUserHadWellnessChecks}
                        count={
                          usersPercentageWhoAttemptedWellnessCheck
                            ? usersPercentageWhoAttemptedWellnessCheck + "%"
                            : 0 + "%"
                        }
                        className="percentageUniqueUserHadWellnessChecks"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={userWellnessProfiling}
                        count={totalProfileQuestion ? totalProfileQuestion : 0}
                        className="userWellnessProfiling"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalBookings}
                        count={booking ? booking : 0}
                        className="totalBookings"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={perUserTotalBookings}
                        count={
                          bookingPercentage ? bookingPercentage + "%" : 0 + "%"
                        }
                        className="perUserTotalBookings"
                        graph={true}
                        category={formData}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalNumberVideoWatched}
                        count={
                          totalTimeVideoWatched ? totalTimeVideoWatched : 0
                        }
                        className="totalNumberVideoWatched"
                        graph={true}
                        category={formData}
                      />
                    </div>
                    {perPageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={pagesTimes}
                          seriesName1="Average"
                          seriesData1={perPageDetails.map(
                            (item) => item.avgTimeOnPage
                          )}
                          seriesName2="Total"
                          seriesData2={perPageDetails.map(
                            (item) => item.totalTimeOnPage
                          )}
                          category={perPageDetails.map((item) => item.pagePath)}
                          className="pagesTimes"
                          filter={{ names: ["Total", "Average"] }}
                          yAxis={{ names: ["Minutes", "Seconds"] }}
                        />
                      </div>
                    )}
                    {wellnessPageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={assessmentTimes}
                          seriesName1="Average"
                          seriesData1={wellnessPageDetails.map(
                            (item) => item.avgTimeOnPage
                          )}
                          seriesName2="Total"
                          seriesData2={wellnessPageDetails.map(
                            (item) => item.totalTimeOnPage
                          )}
                          category={wellnessPageDetails.map(
                            (item) => item.pagePath
                          )}
                          className="assessmentTimes"
                          filter={{ names: ["Total", "Average"] }}
                          yAxis={{ names: ["Minutes", "Seconds"] }}
                        />
                      </div>
                    )}
                    {profilePageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={profilingTimes}
                          seriesName1="Average"
                          seriesData1={profilePageDetails.map(
                            (item) => item.avgTimeOnPage
                          )}
                          seriesName2="Total"
                          seriesData2={profilePageDetails.map(
                            (item) => item.totalTimeOnPage
                          )}
                          category={profilePageDetails.map(
                            (item) => item.pagePath
                          )}
                          className="profilingTimes"
                          filter={{ names: ["Total", "Average"] }}
                          yAxis={true}
                        />
                      </div>
                    )}

                    {exitPageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={wellnessExit}
                          seriesName1="Average"
                          seriesData1={exitPageDetails
                            .filter((item) => item.category === "WellnessCheck")
                            .map((item) => Math.floor(item.pageCount))}
                          seriesName2="Total"
                          seriesData2={exitPageDetails
                            .filter((item) => item.category === "WellnessCheck")
                            .map((item) => Math.floor(item.pageCount))}
                          category={exitPageDetails
                            .filter((item) => item.category === "WellnessCheck")
                            .map((item) => item.pagePath)}
                          className="profilingTimes"
                          //filter={{ names: ["Total", "Average"] }}
                          //yAxis={true}
                        />
                      </div>
                    )}

                    {exitPageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={profileExit}
                          // seriesName1="Average"
                          // seriesData1={exitPageDetails
                          //   .filter((item) => item.category === "Profiling")
                          //   //.filter((item) => item.pageExitProfileCount < 15)
                          //   .sort(
                          //     (a, b) =>
                          //       a.pageExitProfileCount - b.pageExitProfileCount
                          //   )
                          //   .map((item) => Math.floor(item.pageCount))}
                          seriesName2="Total"
                          seriesData2={exitPageDetails
                            .filter((item) => item.category === "Profiling")
                            .filter((item) => item.pageExitProfileCount < 15)
                            .sort(
                              (a, b) =>
                                a.pageExitProfileCount - b.pageExitProfileCount
                            )
                            .map((item) => Math.floor(item.pageCount))}
                          category={exitPageDetails
                            .filter((item) => item.category === "Profiling")
                            .filter((item) => item.pageExitProfileCount < 15)
                            .sort(
                              (a, b) =>
                                a.pageExitProfileCount - b.pageExitProfileCount
                            )
                            .map((item) => item.pagePath)}
                          className="profilingTimes"
                          //filter={{ names: ["Total", "Average"] }}
                          //yAxis={true}
                        />
                      </div>
                    )}

                    {blogPageDetails && (
                      <div className="col-md-12 col-sm-12 mb-4">
                        <WidgetBox2
                          data={blogPageVisits}
                          seriesName1="Average"
                          seriesData1={blogPageDetails
                            .sort((a, b) => {
                              if (a.pagePath < b.pagePath) {
                                return -1;
                              }
                              if (a.pagePath > b.pagePath) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((item) => Math.floor(item.pageCount))}
                          seriesName2="Total"
                          seriesData2={blogPageDetails
                            .sort((a, b) => {
                              if (a.pagePath < b.pagePath) {
                                return -1;
                              }
                              if (a.pagePath > b.pagePath) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((item) => Math.floor(item.pageCount))}
                          category={blogPageDetails.map(
                            (item) => item.pagePath
                          )}
                          className="profilingTimes"
                          //filter={{ names: ["Total", "Average"] }}
                          //yAxis={true}
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {alertBox.show && (
        <AlertBox
          data={alertBox}
          type={alertBox.type}
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </>
  );
};

export default Analytics;
