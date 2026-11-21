import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Buttons/button";
import profileImg from "../../../Assets/Images/big-profile.png";
import { FaFilePdf, FaRegEdit } from "react-icons/fa";
import { useParams } from "react-router";
import { dateFormatter, todayDate } from "../../../Helpers/Validations";
import { Dropdown, DropdownButton } from "react-bootstrap";

import "./ProfileBox.scss";
import ApiHelper from "../../../Helpers/ApiHelpers";
import InnerInfoBox from "./InnerInfoBox/InnerInfoBox";
import AlertBox from "../AlertBox/AlertBox";

const ProfileBox = (props) => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let [alertBox, setAlertBox] = useState({ show: false });

  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    data: [],
  });

  const param = useParams();

  const { link, userType } = props.data;

  const { id: userId } = param;

  const { loading, error, data } = initialData;

  useEffect(() => {
    const getData = () => {
      setInitialData((data) => ({
        ...data,
        loading: false,
      }));
      if (userType === "user") {
        ApiHelper(
          "auth-service/user/getPatientProfileDetails/" + userId,
          "GET",
          "",
          accessToken,
          userUniqueId
        )
          .then((res) => {
            //console.warn("get user true", res.data);
            if (res && res.data.code === 200) {
              setInitialData((data) => ({
                ...data,
                data: res.data.data,
                loading: false,
              }));
            } else {
              setInitialData((data) => ({
                ...data,
                loading: false,
              }));
              // setFormError((data) => ({
              //   ...data,
              //   accessCode: "Access Code already exist, try other code.",
              // }));
            }
          })
          .catch((err) => {
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
      } else {
        let userId = localStorage.getItem("UserId");

        ApiHelper(
          "auth-service/admin/getAdmin/" + userId,
          "GET",
          "",
          accessToken,
          userUniqueId
        )
          .then((res) => {
            //console.warn("get user true", res.data);
            if (res && res.data.code === 200) {
              setInitialData((data) => ({
                ...data,
                data: res.data.data,
                loading: false,
              }));
            } else {
              setInitialData((data) => ({
                ...data,
                loading: false,
              }));
              // setFormError((data) => ({
              //   ...data,
              //   accessCode: "Access Code already exist, try other code.",
              // }));
            }
          })
          .catch((err) => {
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
    getData();
  }, []);

  let therapyVisiblity = false;
  if (data.validateStartTime) {
    const bd = new Date(data.validateStartTime);
    const bTime = bd.getTime();

    const cd = new Date();
    const cTime = cd.getTime();

    console.log("c ", cTime, "b ", bTime);

    if (bTime > cTime) {
      therapyVisiblity = true;
    } else {
      therapyVisiblity = false;
    }
  }

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...initialData,
      error: null,
    });
  };

  return (
    <>
      {loading === true ? (
        <div className="col-md-12">
          <span className="loader d-inline"></span>
        </div>
      ) : (
        <div className="Profile_Box_Wrapper">
          <div className="row mb-3">
            <div className="col-sm-4 col-md-3 col-lg-3 mb-3">
              <div className="ProfileImage ">
                <img src={profileImg} />
              </div>
            </div>
            <div
              className={` profile_details mb-3 ${
                userType === "user"
                  ? "col-sm-8 col-md-9 col-lg-6"
                  : "col-sm-8 col-md-10 col-lg-8"
              }`}
            >
              <div className="row ">
                <div className="col-12 big-title ">
                  <h5>
                    {data.firstName}{" "}
                    {userType === "user" ? data.surName : data.lastName}
                  </h5>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5 title">Date of Birth</div>
                <div className="col-7 ">
                  {userType === "user" ? data.dob : data.dateOfBirth}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-5 title">Email Address</div>
                <div className="col-7 longText">{data.email}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 title">Gender</div>
                <div className="col-7 ">{data.gender}</div>
              </div>
              <div className="row mb-2">
                <div className="col-5 title">Access code</div>
                <div className="col-7 longText">{data.accessCode}</div>
              </div>
              {userType === "user" && (
                <>
                  <div className="row mb-2">
                    <div className="col-5 title">Ethnicity</div>
                    <div className="col-7 ">{data.ethnicity}</div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-5 title">Therapist Preference</div>
                    <div className="col-7 ">{data.therapistPreference}</div>
                  </div>
                </>
              )}
            </div>
            {userType === "user" && (
              <div className="col-sm-12 col-md-12 col-lg-auto linksArea mb-3">
                <p className="editProfile_link mb-0">
                  <Link to={`/edit_pilet_user/${param.id}`}>
                    <FaRegEdit /> Edit
                  </Link>
                </p>
                <div className="height-150"></div>
                {/* <Button className="btn btn-theme1-circle">
                  <FaFilePdf /> {`  Download`}
                </Button> */}
                {data.wellnessCheck && data.isPatientProfileCompleted && (
                  <Dropdown>
                    <Dropdown.Toggle
                      id=""
                      variant=""
                      className="btn-theme1-circle"
                    >
                      Download
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href={`${window.location.origin}/auth-service/user/getpatientdetailpdf/${userId}`}
                        //active
                        target="_blank"
                      >
                        PDF
                      </Dropdown.Item>
                      {/* <Dropdown.Item href="">XLS</Dropdown.Item> */}
                      <Dropdown.Item
                        href={`${window.location.origin}/auth-service/user/getPatientDetailCSV/${userId}`}
                        target="_blank"
                      >
                        CSV
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
            )}
          </div>

          {userType === "user" && (
            <div className="row ">
              {data.wellnessCheck && (
                <div className="col-sm-12 col-md-12 col-lg-12 mb-12">
                  <InnerInfoBox
                    data={{
                      title: "Wellness (Yes)",
                      type: "Wellness",
                      date: data.lastWellnessCheckDate
                        ? dateFormatter(data.lastWellnessCheckDate)
                        : "",
                    }}
                    className="mb-4"
                  />
                </div>
              )}
              <div className="col-sm-12 col-md-12 col-lg-12 mb-12 ">
                {/* {data.isCalendlyBooking && ( */}
                {data.isCalendlyBooking === false && data.status === "active" && (
                  <InnerInfoBox
                    data={{
                      title: "Therapy Session (Yes)",
                      type: "Therapy",
                      date: data.lastCalendlyBookingDate
                        ? data.lastCalendlyBookingDate
                        : "",
                      therapistPreference: data.calendlyBookingTherapistName
                        ? data.calendlyBookingTherapistName
                        : "",
                      from: data.calendlyBookingTimeStart
                        ? data.calendlyBookingTimeStart
                        : "",
                      to: data.calendlyBookingTimeEnd
                        ? data.calendlyBookingTimeEnd
                        : "",
                      note: data.calendlyBookingNote
                        ? data.calendlyBookingNote
                        : "",
                    }}
                    className="mb-4"
                  />
                )}
              </div>
            </div>
          )}
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
};

export default ProfileBox;
