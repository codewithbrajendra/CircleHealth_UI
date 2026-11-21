import { useState } from "react";
import Button from "../../Components/Buttons/button";
import Card from "../../Components/Card/card";
import InputBox from "../../Components/InputBox/inputBox";
import { Link } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./Login.scss";
import logo from "../../../Assets/Images/logo-new.png";

import AlertBox from "../../Components/AlertBox/AlertBox";

import { logInUser } from "../../../Redux/Actions/userActions";
import { useSelector, useDispatch } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.authUser);

  let { error, loading, data } = Auth;
  console.warn("Logged ", Auth);
  const getUser = () => {
    dispatch(logInUser(form));
  };

  const [form, setFrom] = useState({
    email: "",
    accessCode: "",
  });
  const [userError, setUserError] = useState("");
  const [accCodeError, setAccCodeError] = useState("");
  let [passVisible, setPassVisible] = useState(false);
  const [AuthError, setAuthError] = useState("");

  const formHandler = (e) => {
    //console.log(e.target.name);
    if (e.target.name) {
      setFrom({ ...form, [e.target.name]: e.target.value });
    }
  };
  const formSubmit = () => {
    //const eValid = validEmail(form.email);
    // if (form.email === "") {
    //   setEmailError("Email Is Required");
    // }
    // if (eValid === false) {
    //   setEmailError("Enter Valid Email ID");
    // } else {
    //   setEmailError("");
    // }

    if (form.email === "") {
      setUserError("Field Is Required");
    } else {
      setUserError("");
    }

    if (form.accessCode === "") {
      setAccCodeError("Field Is Required");
    } else {
      setAccCodeError("");
    }

    if (form.email !== "" && form.accessCode !== "") {
      //console.log("Submit Form Data", form);

      // axios
      //   .post("http://18.134.37.34:8990/auth-service/auth/admin-login", form)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err.response);
      //   });

      //alert("ok");
      getUser();
    }
  };

  const PasswordVisiblityHender = () => {
    setPassVisible((passVisible = !passVisible));
  };

  const confirmModal = () => {};
  const closeModal = () => {};

  return (
    <section className="Page_Login  ">
      <div className="container">
        <div className="row h-100vh justify-content-center align-items-center">
          <Card className="col-auto loginCard auth_card_bg mw-300  p-4">
            <img src={logo} className="mb-2 logo-icon" />

            <h5 className="formTitle mb-4 text-center">
              Login to Your Account.
            </h5>

            <div className=" input__Wrapper mb-3">
              <InputBox
                styled="1"
                name="email"
                label="Username*"
                type="text"
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={userError}
              />
            </div>

            <div className="mb-2 input__Wrapper">
              {/* <InputBox
                styled="1"
                name="accessCode"
                label="Access Code*"
                type="password"
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={accCodeError}
              />
              <span className="InputIcon">
                <img src={Finger} width="18" />
              </span> */}

              <InputBox
                styled="1"
                name="accessCode"
                label="Access Code*"
                type={passVisible === true ? "text" : "password"}
                className="form-control"
                onChange={(e) => formHandler(e)}
                required="required"
                error={accCodeError}
              />

              <span
                className="InputIcon"
                onClick={() => PasswordVisiblityHender()}
              >
                {passVisible === true ? (
                  <BsEye color="#2a806f"></BsEye>
                ) : (
                  <BsEyeSlash color="#2a806f"></BsEyeSlash>
                )}
              </span>
            </div>
            <div className="forgotLink mb-3 mt-1">
              <Link to="/forget_password">
                <label className="text-right forget_link_text">
                  Forgotten Code
                </label>
              </Link>
            </div>

            <div className="mb-3 input__Wrapper">
              <Button
                className="btn btn-theme1-circle w-100"
                onClick={() => formSubmit()}
              >
                {/* <span>Login </span> */}
                {loading === true ? (
                  <span className="loader light sm d-inline"></span>
                ) : (
                  <span>Login </span>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {error && (
          <AlertBox
            data={{ line1: error }}
            type="FormError"
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )}
      </div>
    </section>
  );
};
export default Login;
