import React, { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
import InputBox from "../../Components/InputBox/inputBox";
import Button from "../../Components/Buttons/button";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  emailValidation,
  accessCodeValidation,
  dateFormatter,
  todayDate,
} from "../../../Helpers/Validations";
import { FaUser } from "react-icons/fa";
import "./AddPiletUser.scss";
import ApiHelper from "../../../Helpers/ApiHelpers";
import GetSelectOptions from "../../Components/GetSelectOptins/GetSelectOptions";
import AlertBox from "../../Components/AlertBox/AlertBox";

export default function AddPiletUser() {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  const firstNameRef = useRef(null);
  const surNameRef = useRef(null);
  const dobRef = useRef(null);
  const emailRef = useRef(null);
  const accessCodeRef = useRef(null);

  // console.log("emailRef", emailRef.current);

  //console.log("load", accessToken);
  //console.log("load", userUniqueId);

  let [alertBox, setAlertBox] = useState({ show: false });

  const nowDate = todayDate();
  //console.log(nowDate);
  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    type: "",
    data: [],
  });

  const { loading, error, type } = initialData;
  let userId = false;
  const param = useParams();
  if (param && param.id) {
    userId = param.id;
    //console.log("userId--", userId);
  } else {
    userId = false;
  }

  let history = useHistory();

  const [formData, setFormData] = useState({
    firstName: "",
    surName: "",
    email: "",
    gender: "",
    dob: "",
    ethnicity: "",
    therapistPreference: "",
    accessCode: "",
  });

  const [formError, setFormError] = useState({
    firstName: "",
    surName: "",
    email: "",
    gender: "",
    dob: "",
    ethnicity: "",
    therapistPreference: "",
    accessCode: "",
    emailLoader: false,
    codeLoader: false,
    buttonValid: true,
  });

  //console.warn(formData);

  //form handler
  const formHandler = (e) => {
    console.warn("Add Pilet Form", e.target.name);
    if (e.target.name === "dob") {
      const date = dateFormatter(e.target.value);
      setFormData((data) => ({ ...data, [e.target.name]: date }));
    } else {
      setFormData((data) => ({
        ...data,
        //[e.target.name]: e.target.value.replace(/ /, ""),
        [e.target.name]: e.target.value.trim(),
      }));
    }

    // button active
    // if (formData.email !== "" && formData.accessCode !== "") {
    //   setFormError((item) => ({ ...item, buttonValid: true }));
    // } else {
    //   setFormError((item) => ({ ...item, buttonValid: false }));
    // }
  };

  //form Submit handler
  const FormSubmit = () => {
    //alert(formData.email);

    const emailFormate = emailValidation(formData.email);
    const codeFormate = accessCodeValidation(formData.accessCode);
    if (formData.firstName === "") {
      setFormError((data) => ({ ...data, firstName: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, firstName: "" }));
    }
    if (formData.surName === "") {
      setFormError((data) => ({ ...data, surName: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, surName: "" }));
    }
    if (formData.dob === "") {
      setFormError((data) => ({ ...data, dob: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, dob: "" }));
    }
    if (formData.gender === "") {
      setFormError((data) => ({ ...data, gender: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, gender: "" }));
    }
    if (formData.ethnicity === "") {
      setFormError((data) => ({ ...data, ethnicity: "Required field" }));
    } else {
      setFormError((data) => ({ ...data, ethnicity: "" }));
    }
    if (formData.therapistPreference === "") {
      setFormError((data) => ({
        ...data,
        therapistPreference: "Required field",
      }));
    } else {
      setFormError((data) => ({ ...data, therapistPreference: "" }));
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
      formData.surName !== "" &&
      formData.gender !== "" &&
      formData.dob !== "" &&
      formData.ethnicity !== "" &&
      formData.therapistPreference !== "" &&
      codeFormate === true &&
      emailFormate === true
    ) {
      if (param && param.id) {
        //console.log("emailRef", emailRef.current.value);

        // if (firstNameRef.current.value === "") {
        //   alert("sur ok");
        //   setFormData((data) => ({ ...data, firstName: "" }));
        //   setFormError((data) => ({ ...data, firstName: "Required field" }));
        // } else {
        //   alert("sur false");
        // }

        // if (surNameRef.current.value === "") {
        //   setFormData((item) => ({ ...item, surName: "" }));
        //   setFormError((item) => ({ ...item, surName: "Required field" }));
        //   alert("sur ok");
        // } else {
        //   alert("sur false");
        // }

        if (
          emailRef.current.value !== "" &&
          accessCodeRef.current.value !== "" &&
          firstNameRef.current.value !== "" &&
          surNameRef.current.value !== ""
        ) {
          //checking update form data
          UpdatePilotUser();
        } else {
          //console.warn(emailRef.current.value);
        }
      } else {
        AddPilotUser();
      }
    } else {
    }
  };

  const CheckCodeExist = (data) => {
    const codeFormate = accessCodeValidation(formData.accessCode);

    //alert(data.target.value);
    if (codeFormate === true) {
      setFormError((item) => ({ ...item, codeLoader: true }));

      ApiHelper(
        "patient-service/checkAccessCode",
        "POST",
        {
          accessCode: data.target.value,
          userId: userId ? userId : null,
        },
        accessToken,
        userUniqueId
      )
        .then((data) => {
          console.warn("check AccessCode true", data);
          if (data && data.data.isValid === true) {
            setFormError((data) => ({
              ...data,
              accessCode: "",
              codeLoader: false,
            }));
          } else {
            setFormError((data) => ({
              ...data,
              accessCode: "Access Code already exist, try other code.",
              codeLoader: false,
            }));
            setFormData((data) => ({
              ...data,
              accessCode: "",
            }));
          }
        })
        .catch((err) => {
          console.warn("check AccessCode false", err);
          // setFormError((item) => ({
          //   ...item,
          //   codeLoader: false,
          //   accessCode: "Something went wrong try again.",
          // }));

          if (err?.response) {
            setFormError((item) => ({
              ...item,
              codeLoader: false,
              accessCode: "Something went wrong try again.",
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
        accessCode: "Include number, alphabets and at least 6 digits.",
      }));
      setFormData((data) => ({
        ...data,
        accessCode: "",
      }));
    }
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
        "patient-service/checkEmailAvailabilty",
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

  //useEffect(() => {}, [initialData]);

  //get initial Data

  useEffect(() => {
    const getData = () => {
      //console.log("effect", accessToken);
      //console.log("effect", userUniqueId);

      setInitialData({ ...initialData, loading: true });

      ApiHelper(
        "patient-service/addUserForm",
        "GET",
        "",
        accessToken,
        userUniqueId
      )
        .then((res) => {
          console.warn("fetch data", res.data.data);
          if (res && res.data.data) {
            setInitialData({
              ...initialData,
              loading: false,
              data: res.data.data,
            });
          } else {
            throw new Error("Error");
          }
        })
        .catch((err) => {
          //console.warn("fetch data", err.response.data);

          if (err?.response) {
            setInitialData({
              ...initialData,
              loading: false,
              error: err.response.data.message,
              type: "FormError",
            });
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

      //get initialData for update user
      if (param && param.id) {
        setInitialData({ ...initialData, loading: true });

        ApiHelper(
          "patient-service/getUser/" + param.id,
          "GET",
          "",
          accessToken,
          userUniqueId
        )
          .then((res) => {
            console.warn("get user res", res.data.data);
            if (res && res.data.data) {
              //setdate format
              let date = res.data.data.dob;
              let newdate = date.split("/").reverse().join("-");

              setInitialData((item) => ({
                ...item,
                loading: false,
              }));
              setFormData({
                ...formData,
                accessCode: res.data.data.accessCode,
                firstName: res.data.data.firstName,
                surName: res.data.data.surName,
                dob: newdate,
                ethnicity: res.data.data.ethnicity,
                gender: res.data.data.gender,
                therapistPreference: res.data.data.therapistId,
                therapistId: res.data.data.therapistId,
                email: res.data.data.email,
                userId: res.data.data.userId,
              });
            } else {
              throw new Error("Error");
            }
          })
          .catch((err) => {
            //console.warn("get user err", err.response.data);

            if (err?.response) {
              setInitialData((item) => ({
                ...item,
                loading: false,
                error: "Something went wrong try again.",
                type: "FormError",
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

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...initialData,
      error: null,
    });

    if (type === "FormSuccess") {
      setFormData({
        ...formData,
        firstName: "",
        surName: "",
        email: "",
        gender: "",
        dob: "",
        ethnicity: "",
        therapistPreference: "",
        accessCode: "",
      });
      history.push("/");
    }
  };

  //add user
  const AddPilotUser = () => {
    setInitialData({ ...initialData, loading: true });

    let newFormData = {
      ...formData,
      therapistId: formData.therapistPreference,
    };

    ApiHelper(
      "auth-service/user/createUser",
      "POST",
      newFormData,
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

  //update user

  //console.log("userId", param.id);

  const UpdatePilotUser = () => {
    //alert(param.id);

    setInitialData({ ...initialData, loading: true });

    //set date format dd/mm/yyyy
    const date = dateFormatter(formData.dob);
    //setFormData((item) => ({ ...item, dob: date }));
    //console.log("Update form Data", formData);

    const newFormData2 = {
      ...formData,
      dob: date,
      therapistId: formData.therapistPreference,
    };

    console.log("Form Data", newFormData2);

    ApiHelper(
      "auth-service/user/editUser",
      "POST",
      newFormData2,
      accessToken,
      userUniqueId
    )
      .then((res) => {
        console.warn("Update User true", res.data.message);
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
        console.warn("Update User false", err);
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
  };

  //useEffect(() => {}, [formError]);

  return (
    <>
      {param.id ? (
        <Breadcrumb title="Edit User"></Breadcrumb>
      ) : (
        <Breadcrumb title="Add User"></Breadcrumb>
      )}

      <div className="Page_Inner AddPiletUser p-20 pt-0">
        <section className="">
          <div className="row">
            <div className="col-sm-auto">
              <div className="profileBox mb-3">
                <div className="text-center overflowHidden">
                  <input
                    type="file"
                    className="hiddenFileInput"
                    accept="image/png, image/gif, image/jpeg"
                  />
                  <FaUser className="profileBox_user_icon col" />
                  <p>Click To Upload</p>
                </div>
              </div>
            </div>
            <div className="col-sm-9 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    error={formError.firstName}
                    styled="2"
                    label="First Name"
                    name="firstName"
                    required="required"
                    onChange={(e) => formHandler(e)}
                    defaultValue={formData.firstName}
                    ref={firstNameRef}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="text"
                    error={formError.surName}
                    styled="2"
                    label="Surname"
                    name="surName"
                    defaultValue={formData.surName}
                    required="required"
                    onChange={(e) => formHandler(e)}
                    ref={surNameRef}
                  />
                </div>
                <div className="col-sm-6 mb-3">
                  <InputBox
                    className="form-control"
                    type="date"
                    error={formError.dob}
                    styled="2"
                    label="Date Of Birth"
                    name="dob"
                    required="required"
                    max={nowDate}
                    defaultValue={formData.dob}
                    onChange={(e) => formHandler(e)}
                    ref={dobRef}
                  />
                </div>
                <div className="col-sm-6 mb-3" style={{ position: "relative" }}>
                  <InputBox
                    className="form-control"
                    type="text"
                    error={formError.email}
                    styled="2"
                    label="Email"
                    name="email"
                    required="required"
                    defaultValue={formData.email}
                    onChange={(e) => formHandler(e)}
                    onBlur={(e) => CheckEmailExist(e)}
                    ref={emailRef}
                  />
                  {formError.emailLoader === true ? (
                    <span className="loader inputValidityloader dark sm  d-inline"></span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-sm-6 mb-3" style={{ position: "relative" }}>
                  <InputBox
                    className="form-control"
                    type="text"
                    error={formError.accessCode}
                    styled="2"
                    label="Access Code"
                    name="accessCode"
                    defaultValue={formData.accessCode}
                    required="required"
                    onChange={(e) => formHandler(e)}
                    onBlur={(e) => CheckCodeExist(e)}
                    ref={accessCodeRef}
                  />
                  {formError.codeLoader === true ? (
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

                    {initialData.data &&
                      initialData.data.gender &&
                      initialData.data.gender.map((item, index) => (
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
                <div className="col-sm-6 mb-3 input__Wrapper">
                  <select
                    className={` form-control selectStyle ${
                      formError.ethnicity && "error"
                    } ${formData.ethnicity && "valid"}`}
                    name="ethnicity"
                    onChange={(e) => formHandler(e)}
                  >
                    <option value="">Select Ethnicity</option>

                    {initialData.data &&
                      initialData.data.eithnicity &&
                      initialData.data.eithnicity.map((item, index) => (
                        <GetSelectOptions
                          key={index}
                          value={item.value}
                          name={item.value}
                          selected={
                            item.value === formData.ethnicity ? true : false
                          }
                        />
                      ))}
                  </select>
                  {formError.ethnicity && (
                    <label className="error has-error">Required field</label>
                  )}
                </div>
                <div className="col-sm-6 mb-3 input__Wrapper">
                  <select
                    className={` form-control selectStyle ${
                      formError.therapistPreference && "error"
                    } ${formData.gender && "valid"}`}
                    name="therapistPreference"
                    onChange={(e) => formHandler(e)}
                  >
                    <option value="">Therapist Preference</option>
                    {initialData.data &&
                      initialData.data.therapistPreference &&
                      initialData.data.therapistPreference.map(
                        (item, index) => (
                          <GetSelectOptions
                            key={index}
                            value={item.value}
                            name={item.name}
                            selected={
                              item.value === formData.therapistId ? true : false
                            }
                          />
                        )
                      )}
                  </select>
                  {formError.therapistPreference && (
                    <label className="error has-error">Required field</label>
                  )}
                </div>
              </div>
            </div>

            <div className="col-sm-12 mb-3">
              <Link to="/">
                <Button className="btn btn-theme2-circle mr-15 px-4">
                  Cancel
                </Button>
              </Link>

              {param.id ? (
                <Button
                  className="btn btn-theme1-circle px-5"
                  onClick={() => FormSubmit()}
                  disabled={formError.buttonValid === false ? "disabled" : ""}
                >
                  {loading === true ? (
                    <span className="loader light sm d-inline"></span>
                  ) : (
                    <span>Update User </span>
                  )}
                </Button>
              ) : (
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
                    <span>Add User </span>
                  )}
                </Button>
              )}
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
}
