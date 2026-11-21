import React, { useState, useRef } from "react";
import ApiHelper from "../../../../../Helpers/ApiHelpers";
import AlertBox from "../../../../Components/AlertBox/AlertBox";
import Button from "../../../../Components/Buttons/button";
import InputBox from "../../../../Components/InputBox/inputBox";
import "./ChangeAccess.scss";

const ChangeAccessCode = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");
  let userId = localStorage.getItem("UserId");

  const [initialData, setInitialData] = useState({
    loading: null,
    error: null,
    type: "",
    data: "",
  });

  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const confirmPassRef = useRef(null);

  const { error, loading, data: type } = initialData;

  const [formData, setFormData] = useState({
    oldAccessCode: "",
    newAccessCode: "",
    confirmAccessCode: "",
  });

  const [formError, setFormError] = useState({
    oldAccessCode: "",
    newAccessCode: "",
    confirmAccessCode: "",
  });

  const formHandler = (e) => {
    //console.log(e.target.name);
    if (e.target.name) {
      if (e.target.name === "newAccessCode") {
        if (e.target.value.trim().length > 5) {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value.replace(/ /g, ""),
          });
          setFormError((item) => ({
            ...item,
            newAccessCode: "",
          }));
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value.replace(/ /g, ""),
          });
          setFormError((item) => ({
            ...item,
            newAccessCode: "Min six digits required.",
          }));
        }
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value.replace(/ /g, ""),
        });
      }
    }
  };

  const formSubmit = () => {
    if (formData.oldAccessCode === "") {
      setFormError((data) => ({ ...data, oldAccessCode: "Field is required" }));
    } else {
      setFormError((data) => ({ ...data, oldAccessCode: "" }));
    }
    if (formData.newAccessCode === "") {
      setFormError((data) => ({ ...data, newAccessCode: "Field is required" }));
    } else {
      //alert(formData.newAccessCode.length);
      if (formData.newAccessCode.length > 5) {
        setFormError((data) => ({ ...data, newAccessCode: "" }));
      } else {
        setFormError((data) => ({
          ...data,
          newAccessCode: "Min six digits required.",
        }));
      }
    }
    if (formData.confirmAccessCode !== "") {
      if (formData.confirmAccessCode !== formData.newAccessCode) {
        setFormError((data) => ({
          ...data,
          confirmAccessCode: "Password not matching",
        }));
      } else {
        setFormError((data) => ({ ...data, confirmAccessCode: "" }));
      }
    } else {
      //setFormError((data) => ({ ...data, confirmAccessCode: "" }));
      setFormError((data) => ({
        ...data,
        confirmAccessCode: "Field is required",
      }));
    }

    if (
      formData.oldAccessCode !== "" &&
      formData.newAccessCode !== "" &&
      formData.newAccessCode.length >= 6 &&
      formData.confirmAccessCode === formData.newAccessCode
    ) {
      //alert("send");
      ChengeCode();
    }
  };

  const ChengeCode = (data) => {
    setInitialData((item) => ({ ...item, loading: true }));

    ApiHelper(
      "auth-service/user/changeAccessCode",
      "POST",
      {
        ...formData,
        userId: userId,
      },
      accessToken,
      userUniqueId
    )
      .then((res) => {
        console.warn("check AccessCode true", res.data);
        if (res && res.data.isValid === true) {
          setInitialData((data) => ({
            ...data,
            loading: false,
            data: res.data.data,
            type: "FormSuccess",
            error: res.data.message,
          }));
          setFormData((item) => ({
            ...item,
            oldAccessCode: "",
            newAccessCode: "",
            confirmAccessCode: "",
          }));

          oldPassRef.current.value = "";
          newPassRef.current.value = "";
          confirmPassRef.current.value = "";
        } else {
          setInitialData((data) => ({
            ...data,
            loading: false,
            data: res.data.data,
            type: "FormError",
            error: res.data.message,
          }));
        }
      })
      .catch((err) => {
        console.warn("check AccessCode false", err);

        if (err.response) {
          setInitialData((item) => ({
            ...item,
            loading: false,
            error: "Something went wrong try again.",
            //error: true,
            type: "FormError",
          }));
        } else {
          setInitialData((item) => ({
            ...item,
            loading: false,
            error: "Something went wrong try again.",
            type: "FormError",
          }));
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
      setFormData((item) => ({
        ...item,
        oldAccessCode: "",
        newAccessCode: "",
        ChangeAccessCode: "",
      }));
    }
  };

  return (
    <div className="ChangeAccessCode">
      <div className="row mt-3">
        <div className="col-lg-3 col-md-6 mb-3">
          <InputBox
            label="Old Access Code"
            styled="2"
            type="text"
            name="oldAccessCode"
            error={formError.oldAccessCode}
            required="required"
            className="form-control"
            onChange={(e) => formHandler(e)}
            ref={oldPassRef}
            defaultValue={formData.oldAccessCode}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-3">
          <InputBox
            label="New Access Code"
            styled="2"
            type="text"
            name="newAccessCode"
            error={formError.newAccessCode}
            required="required"
            className="form-control"
            onChange={(e) => formHandler(e)}
            ref={newPassRef}
            defaultValue={formData.newAccessCode}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-3">
          <InputBox
            label="Confirm Access Code"
            styled="2"
            type="text"
            name="confirmAccessCode"
            error={formError.confirmAccessCode}
            required="required"
            className="form-control"
            onChange={(e) => formHandler(e)}
            ref={confirmPassRef}
            defaultValue={formData.confirmAccessCode}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-3">
          <Button
            className="btn btn-theme1-circle px-5"
            onClick={() => formSubmit()}
          >
            {loading === true ? (
              <span className="loader light sm d-inline"></span>
            ) : (
              <span>Change Code </span>
            )}
          </Button>
          {/* <Button
            className="btn btn-theme1-circle w-100"
            onClick={() => formSubmit()}
          >
            Change Code
          </Button> */}
        </div>
      </div>
      {error && (
        <AlertBox
          data={{ line1: error }}
          type={initialData.type}
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </div>
  );
};

export default ChangeAccessCode;
