import React, { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
import InputBox from "../../Components/InputBox/inputBox";
import Button from "../../Components/Buttons/button";
import { useHistory, Link } from "react-router-dom";
import { emailValidation } from "../../../Helpers/Validations";
import "./AddTherapist.scss";
import ApiHelper from "../../../Helpers/ApiHelpers";
import AlertBox from "../../Components/AlertBox/AlertBox";

const AddTherapist = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  let [alertBox, setAlertBox] = useState({ show: false });

  //console.log(nowDate);
  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    type: "",
    data: [],
  });

  let { loading, error, type, data } = initialData;

  let history = useHistory();

  const [formData, setFormData] = useState({
    therapistFirstName: "",
    therapistLastName: "",
    email: "",
    bearerToken: "",
    apiKey: "",
    schedulingUrl: "",
  });

  const [formError, setFormError] = useState({
    therapistFirstName: "",
    therapistLastName: "",
    email: "",
    bearerToken: "",
    apiKey: "",
    schedulingUrl: "",
  });

  const fNameRef = useRef(null);
  const lNameRef = useRef(null);
  const emailRef = useRef(null);
  const tokenRef = useRef(null);
  const keyRef = useRef(null);
  const urlRef = useRef(null);

  const formHandler = (e) => {
    console.warn("Add Therapist Form", e.target.name);
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const FormSubmit = () => {
    const emailFormate = emailValidation(formData.email);

    if (formData.therapistFirstName === "") {
      setFormError((data) => ({
        ...data,
        therapistFirstName: "Required field",
      }));
    } else {
      setFormError((data) => ({ ...data, therapistFirstName: "" }));
    }
    if (formData.therapistLastName === "") {
      setFormError((data) => ({
        ...data,
        therapistLastName: "Required field",
      }));
    } else {
      setFormError((data) => ({ ...data, therapistLastName: "" }));
    }

    if (formData.schedulingUrl === "") {
      setFormError((data) => ({
        ...data,
        schedulingUrl: "Required field",
      }));
    } else {
      setFormError((data) => ({ ...data, schedulingUrl: "" }));
    }

    if (formData.apiKey === "") {
      setFormError((data) => ({ ...data, apiKey: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, apiKey: "" }));
    }
    if (formData.bearerToken === "") {
      setFormError((data) => ({
        ...data,
        bearerToken: "Required field",
      }));
    } else {
      setFormError((data) => ({ ...data, bearerToken: "" }));
    }
    if (formData.email === "") {
      setFormError((data) => ({ ...data, email: "Required field" }));
    } else {
      if (emailFormate === false) {
        setFormError((data) => ({ ...data, email: "Invalid email" }));
      } else {
        setFormError((data) => ({ ...data, email: "" }));
      }
    }

    // alert(codeFormate);
    if (
      formData.therapistFirstName !== "" &&
      formData.therapistLastName !== "" &&
      formData.apiKey !== "" &&
      formData.schedulingUrl !== "" &&
      formData.bearerToken !== "" &&
      emailFormate === true
    ) {
      AddUser();
    } else {
      //alert("false");
    }
  };

  //add user
  const AddUser = () => {
    setInitialData((initialData) => ({ ...initialData, loading: true }));

    ApiHelper(
      "doctor-service/doctor/addTherapist",
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

    if (type === "FormSuccess") {
      setFormData((formData) => ({
        ...formData,
        therapistFirstName: "",
        therapistLastName: "",
        email: "",
        schedulingUrl: "",
        bearerToken: "",
        apiKey: "",
      }));
      history.push("/therapists");
    }
  };

  return (
    <>
      <Breadcrumb title="Add Therapist"></Breadcrumb>
      <div className="Page_Inner AddPiletUser p-20 pt-0">
        <section className="">
          <div className="row">
            <div className="col-sm-9 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="First Name"
                    name="therapistFirstName"
                    required="required"
                    ref={fNameRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.therapistFirstName}
                    defaultValue={formData.therapistFirstName}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="Last Name"
                    name="therapistLastName"
                    required="required"
                    ref={lNameRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.therapistLastName}
                    defaultValue={formData.therapistLastName}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="Email"
                    name="email"
                    required="required"
                    ref={emailRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.email}
                    defaultValue={formData.email}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    styled="2"
                    label="Scheduling Url"
                    name="schedulingUrl"
                    required="required"
                    ref={urlRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.schedulingUrl}
                    defaultValue={formData.schedulingUrl}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    error=""
                    styled="2"
                    label="Bearer Token"
                    name="bearerToken"
                    required="required"
                    ref={tokenRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.bearerToken}
                    defaultValue={formData.bearerToken}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    error=""
                    styled="2"
                    label="Api Key"
                    name="apiKey"
                    required="required"
                    ref={keyRef}
                    onChange={(e) => formHandler(e)}
                    error={formError.apiKey}
                    defaultValue={formData.apiKey}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-auto">
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
                      <span>Add Therapist </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {error && (
          <AlertBox
            data={{ line1: error }}
            type={type}
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )}

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

export default AddTherapist;
