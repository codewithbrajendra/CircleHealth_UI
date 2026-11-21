import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import InputBox from "../../Components/InputBox/inputBox";
import { useSelector, useDispatch } from "react-redux";
import { FaSort, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import ApiHelper from "../../../Helpers/ApiHelpers";
import { useHistory } from "react-router-dom";

import AlertBox from "../../Components/AlertBox/AlertBox";
import "./Therapists.scss";
import CalendlyBooking from "../CalendlyBooking/CalendlyBooking";

const Therapist = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  const emailRef = useRef(null);
  const surNameRef = useRef(null);
  const firstNameRef = useRef(null);

  let history = useHistory();

  let [userDelete, setUserDelete] = useState(0);

  const [initialData, setInitialData] = useState({
    loading: "",
    error: null,
    data: [],
    copyData: [],
    reverseData: [],
  });

  const { loading, error, copyData, reverseData, data } = initialData;

  let [alertBox, setAlertBox] = useState({ show: false });
  const [filter, setFilter] = useState({ name: "", surname: "", email: "" });

  let User = useSelector((state) => state.pilotUsers);
  //console.log(User);
  let userList = User.data;

  const dispatch = useDispatch();

  const showModal = (data) => {
    setAlertBox((item) => ({ ...item, show: true, ...data }));
  };
  //confirm delete user
  const confirmModal = () => {
    //alert("ok");
    setUserDelete(userDelete + 1);
    setAlertBox({ show: false });
    history.push("/therapists");
  };

  const closeModal = () => {
    setAlertBox({ show: false });
  };

  const columns = [
    {
      name: "First Name",
      // selector: (row) => (
      //   <Link className="userLink" to={`therapist_info/${row.therapistId}`}>
      //     {row.therapistFirstName}
      //   </Link>
      // ),
      selector: (row) => row.therapistFirstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.therapistLastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Scheduling Url",
      selector: (row) => row.schedulingUrl,
      sortable: true,
    },
    {
      name: "Bearer Token",
      cell: (row) =>
        row.bearerToken ? (
          <span className="badge bg-success">Added</span>
        ) : (
          <span className="badge bg-danger">Not Added</span>
        ),
    },
    {
      name: "Api Key",
      cell: (row) =>
        row.apiKey ? (
          <span className="badge bg-success">Added</span>
        ) : (
          <span className="badge bg-danger">Not Added</span>
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`edit_therapist/${row.therapistId}`}
            className="pr-3 actBtns"
          >
            <FiEdit />
          </Link>
          {"     "}
          <span
            className="pr-3 actBtns"
            onClick={() =>
              showModal({
                userId: row.therapistId,
                firstName: row.therapistFirstName,
                surName: row.therapistLastName,
                type: "TherapistDelete",
              })
            }
          >
            <FaTrash />
          </span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  //console.log(dispatch);

  const filterHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    //console.warn(filter);
  };

  useEffect(() => {
    dispatch({ type: "FILTER_USER", data: filter });
  }, [filter]);

  useEffect(() => {
    const getData = () => {
      setInitialData({ ...initialData, loading: true });

      ApiHelper(
        "doctor-service/doctor/getTherapists",
        "GET",
        "",
        accessToken,
        userUniqueId
      )
        .then((res) => {
          //setInitialData(data);
          //console.warn("fetch data", res.data);
          if (res && res.data.data) {
            const revData = [res.data.data];

            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
              data: revData,
              copyData: res.data.data,
              reverseData: [...res.data.data].reverse(),
            }));
          } else {
            throw new Error("Error");
          }
        })
        .catch((err) => {
          //console.warn("fetch data", err.response);

          if (err?.response) {
            setInitialData((initialData) => ({
              ...initialData,
              loading: false,
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
    getData();
  }, [userDelete]);

  return (
    <>
      <Breadcrumb title="Therapists"></Breadcrumb>
      <div className="Page_Inner TherapistManagement p-20 pt-0">
        <section className="">
          <div className="row">
            {/* <div className="col-sm-12 ">
              <label
                style={{ fontSize: 13, fontWeight: 600, paddingBottom: 10 }}
              >
                Filter
              </label>
            </div> */}

            <div className="col-sm-12 text-center userTableWrapper">
              <div className="tableFilter d-flex flex-xs-direction justify-content-between">
                {/* <div className="flex-fill">
                  <div className="mb-3 input__Wrapper mr-2">
                    <InputBox
                      styled="2"
                      name="firstName"
                      label="Name"
                      type="text"
                      className="form-control"
                      onChange={(e) => filterHandler(e)}
                      required="required"
                      error=""
                      ref={firstNameRef}
                    />
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="mb-3 input__Wrapper  mr-2">
                    <InputBox
                      styled="2"
                      name="surName"
                      label="Surname"
                      type="text"
                      className="form-control"
                      onChange={(e) => filterHandler(e)}
                      required="required"
                      error=""
                      ref={surNameRef}
                    />
                  </div>
                </div>
                <div className="flex-fill">
                  <div className="mb-3 input__Wrapper  mr-2">
                    <InputBox
                      styled="2"
                      name="email"
                      label="Email"
                      type="text"
                      className="form-control"
                      onChange={(e) => filterHandler(e)}
                      required="required"
                      error=""
                      ref={emailRef}
                    />
                  </div>
                </div> */}
                <div className=""></div>
                <div className="col-auto mb-3">
                  <Link to="/add_therapist">
                    <button className="btn btn-theme1-circle px-3 w-sm-100">
                      Add New
                    </button>
                  </Link>
                </div>
              </div>

              <div className="tableWrapperBox" style={{ position: "relative" }}>
                <DataTable
                  className="userTable"
                  columns={columns}
                  data={reverseData}
                  sortIcon={<FaSort />}
                  direction="auto"
                  fixedHeaderScrollHeight="300px"
                  pagination
                  responsive
                  subHeaderAlign="right"
                  subHeaderWrap
                />
                {loading && (
                  <div className="loaderWrapper">
                    <span className="loader d-inline"></span>
                  </div>
                )}
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
export default Therapist;
