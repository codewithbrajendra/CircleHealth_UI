import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import ApiHelper from "../../../../Helpers/ApiHelpers";
import Breadcrumb from "../../../Layouts/Breadcrumb/Breadcrumb";
import {
  emailValidation,
  todayDate,
  accessCodeValidation,
} from "../../../../Helpers/Validations";
import AlertBox from "../../../Components/AlertBox/AlertBox";
import InputBox from "../../../Components/InputBox/inputBox";
import Button from "../../../Components/Buttons/button";
import GetSelectOptions from "../../../Components/GetSelectOptins/GetSelectOptions";

const EditAdmin = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let [alertBox, setAlertBox] = useState({ show: false });

  const emailRef = useRef(null);
  const lNameRef = useRef(null);
  const fNameRef = useRef(null);
  const dobRef = useRef(null);
  const codeRef = useRef(null);
  const genderRef = useRef(null);

  let userId = null;
  const param = useParams();

  if (param && param.id) {
    userId = param.id;
    //console.log("userId--", userId);
  } else {
    userId = false;
  }

  const nowDate = todayDate();

  //console.log(nowDate);
  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    type: "",
    data: [],
    gender: [
      { name: "male", value: "male" },
      { name: "female", value: "female" },
      { name: "other", value: "other" },
    ],
  });

  let { loading, error, type, data } = initialData;

  let history = useHistory();

  const [formData, setFormData] = useState({
    userId: userId,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    accessCode: "",
    dateOfBirth: "",
  });

  const [formError, setFormError] = useState({
    userId: userId,
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    accessCode: "",
    dateOfBirth: "",
    emailLoader: false,
  });

  const formHandler = (e) => {
    console.warn("edit admin form", e.target.name);
    setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const CheckEmailExist = (data) => {
    const emailFormate = emailValidation(formData.email);
    if (emailFormate === true) {
      //alert(data.target.value);
      const fData = {
        email: data.target.value,
        userId: userId ? userId : null,
      };

      //console.log("checkEmail ", fData);
      setFormError((data) => ({ ...data, emailLoader: true }));

      ApiHelper(
        "auth-service/admin/checkAdminEmailAvailabilty",
        "POST",
        fData,
        accessToken,
        userUniqueId
      )
        .then((data) => {
          console.warn("check email true", data);
          if (data && data.data.isValid === true) {
            setFormError((data) => ({
              ...data,
              email: "",
              emailLoader: false,
            }));
          } else {
            setFormError((data) => ({
              ...data,
              email: "Email already exist, try other email id.",
              emailLoader: false,
            }));
            setFormData((data) => ({
              ...data,
              email: "",
            }));
          }
        })
        .catch((err) => {
          console.warn("check email false", err);

          if (err?.response) {
            setFormError((data) => ({
              ...data,
              email: "Something went wrong try again.",
              emailLoader: false,
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
      setFormError((data) => ({
        ...data,
        email: "Invalid email format.",
      }));
      setFormData((data) => ({
        ...data,
        emailLoader: "",
      }));
    }
  };

  const FormSubmit = () => {
    const emailFormate = emailValidation(formData.email);
    const codeFormate = accessCodeValidation(formData.accessCode);

    if (fNameRef.current.value === "") {
      setFormError((item) => ({
        ...item,
        firstName: "Required field",
      }));
    } else {
      setFormError((item) => ({ ...item, firstName: "" }));
    }
    if (lNameRef.current.value === "") {
      setFormError((item) => ({
        ...item,
        lastName: "Required field",
      }));
    } else {
      setFormError((item) => ({ ...item, lastName: "" }));
    }
    if (dobRef.current.value === "") {
      setFormError((item) => ({ ...item, dateOfBirth: "Required field" }));
    } else {
      setFormError((item) => ({ ...item, dateOfBirth: "" }));
    }

    if (genderRef.current.value === "") {
      setFormError((item) => ({ ...item, gender: "Required field" }));
    } else {
      setFormError((item) => ({ ...item, gender: "" }));
    }

    if (emailRef.current.value === "") {
      setFormError((data) => ({ ...data, email: "Required field" }));
    } else {
      if (emailFormate === false) {
        setFormError((data) => ({ ...data, email: "Invalid email" }));
      } else {
        setFormError((data) => ({ ...data, email: "" }));
      }
    }

    // if (codeRef.current.value === "") {
    //   setFormError((data) => ({ ...data, accessCode: "Required field" }));
    // } else {
    //   if (codeFormate === false) {
    //     setFormError((data) => ({
    //       ...data,
    //       accessCode: "Include number, alphabets and at least 6 digits.",
    //     }));
    //   } else {
    //     setFormError((data) => ({ ...data, accessCode: "" }));
    //   }
    // }

    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.gender !== "" &&
      formData.dateOfBirth !== "" &&
      //codeFormate === true &&
      emailFormate === true
    ) {
      EditUser();
    } else {
      //alert("false");
    }
  };

  //edit user
  const EditUser = () => {
    setInitialData((initialData) => ({ ...initialData, loading: true }));

    ApiHelper(
      "auth-service/admin/editUser",
      "POST",
      formData,
      accessToken,
      userUniqueId
    )
      .then((res) => {
        console.warn("Add Admin true", res.data.message);
        if (res && res.data.code === 200) {
          setInitialData((data) => ({
            ...data,
            loading: false,
            error: res.data.message,
            type: "FormSuccess",
          }));

          setAlertBox((data) => ({
            ...data,
            show: true,
            line1: "Admin Update Successfully",
            type: "FormSuccess",
          }));
        } else {
          throw new Error("Error");
        }
      })
      .catch((err) => {
        console.warn("Add User false", err);

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
  };

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...initialData,
      error: null,
    });

    if (alertBox.type === "FormSuccess") {
      setFormData((formData) => ({
        ...formData,
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        accessCode: "",
      }));
      history.push("/admins");
    }
  };

  useEffect(() => {
    const getAdminData = () => {
      setInitialData({ ...initialData, loading: true });

      ApiHelper(
        "auth-service/admin/getAdmin/" + userId,
        "GET",
        "",
        accessToken,
        userUniqueId
      )
        .then((data) => {
          //setInitialData(data);
          console.warn("fetch Therapist data true", data.data);
          if (data && data.data.data) {
            const revData = [data.data.data];

            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
              data: data.data.data,
            }));

            setFormData((item) => ({
              ...item,
              userId: data.data.data.userId ? data.data.data.userId : "",
              firstName: data.data.data.firstName
                ? data.data.data.firstName
                : "",
              lastName: data.data.data.lastName ? data.data.data.lastName : "",
              email: data.data.data.email ? data.data.data.email : "",
              dateOfBirth: data.data.data.dateOfBirth
                ? data.data.data.dateOfBirth
                : "",
              gender: data.data.data.gender ? data.data.data.gender : "",
              accessCode: data.data.data.accessCode
                ? data.data.data.accessCode
                : "",
            }));
          } else {
            throw new Error("Error");
          }
        })
        .catch((err) => {
          //console.warn("fetch Therapist data false", err.response.data);
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
    };
    getAdminData();
  }, []);

  return (
    <>
      <Breadcrumb title="Edit Admin"></Breadcrumb>
      <div className="Page_Inner TherapistManagement p-20 pt-0">
        <section className="">
          <div className="row">
            <div className="col-md-8 mb-3">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="First Name"
                    name="firstName"
                    required="required"
                    ref={fNameRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.firstName}
                    defaultValue={formData.firstName}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="last Name"
                    name="lastName"
                    required="required"
                    ref={lNameRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.lastName}
                    defaultValue={formData.lastName}
                  />
                </div>

                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="date"
                    error={formError.dateOfBirth}
                    styled="2"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    required="required"
                    max={nowDate}
                    defaultValue={formData.dateOfBirth}
                    onChange={(e) => formHandler(e)}
                    ref={dobRef}
                  />
                </div>
                <div
                  className="col-sm-6 mb-3 "
                  style={{ position: "relative" }}
                >
                  <InputBox
                    className="form-control readonly_input"
                    type="text"
                    styled="2"
                    label="Email"
                    name="email"
                    required="required"
                    ref={emailRef}
                    //onChange={(e) => formHandler(e)}
                    error={formError.email}
                    onChange={(e) => formHandler(e)}
                    onBlur={(e) => CheckEmailExist(e)}
                    defaultValue={formData.email}
                    //value={formData.email}
                    //readonly
                  />
                  {formError.emailLoader === true ? (
                    <span className="loader inputValidityloader dark sm  d-inline"></span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-sm-6 mb-3 input__Wrapper">
                  <select
                    className={` form-control selectStyle ${
                      formError.gender && "error"
                    } ${formData.gender && "valid"}`}
                    name="gender"
                    ref={genderRef}
                    onChange={(e) => formHandler(e)}
                  >
                    <option value="">Select Gender</option>

                    {initialData &&
                      initialData.gender &&
                      initialData.gender.map((item, index) => (
                        <GetSelectOptions
                          key={index}
                          value={item.value}
                          name={item.value}
                          selected={
                            item.value === formData.gender ? true : false
                          }
                        />
                      ))}
                  </select>
                  {formError.gender && (
                    <label className="error has-error">Required field</label>
                  )}
                </div>
                <div className="col-sm-6 mb-3">
                  {/* <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="Access Code"
                    name="accessCode"
                    required="required"
                    ref={codeRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.accessCode}
                    defaultValue={formData.accessCode}
                  /> */}
                </div>
                <div className="col-md-12">
                  <Button
                    className="btn btn-theme1-circle px-5"
                    onClick={() => FormSubmit()}
                    disabled={
                      formError.emailLoader === true ||
                      formError.codeLoader === true
                        ? "disabled"
                        : ""
                    }
                  >
                    {loading === true ? (
                      <span className="loader light sm d-inline"></span>
                    ) : (
                      <span>Edit Admin </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {alertBox.show && (
          <AlertBox
            data={alertBox}
            type={alertBox.type}
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )}
      </div>
    </>
  );
};

export default EditAdmin;
