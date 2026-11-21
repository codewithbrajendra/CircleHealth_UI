import React, { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import WidgetBox from "../../../../Components/Widgets/WidgetBox";
import WidgetBox2 from "../../../../Components/Widgets/WidgetBox2";
import WidgetBox3 from "../../../../Components/Widgets/WidgetBox3";
import ApiHelper from "../../../../../Helpers/ApiHelpers";
import DateRangePicker from "react-bootstrap-daterangepicker";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import "./Analytics.scss";
import AlertBox from "../../../../Components/AlertBox/AlertBox";

function AnalyticsDetails() {
  const { id: userId } = useParams();
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let [alertBox, setAlertBox] = useState({ show: false });

  console.log("Id", userId);
  //console.log(nowDate);
  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    type: "",
    data: [],
  });

  const {
    totalVisitCount,
    totalWellnessCheck,
    totalProfileQuestion,
    totalTimeUserSpentOnWebsite,
    booking,
    totalTimeVideoWatched,
    perPageDetails,
    wellnessPageDetails,
    profilePageDetails,
    exitPageDetails,
    blogPageDetails,
  } = initialData.data;

  const ethnicityRef = useRef(null);
  const genderRef = useRef(null);
  const RangeRef = useRef(null);

  const [formData, setFormData] = useState({
    startDate: moment().subtract(6, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });
  const [formError, setFormError] = useState({});

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

  const formHandler = () => {};

  const [totalViews, setTotalViews] = useState({
    id: 1,
    name: "Total Visits",
    //bigTitle: totalVisitCount ? totalVisitCount : 0,
  });

  const [totalTimeUserSpent, setTotalTimeUserSpent] = useState({
    id: 2,
    name: "Total Time Spent",
    //bigTitle: totalTimeUserSpentOnWebsite ? totalTimeUserSpentOnWebsite : 0,
  });

  const [totalWellnessChecks, setTotalWellnessChecks] = useState({
    id: 6,
    name: "Total Wellness Checks",
  });

  // const [uniqueUserHadWellnessChecks, setUserHadWellnessChecks] = useState({
  //   id: 7,
  //   name: "Unique Users had Wellness Checks",
  //   bigTitle: "437",
  //   shortInfo: "12",
  //   shortInfoStatus: "positive",
  //   graphData: "",
  // });

  // const [
  //   percentageUniqueUserHadWellnessChecks,
  //   setpercentageUniqueUserHadWellnessChecks,
  // ] = useState({
  //   id: 12,
  //   name: "Unique Users had Wellness Checks %",
  //   bigTitle: "437",
  //   shortInfo: "12",
  //   shortInfoStatus: "positive",
  //   graphData: "",
  // });

  const [userWellnessProfiling, setUserWellnessProfiling] = useState({
    id: 13,
    name: "Wellness & Profiling Completed",
    bigTitle: "437",
    shortInfo: "12",
    shortInfoStatus: "positive",
    graphData: "",
  });

  const [totalBookings, setTotalBookings] = useState({
    id: 14,
    name: "Total Bookings",
  });

  const [totalNumberVideoWatched, setTotalNumberVideoWatched] = useState({
    id: 16,
    name: "Total Video Watched",
  });

  const [assessmentTimes, setAssessmentTimes] = useState({
    id: 17,
    name: "Time spent on each Wellness question",
  });

  const [profilingTimes, setProfilingTimes] = useState({
    id: 18,
    name: "Time spent on each Profiling question ",
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

  useEffect(() => {
    setInitialData((item) => ({ ...item, loading: true }));
    ApiHelper(
      "auth-service/analytics/getanalyticsdataforuser",
      "POST",
      { ...formData, userId: userId },
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //console.warn("get Analytics true", res.data.message);
        if (res && res.data.code === 200) {
          const gData = res.data.data == null ? [] : res.data.data;
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
          setInitialData((data) => ({
            ...data,
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

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...initialData,
      error: null,
    });
  };

  return (
    <>
      <div className="tab_inner_profile_details">
        <div className="row">
          <div className="col-md-12 col-lg-11 col-sm-12">
            <div className="row">
              <div className="col-sm-12 ">
                <label
                  style={{ fontSize: 13, fontWeight: 600, paddingBottom: 10 }}
                >
                  Filter
                </label>
              </div>

              <div className="col-sm-12 text-center userTableWrapper">
                <div className="tableFilter d-flex flex-xs-direction">
                  <div className="col-auto">
                    <div className="mb-3 input__Wrapper mr-2">
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
                          <input ref={RangeRef} className="form-control" />
                        </DateRangePicker>
                      </div>
                    </div>
                  </div>
                  <div className="flex-fill"></div>
                  <div className="col-auto mb-3">
                    {initialData.data.length == 0 ? (
                      ""
                    ) : (
                      <a
                        href={`${window.location.origin}/auth-service/analytics/getanalyticscsvforsingleuser/${userId}/${formData.startDate}/${formData.endDate}`}
                        target="_blank"
                        download
                        className="btn btn-theme1-circle px-3 w-sm-100 mw-120"
                      >
                        Download CSV
                      </a>
                    )}
                    {/* <Dropdown>
                      <Dropdown.Toggle
                        id=""
                        variant=""
                        className="btn-theme1-circle"
                      >
                        Download CSV Reports
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          href={`http://chqa.techment.com/auth-service/user/getpatientdetailpdf/`}
                          active
                          target="_blank"
                        >
                          All Reports
                        </Dropdown.Item>
                         <Dropdown.Item href="">
                          Every visit details
                        </Dropdown.Item>
                        <Dropdown.Item href="">
                          Exited the platform list
                        </Dropdown.Item>
                        <Dropdown.Item href="">
                          Time to booking schedule
                        </Dropdown.Item> 
                      </Dropdown.Menu>
                    </Dropdown> */}
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
                        graph={false}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalTimeUserSpent}
                        count={
                          totalTimeUserSpentOnWebsite
                            ? totalTimeUserSpentOnWebsite + " Min."
                            : 0 + " Min."
                        }
                        className="totalTimeUserSpent"
                        graph={false}
                      />
                    </div>
                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalWellnessChecks}
                        count={totalWellnessCheck ? totalWellnessCheck : 0}
                        className="totalWellnessChecks"
                        graph={false}
                      />
                    </div>

                    {/* <div className="col-md-4 col-sm-6 mb-4">
                  <WidgetBox
                    data={uniqueUserHadWellnessChecks}
                    count={
                      uniqueVisitorWellnessCheck
                        ? uniqueVisitorWellnessCheck
                        : 0
                    }
                    className="uniqueUserHadWellnessChecks"
                  />
                </div> */}

                    {/* <div className="col-md-4 col-sm-6 mb-4">
                  <WidgetBox
                    data={percentageUniqueUserHadWellnessChecks}
                    count={
                      usersPercentageWhoAttemptedWellnessCheck
                        ? usersPercentageWhoAttemptedWellnessCheck + "%"
                        : 0 + "%"
                    }
                    className="percentageUniqueUserHadWellnessChecks"
                  />
                </div> */}

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={userWellnessProfiling}
                        count={totalProfileQuestion ? totalProfileQuestion : 0}
                        className="userWellnessProfiling"
                        graph={false}
                      />
                    </div>

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalBookings}
                        count={booking ? booking : 0}
                        className="totalBookings"
                        graph={false}
                      />
                    </div>

                    {/* <div className="col-md-4 col-sm-6 mb-4">
                  <WidgetBox
                    data={perUserTotalBookings}
                    count={
                      bookingPercentage ? bookingPercentage + "%" : 0 + "%"
                    }
                    className="perUserTotalBookings"
                  />
                </div> */}

                    <div className="col-md-6 col-sm-6 col-lg-4 mb-4">
                      <WidgetBox
                        data={totalNumberVideoWatched}
                        count={
                          totalTimeVideoWatched ? totalTimeVideoWatched : 0
                        }
                        className="totalNumberVideoWatched"
                        graph={false}
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
                          //filter={{ names: ["Total", "Average"] }}
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
                          // filter={{ names: ["Total", "Average"] }}
                          yAxis={{ names: ["Minutes", "Seconds"] }}
                        />
                      </div>
                    )}

                    {
                      profilePageDetails && (
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
                            className="assessmentTimes"
                            //filter={{ names: ["Total", "Average"] }}
                            yAxis={{ names: ["Minutes", "Seconds"] }}
                          />
                        </div>
                      )
                      // <div className="col-md-12 col-sm-12 mb-4">
                      //   <WidgetBox3
                      //     data={profilingTimes}
                      //     seriesName={["Score", "Seconds"]}
                      //     seriesDataGroup={[
                      //       {
                      //         data1: [13, 14, 15, 15, 13, 12],
                      //         data2: [13, 14, 15, 15, 13, 12],
                      //       },
                      //       {
                      //         data1: [23, 24, 15, 15, 13, 12],
                      //         data2: [13, 14, 15, 15, 13, 12],
                      //       },
                      //       {
                      //         data1: [33, 34, 15, 15, 13, 12],
                      //         data2: [13, 14, 15, 15, 13, 12],
                      //       },
                      //     ]}
                      //     category={["q1", "q2", "q3", "q4", "q5", "q6"]}
                      //     className="profilingTimes"
                      //     filter={{ names: ["pro", "pro2", "pro3"] }}
                      //   />
                      // </div>
                    }

                    {/* {exitPageDetails && (
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
                      seriesName1="Average"
                      seriesData1={exitPageDetails
                        .filter((item) => item.category === "Profiling")
                        .map((item) => Math.floor(item.pageCount))}
                      seriesName2="Total"
                      seriesData2={exitPageDetails
                        .filter((item) => item.category === "Profiling")
                        .map((item) => Math.floor(item.pageCount))}
                      category={exitPageDetails
                        .filter((item) => item.category === "Profiling")
                        .map((item) => item.pagePath)}
                      className="profilingTimes"
                      //filter={{ names: ["Total", "Average"] }}
                      //yAxis={true}
                    />
                  </div>
                )} */}

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
                            .map((item) => item.pageCount)}
                          seriesName2="Total"
                          seriesData2={blogPageDetails.map(
                            (item) => item.pageCount
                          )}
                          category={blogPageDetails
                            .sort((a, b) => {
                              if (a.pagePath < b.pagePath) {
                                return -1;
                              }
                              if (a.pagePath > b.pagePath) {
                                return 1;
                              }
                              return 0;
                            })
                            .map((item) => item.pagePath)}
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
}

export default AnalyticsDetails;
