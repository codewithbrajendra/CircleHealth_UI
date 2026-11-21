import { useState, useEffect } from "react";
import Button from "../../Components/Buttons/button";
import Card from "../../Components/Card/card";
import InputBox from "../../Components/InputBox/inputBox";
import { emailValidation } from "../../../Helpers/Validations";
import { Link } from "react-router-dom";
import "./Reset.scss";

import logo from "../../../Assets/Images/logo-new.png";

import { useSelector, useDispatch } from "react-redux";

const ResetPassword = (props) => {
  const dispatch = useDispatch();

  const [form, setFrom] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [AuthError, setAuthError] = useState("");

  const formHandler = (e) => {
    //console.log(e.target.name);
    if (e.target.name) {
      setFrom({ ...form, [e.target.name]: e.target.value });
    }
  };
  const formSubmit = () => {
    const eValid = emailValidation(form.email);

    if (form.email === "") {
      setEmailError("Email Is Required");
    }
    if (eValid === false) {
      setEmailError("Enter Valid Email ID");
    } else {
      setEmailError("");
    }
    if (form.password === "") {
      setPassError("Password Is Required");
    } else {
      setPassError("");
    }

    if (eValid === true && form.password !== "") {
      //console.log("Form Data", form);
      dispatch({ type: "LOG_IN", data: form });
    }
  };

  return (
    <section className="Page_Reset  bg_image1">
      <div className="container">
        <div className="row h-100vh justify-content-center align-items-center">
          <Card className="col-auto ResetCard auth_card_bg mw-300  p-4">
            <img src={logo} className="mb-2 logo-icon" />
            <h5 className="formTitle mb-4 text-center">Reset Password</h5>

            <div className=" input__Wrapper mb-3">
              <InputBox
                styled="1"
                name="new_password"
                label="New Password*"
                type="text"
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={emailError}
                placeholder="Enter New Password"
              />
            </div>
            <div className=" input__Wrapper mb-3">
              <InputBox
                styled="1"
                name="c_password"
                label="Confirm Password*"
                type="text"
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={emailError}
                placeholder="Confirm Password"
              />
            </div>

            <div className="mb-3 input__Wrapper">
              <Button
                className="btn btn-theme1-circle w-100"
                text="Reset Password"
                onClick={() => formSubmit()}
              />
            </div>
            <div className="mb-3 input__Wrapper">
              <Link to="/">
                <label className="login_link">Login</label>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default ResetPassword;
