import { useState, useEffect } from "react";
import Button from "../../Components/Buttons/button";
import Card from "../../Components/Card/card";
import InputBox from "../../Components/InputBox/inputBox";
import { emailValidation } from "../../../Helpers/Validations";
import { Link } from "react-router-dom";
import Email from "../../../Assets/Images/mail_icon.png";
import "./Forget.scss";

import logo from "../../../Assets/Images/logo-new.png";

import { useSelector, useDispatch } from "react-redux";
import ApiHelper from "../../../Helpers/ApiHelpers";
import AlertBox from "../../Components/AlertBox/AlertBox";

const ForgetPassword = (props) => {
  const [initialData, setInitialData] = useState({
    loading: null,
    error: null,
    data: "",
  });

  const { error, loading, data: type } = initialData;

  const dispatch = useDispatch();

  const [formData, setFrom] = useState({
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [AuthError, setAuthError] = useState("");

  const formHandler = (e) => {
    //console.log(e.target.name);
    if (e.target.name) {
      setFrom({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const formSubmit = () => {
    const eValid = emailValidation(formData.email);

    if (formData.email !== "") {
      if (eValid === false) {
        setEmailError("Invalid Email ID");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("Email Is Required");
    }

    if (eValid === true) {
      //console.log(formData);

      setInitialData({ ...initialData, loading: true });
      //var bodyFormData = new FormData();
      //bodyFormData.append("email", formData.email);
      //console.log(formData);
      ApiHelper("auth-service/user/adminForgottenAccessCode", "POST", formData)
        .then((res) => {
          //console.log("suc ", res);
          if (res.data.code === 200) {
            setInitialData({
              ...formData,
              error: res.data.message,
              loading: false,
              data: res.data.isValid === true ? "FormSuccess" : "FormError",
            });
          } else {
            throw new Error("Error");
          }
        })
        .catch((err) => {
          //console.log("err ", err.response);
          if (err.response) {
            setInitialData({
              ...formData,
              error: err.response.data.message,
              data: "FormError",
              loading: false,
            });
          } else {
            setInitialData({
              ...formData,
              error: "Something went wrong try again.",
              data: "FormError",
              loading: false,
            });
          }
        });
    }
  };

  const confirmModal = () => {};
  const closeModal = () => {
    setInitialData({
      ...formData,
      error: null,
    });
  };

  return (
    <section className="Page_Forget  ">
      <div className="container">
        <div className="row h-100vh justify-content-center align-items-center">
          <Card className="col-auto ForgetCard auth_card_bg mw-300  p-4">
            <img src={logo} className="mb-2 logo-icon" />
            <h5 className="formTitle mb-4 text-center">
              Request a Unique Code
            </h5>

            <div className=" input__Wrapper mb-3">
              <InputBox
                styled="1"
                name="email"
                label="Email*"
                type="text"
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={emailError}
                placeholder="Enter Email Id"
              />
              <span className="InputIcon">
                <img src={Email} width="18" />
              </span>
            </div>

            <div className="mb-3 input__Wrapper">
              <Button
                className="btn btn-theme1-circle w-100"
                //text="Reset Code"
                onClick={() => formSubmit()}
              >
                {loading === true ? (
                  <span className="loader light sm d-inline"></span>
                ) : (
                  <span>Request a Unique Code </span>
                )}
              </Button>
            </div>
            <div className="mb-3 input__Wrapper">
              <Link to="/">
                <label className="login_link">Login</label>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {error && (
        <AlertBox
          data={{ line1: error }}
          type={type}
          onClose={closeModal}
          onConfirm={confirmModal}
        />
      )}
    </section>
  );
};
export default ForgetPassword;
