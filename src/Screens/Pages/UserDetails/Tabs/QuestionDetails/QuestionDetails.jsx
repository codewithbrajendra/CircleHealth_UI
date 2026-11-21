import React, { useState, useEffect, useRef } from "react";
import MyAccordion from "../../../../Components/MyAccordion/MyAccordion";
import QusAns from "../../../../Components/QusAns/QusAns";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router";

import "./Question.scss";
import ApiHelper from "../../../../../Helpers/ApiHelpers";
import GetSelectOptions from "../../../../Components/GetSelectOptins/GetSelectOptions";
import AlertBox from "../../../../Components/AlertBox/AlertBox";

function QuestionDetails() {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let [alertBox, setAlertBox] = useState({ show: false });

  const refDate = useRef(null);

  const params = useParams();

  const [initialData, setInitialData] = useState({
    userId: params.id ? params.id : "",
    loading: "",
    error: null,
    WellnessDates: [],
    WellnessDetails: [],
    selectedId: 0,
  });

  const [activeDate, setActiveDate] = useState(null);

  let { userId, loading, error, WellnessDates, WellnessDetails, selectedId } =
    initialData;

  const getDates = () => {
    if (params.id) {
      setInitialData((initialData) => ({
        ...initialData,
        loading1: true,
      }));
      ApiHelper(
        "auth-service/user/getpatientwellnesscheckdate/" + userId,
        "GET",
        "",
        accessToken,
        userUniqueId
      )
        .then((res) => {
          //setInitialData(data);
          console.warn("fetch date true", res);
          if (res && res.data.data) {
            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
              WellnessDates: res.data.data,
            }));

            const dataOk = res.data.data.map((item) => {
              if (item.activeDate === true) {
                return { activeDate: item.wellnessCheckId };
              } else {
                return "";
              }
            });
            //console.log(dataOk);
            setActiveDate(dataOk[0].activeDate);
          } else {
            // throw new Error("Error");
            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
            }));
          }
        })
        .catch((err) => {
          //console.warn("fetch dates false", err.response.data);
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
    }
  };

  const getWellnessDetails = (id) => {
    //alert(id);
    let url = "auth-service/user/userquestiondetail/" + userId + "/" + id;

    if (params.id) {
      setInitialData((initialData) => ({
        ...initialData,
        loading: true,
      }));
      ApiHelper(url, "GET", "", accessToken, userUniqueId)
        .then((res) => {
          //setInitialData(data);
          console.warn("filter Wellness data  true ", res);
          if (res && res.data.data) {
            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
              WellnessDetails: res.data.data,
            }));

            //alert(res.data.data.wellnessCheckDetails.wellnessCheckId);
            //console.log(res.data.data.wellnessCheckDetails.wellnessCheckId);
            setActiveDate(res.data.data.wellnessCheckDetails.wellnessCheckId);
            refDate.current.value =
              res.data.data.wellnessCheckDetails.wellnessCheckId;
          } else {
            //throw new Error("Error");
          }
        })
        .catch((err) => {
          //console.warn("filter Wellness data err", err.response.data);
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
    }
  };

  const filter = (e) => {
    let id = e.target.value;
    //alert(id);
    getWellnessDetails(id);
  };

  useEffect(() => {
    getDates();
    getWellnessDetails(0);
  }, []);

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...initialData,
      error: null,
    });
  };
  //console.log("Dates ", WellnessDates.length);

  return (
    <>
      {loading === true ? (
        <div className="col-md-12 text-center">
          <span className="loader d-inline"></span>
        </div>
      ) : (
        <div className="tab_inner_question_details">
          <div className="row">
            {WellnessDates && WellnessDates.length > 0 ? (
              <div className="col-md-12 col-sm-12 col-lg-9">
                <div className="d-flex justify-content-end align-items-center ">
                  <label className="mb-3 pr-2"> Filter </label>
                  <div className="col-sm-auto">
                    <select
                      className="form-control  mb-3  min-w-250"
                      style={{ border: "1px solid #20534b", minWidth: 120 }}
                      onChange={(e) => filter(e)}
                      ref={refDate}
                    >
                      {WellnessDates &&
                        WellnessDates.map((item, index) => (
                          <GetSelectOptions
                            key={index}
                            value={item.wellnessCheckId}
                            // name={dateFormatterWithTime(item.wellnessCheckDate)}
                            // selected={
                            //   index.wellnessCheckId === activeDate
                            //     ? true
                            //     : false
                            // }
                            name={item.wellnessCheckDate}
                          />
                        ))}
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center">
                    <span className="loader d-inline"></span>
                  </div>
                ) : (
                  <>
                    <div className="MyAccordionWrapper">
                      <Accordion defaultActiveKey="0">
                        {WellnessDetails &&
                          WellnessDetails.wellnessCheckDetails && (
                            <MyAccordion
                              title="Wellness Check Questions"
                              type="Wellness"
                              ActiveKey="0"
                              GAD={
                                WellnessDetails.wellnessCheckDetails.gad7Score
                              }
                              PHQ={
                                WellnessDetails.wellnessCheckDetails.phq9Score
                              }
                              TOTAL={
                                WellnessDetails.wellnessCheckDetails
                                  .totalWellnessScore
                              }
                              className="mb-4"
                            >
                              {WellnessDetails.wellnessCheckDetails
                                .wellnessCheckDetials &&
                                WellnessDetails.wellnessCheckDetails.wellnessCheckDetials.map(
                                  (item, index) => (
                                    <QusAns
                                      type="Wellness"
                                      qus={item.question}
                                      ans={item.option}
                                      score={item.score}
                                      no={index + 1}
                                      key={index}
                                    ></QusAns>
                                  )
                                )}

                              {/* <QusAns
                    type="Wellness"
                    ans="ddd"
                    qus="sadddd?"
                    score="0"
                  ></QusAns> */}
                            </MyAccordion>
                          )}

                        {WellnessDetails && WellnessDetails.profileDetails && (
                          <MyAccordion
                            title="Profiling Questions"
                            type="Profiling"
                            ActiveKey="1"
                            className="mb-4"
                          >
                            {WellnessDetails.profileDetails.map(
                              (item, index) => (
                                <QusAns
                                  type="Profiling"
                                  ans={item.response}
                                  qus={item.question}
                                  no={index + 1}
                                  key={index}
                                ></QusAns>
                              )
                            )}
                            {/* <QusAns type="Profiling" ans="ddd" qus="sadddd?"></QusAns>
                             */}
                          </MyAccordion>
                        )}
                      </Accordion>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="col-md-12">
                <p className="text-center">No Record Found.</p>
              </div>
            )}
          </div>
        </div>
      )}

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

export default QuestionDetails;
