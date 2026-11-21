import { useState, useEffect, useRef } from "react";
import Button from "../../../Components/Buttons/button";

import { useParams, useHistory, Link } from "react-router-dom";
import GetSelectOptions from "../../../Components/GetSelectOptins/GetSelectOptions";
import InputBox from "../../../Components/InputBox/inputBox";
import Breadcrumb from "../../../Layouts/Breadcrumb/Breadcrumb";
import {
  emailValidation,
  accessCodeValidation,
  dateFormatter,
  todayDate,
} from "../../../../Helpers/Validations";
import "./AddAdmin.scss";
import ApiHelper from "../../../../Helpers/ApiHelpers";
import AlertBox from "../../../Components/AlertBox/AlertBox";

function AddAdmin() {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let history = useHistory();

  const emailRef = useRef(null);
  const lNameRef = useRef(null);
  const fNameRef = useRef(null);
  const dobRef = useRef(null);
  const codeRef = useRef(null);

  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    data: [],
    type: "",
    gender: [
      { name: "male", value: "male" },
      { name: "female", value: "female" },
      { name: "other", value: "other" },
    ],
    copyData: [],
    reverseData: [],
  });

  const { loading, error, copyData, reverseData, data, type } = initialData;
  let [alertBox, setAlertBox] = useState({ show: false });

  const [formData, setFormData] = useState({
    accessCode: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
  });

  const [formError, setFormError] = useState({
    accessCode: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    emailLoader: false,
  });

  const nowDate = todayDate();

  const formHandler = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const FormSubmit = () => {
    const emailFormate = emailValidation(formData.email);
    const codeFormate = accessCodeValidation(formData.accessCode);
    if (formData.firstName === "") {
      setFormError((data) => ({ ...data, firstName: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, firstName: "" }));
    }
    if (formData.lastName === "") {
      setFormError((data) => ({ ...data, lastName: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, lastName: "" }));
    }
    if (formData.dateOfBirth === "") {
      setFormError((data) => ({ ...data, dateOfBirth: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, dateOfBirth: "" }));
    }
    if (formData.gender === "") {
      setFormError((data) => ({ ...data, gender: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, gender: "" }));
    }
    // if (formData.ethnicity === "") {
    //   setFormError((data) => ({ ...data, ethnicity: "Required field" }));
    // } else {
    //   setFormError((data) => ({ ...data, ethnicity: "" }));
    // }

    if (formData.email === "") {
      setFormError((data) => ({ ...data, email: "Required field" }));
    } else {
      if (emailFormate === false) {
        setFormError((data) => ({ ...data, email: "Invalid email" }));
      } else {
        setFormError((data) => ({ ...data, email: "" }));
      }
    }
    if (codeFormate === false) {
      setFormError((data) => ({
        ...data,
        accessCode: "Include number, alphabets and at least 6 digits.",
      }));
    } else {
      setFormError((data) => ({ ...data, accessCode: "" }));
    }
    // alert(codeFormate);
    if (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.gender !== "" &&
      formData.dateOfBirth !== "" &&
      codeFormate === true &&
      emailFormate === true
    ) {
      AddRequest();
    }
  };

  const CheckEmailExist = (data) => {
    const emailFormate = emailValidation(formData.email);
    if (emailFormate === true) {
      //alert(data.target.value);
      const fData = {
        email: data.target.value,
        //userId: userId ? userId : null,
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

  const AddRequest = () => {
    //add user
    setInitialData({ ...initialData, loading: true });

    // let newFormData = {
    //   ...formData,
    //   therapistId: formData.therapistPreference,
    // };

    ApiHelper(
      "auth-service/admin/addAdmin",
      "POST",
      formData,
      accessToken,
      userUniqueId
    )
      .then((res) => {
        console.warn("Add User true", res.data.message);
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
            line1: "Admin Added Successfully",
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

    if (alertBox.type === "FormSuccess") {
      setFormData({
        ...formData,
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        dob: "",
        accessCode: "",
      });
      history.push("/admins");
    }
  };

  return (
    <>
      <Breadcrumb title="Add Admin"></Breadcrumb>
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
                <div className="col-sm-6 mb-3" style={{ position: "relative" }}>
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="Email"
                    name="email"
                    required="required"
                    ref={emailRef}
                    onChange={(e) => formHandler(e)}
                    onBlur={(e) => CheckEmailExist(e)}
                    error={formError.email}
                    defaultValue={formData.email}
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
                  <InputBox
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
                  />
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
                      <span>Add Admin </span>
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
}

export default AddAdmin;
