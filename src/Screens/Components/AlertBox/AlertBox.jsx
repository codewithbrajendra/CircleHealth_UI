import React, { useState } from "react";
import Button from "../Buttons/button";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import warnning_icon from "../../../Assets/Images/warnning_icon.png";
import check_icon from "../../../Assets/Images/check_icon.png";

import { logOutUser } from "../../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

import ApiHelper from "../../../Helpers/ApiHelpers";

import "./AlertBox.scss";

const AlertBox = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const LogOut = () => {
    history.push("/");
    dispatch(logOutUser());
  };

  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    data: "",
  });

  const { loading, error } = initialData;

  let { data, type, onConfirm, onClose } = props;
  //console.log(data);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    onClose();
  };
  //const handleShow = () => setShow(true);

  const deleteUser = () => {
    setInitialData({ ...initialData, loading: true });
    ApiHelper(
      "auth-service/user/deleteUser/" + data.userId,
      "GET",
      "",
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //console.warn("Delete true", res.data);
        if (res && res.data.code === 200) {
          setInitialData((data) => ({ ...data, loading: "" }));
          onConfirm();
        } else {
          // setFormError((data) => ({
          //   ...data,
          //   accessCode: "Access Code already exist, try other code.",
          // }));
        }
      })
      .catch((err) => {
        console.warn("Delete err", err);
        setInitialData((data) => ({ ...data, loading: "" }));
        onConfirm();
        // if (err.response) {
        // } else {
        // }
      });
  };

  const deleteAdmin = () => {
    setInitialData({ ...initialData, loading: true });
    ApiHelper(
      "auth-service/admin/deleteAdmin/" + data.userId,
      "GET",
      "",
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //console.warn("Delete true", res.data);
        if (res && res.data.code === 200) {
          setInitialData((data) => ({ ...data, loading: "" }));
          onConfirm();
        } else {
          // setFormError((data) => ({
          //   ...data,
          //   accessCode: "Access Code already exist, try other code.",
          // }));
        }
      })
      .catch((err) => {
        console.warn("Delete err", err);
        setInitialData((data) => ({ ...data, loading: "" }));
        onConfirm();
        // if (err.response) {
        // } else {
        // }
      });
  };

  const deleteTherapistUser = () => {
    setInitialData({ ...initialData, loading: true });
    ApiHelper(
      "doctor-service/doctor/deleteTherapist/" + data.userId,
      "GET",
      "",
      accessToken,
      userUniqueId
    )
      .then((res) => {
        //console.warn("Delete true", res.data);
        if (res && res.data.code === 200) {
          setInitialData((data) => ({ ...data, loading: "" }));
          onConfirm();
        } else {
          // setFormError((data) => ({
          //   ...data,
          //   accessCode: "Access Code already exist, try other code.",
          // }));
        }
      })
      .catch((err) => {
        console.warn("Delete err", err);
        setInitialData((data) => ({ ...data, loading: "" }));
        onConfirm();
        // if (err.response) {
        // } else {
        // }
      });
  };

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal
        dialogClassName="AlertBox"
        size="sm"
        show={show}
        onHide={handleClose}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <div className="alertInner text-center py-4">
            <IoMdAddCircle className="closeAlter" onClick={handleClose} />

            {
              //delete User Modal
              type === "TokenExpire" && (
                <>
                  <img className="mb-3 ModalImgIcon" src={warnning_icon} />
                  <p className="mb-3">
                    {" "}
                    Your session has expired, please login.
                  </p>

                  <Button
                    className="btn btn-theme1-circle px-4 mr-15"
                    onClick={() => LogOut()}
                  >
                    Login
                  </Button>
                </>
              )
            }

            {
              //delete User Modal
              type === "NetError" && (
                <>
                  <img className="mb-3 ModalImgIcon" src={warnning_icon} />
                  <p className="mb-3">
                    {" "}
                    Something went wrong please try again.
                  </p>

                  {/* <Button className="btn btn-theme1-circle px-4 mr-15">
                    ok
                  </Button> */}
                </>
              )
            }

            {
              //delete User Modal
              type === "UserDelete" && (
                <>
                  <FaTrash className="mb-3 MsgIcon"></FaTrash>
                  <p className="mb-3"> Are you sure want to delete user?</p>
                  <h5 className="mb-3">
                    <b>{data.firstName + " " + data.surName}</b>
                  </h5>

                  <Button
                    className="btn btn-theme2-circle px-4 mr-15"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-theme1-circle px-4 mw-100"
                    onClick={() => deleteUser()}
                  >
                    {loading === true ? (
                      <span className="loader light sm d-inline"></span>
                    ) : (
                      <span>Delete </span>
                    )}
                  </Button>
                </>
              )
            }

            {
              //FromError
              type === "FormError" && (
                <>
                  <img className="mb-3 ModalImgIcon" src={warnning_icon} />
                  <p className="mb-3">
                    {data.line1} {data.line2 && <br />} {data.line2}
                  </p>
                </>
              )
            }
            {
              //FromSuccess
              type === "FormSuccess" && (
                <>
                  <img className="mb-3 ModalImgIcon" src={check_icon} />
                  <p className="mb-3">
                    {data.line1} {data.line2 && <br />} {data.line2}
                  </p>
                </>
              )
            }

            {/* {
              //delete
              type === "" && (
                <>
                  <FaTrash className="mb-3 MsgIcon"></FaTrash>
                  <p className="mb-3">
                    {" "}
                    Are you sure want to delete Therapist?
                  </p>
                  <h5 className="mb-3">
                    <b>{data.firstName + " " + data.surName}</b>
                  </h5>

                  <Button
                    className="btn btn-theme2-circle px-4 mr-15"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-theme1-circle px-4 mw-100"
                    onClick={() => deleteTherapistUser()}
                  >
                    {loading === true ? (
                      <span className="loader light sm d-inline"></span>
                    ) : (
                      <span>Delete </span>
                    )}
                  </Button>
                </>
              )
            } */}

            {
              //delete Admin Modal
              type === "DeleteAdmin" && (
                <>
                  <FaTrash className="mb-3 MsgIcon"></FaTrash>
                  <p className="mb-3"> Are you sure want to delete Admin?</p>
                  <h5 className="mb-3">
                    <b>{data.firstName + " " + data.surName}</b>
                  </h5>

                  <Button
                    className="btn btn-theme2-circle px-4 mr-15"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn btn-theme1-circle px-4 mw-100"
                    onClick={() => deleteAdmin()}
                  >
                    {loading === true ? (
                      <span className="loader light sm d-inline"></span>
                    ) : (
                      <span>Delete </span>
                    )}
                  </Button>
                </>
              )
            }
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default AlertBox;
