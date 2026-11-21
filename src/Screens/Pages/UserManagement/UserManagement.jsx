import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../Layouts/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import InputBox from "../../Components/InputBox/inputBox";
import { useSelector, useDispatch } from "react-redux";
import { FaSort, FaTrash, FaSearch, FaBimobject } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import ApiHelper from "../../../Helpers/ApiHelpers";
import { useHistory } from "react-router-dom";

import "./UserManagement.scss";
import AlertBox from "../../Components/AlertBox/AlertBox";
import InfiniteScrollComp from "../../Components/InfiniteScroll/InfiniteScroll";

const UserManagement = () => {
  let accessToken = localStorage.getItem("Token");
  let userUniqueId = localStorage.getItem("UserUniqueId");

  const emailRef = useRef(null);
  const surNameRef = useRef(null);
  const firstNameRef = useRef(null);

  let history = useHistory();

  let [userDelete, setUserDelete] = useState(0);

  const [initialData, setInitialData] = useState({
    loading: "",
    searchLoading: "",
    error: null,
    data: [],
    copyData: [],
    reverseData: [],
  });

  const { loading, error, copyData, reverseData, data, searchLoading } =
    initialData;

  let [alertBox, setAlertBox] = useState({ show: false });
  const [filter, setFilter] = useState({
    firstName: "",
    surName: "",
    email: "",
  });

  let User = useSelector((state) => state.pilotUsers);
  //console.log(User);
  let userList = User.data;

  const dispatch = useDispatch();

  const showModal = (data) => {
    setAlertBox({ show: true, ...data, type: "UserDelete" });
  };
  //confirm delete user
  const confirmModal = () => {
    //alert("ok");
    setUserDelete(userDelete + 1);
    setAlertBox({ show: false });
    history.push("/");
  };

  const closeModal = () => {
    setAlertBox({ show: false });
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => (
        <Link className="userLink" to={`user_info/${row.userId}`}>
          {row.firstName}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Surname",
      selector: (row) => row.surName,
      sortable: true,
    },
    {
      name: "Date of Birth",
      selector: (row) => row.dob,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Ethnicity",
      selector: (row) => row.ethnicity,
      sortable: true,
    },
    {
      name: "Access code",
      selector: (row) => row.accessCode,
      sortable: true,
    },
    {
      name: "Therapy Preference",
      selector: (row) => row.therapistPreference,
      sortable: true,
    },
    {
      name: "Wellness Check",
      selector: (row) => row.wellnessCheck,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`edit_pilet_user/${row.userId}`} className="pr-3 actBtns">
            <FiEdit />
          </Link>
          {"     "}
          <span
            className="pr-3 actBtns"
            onClick={() =>
              showModal({
                userId: row.userId,
                firstName: row.firstName,
                surName: row.surName,
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
    setFilter((item) => ({ ...item, [e.target.name]: e.target.value.trim() }));
    console.warn(filter);
    //console.warn(firstNameRef, surNameRef, emailRef);

    // if (e.target.value === "") {
    //   //alert("ok");
    //   console.warn(emailRef, surNameRef, emailRef);
    // }
    if (
      emailRef.current.value.trim() === "" &&
      surNameRef.current.value.trim() === "" &&
      firstNameRef.current.value.trim() === ""
    ) {
      //alert(firstNameRef.current.value);
      getData(); //reset data on change
    }
  };

  const filterData = () => {
    if (
      filter.firstName !== "" ||
      filter.surName !== "" ||
      filter.email !== ""
    ) {
      //alert("ok");
      setInitialData((initialData) => ({
        ...initialData,
        searchLoading: true,
        loading: true,
      }));

      ApiHelper(
        "patient-service/filterUser",
        "POST",
        { ...filter },
        accessToken,
        userUniqueId
      )
        .then((res) => {
          //alert("ok");
          //setInitialData(data);
          //console.warn("fetch filter data", data.data.data);
          if (res && res.data.data) {
            //const revData = [res.data.data];
            setInitialData((initialData) => ({
              ...initialData,
              searchLoading: false,
              loading: false,
              //data: revData,
              //copyData: res.data.data,
              reverseData: res.data.data,
            }));
          } else if (res && res.data.data == null) {
            setInitialData((initialData) => ({
              ...initialData,
              searchLoading: false,
              loading: false,
              //data: revData,
              //copyData: res.data.data,
              reverseData: [],
            }));
          } else {
            throw new Error("Error");
          }
        })
        .catch((err) => {
          console.warn("fetch filter data error", err);

          if (err?.response) {
            setInitialData((initialData) => ({
              ...initialData,
              searchLoading: false,
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
              searchLoading: false,
              error: "Something went wrong try again.",
            }));
            setAlertBox({ show: true, type: "NetError" });
          }
        });
    } else {
      setAlertBox({ show: true, type: "FormError" });
      //alert("fill at least one field");
      //getData();
    }

    //console.warn(filter);
  };

  const getData = () => {
    setInitialData({ ...initialData, loading: true });

    ApiHelper("patient-service/users", "GET", "", accessToken, userUniqueId)
      .then((res) => {
        //setInitialData(data);

        //console.warn("fetch data", data.data);
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
        //console.warn("fetch data", err);

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
            error: "Something went wrong try again.",
          }));
          setAlertBox({ show: true, type: "NetError" });
        }
      });
  };

  useEffect(() => {
    let fiData = false;

    const mm_data = Object.keys(filter).filter(
      (key) => filter[key] !== "" && (fiData = true)
    );
    console.log("fData", fiData);
    fiData ? filterData() : getData();
  }, [userDelete]);

  //console.log("count", loadCount);

  //console.log("data: ", initialData);

  return (
    <>
      <Breadcrumb title="User Management"></Breadcrumb>
      <div className="Page_Inner UserManagement p-20 pt-0">
        <section className="">
          <div className="row">
            <div className="col-sm-12 ">
              <label
                style={{ fontSize: 13, fontWeight: 600, paddingBottom: 10 }}
              >
                Filter
              </label>
            </div>

            <div className="col-sm-12 text-center userTableWrapper">
              <div className="tableFilter d-flex flex-xs-direction">
                <div className="flex-fill">
                  <div className="mb-3 input__Wrapper mr-2">
                    <InputBox
                      styled="2"
                      name="firstName"
                      label="First Name"
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
                </div>
                <div className="col-auto ">
                  <button
                    className="btn btn-theme1-circle px-3 mb-3 w-sm-100 mr-2"
                    disabled={searchLoading ? "disabled" : ""}
                    onClick={() => filterData()}
                  >
                    {searchLoading ? (
                      <span className="loader light sm d-inline mt-1"></span>
                    ) : (
                      <FaSearch />
                    )}
                  </button>
                  <Link to="/add_pilet_user">
                    <button className="btn btn-theme1-circle mb-3 px-3 w-sm-100">
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
        {alertBox.show &&
          (alertBox.type === "FormError" ? (
            <AlertBox
              data={{ line1: "Please fill at least one field." }}
              type={alertBox.type}
              onClose={closeModal}
              onConfirm={confirmModal}
            />
          ) : (
            <AlertBox
              data={alertBox}
              type={alertBox.type}
              onClose={closeModal}
              onConfirm={confirmModal}
            />
          ))}

        {/* {alertBox.show && alertBox.type === "FormError" && (
          <AlertBox
            data={{ line1: "Please fill at least one field." }}
            type={alertBox.type}
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )}

        {alertBox.show && alertBox.type === "TokenExpire" && (
          <AlertBox
            data={{ line1: "Please fill at least one field." }}
            type={alertBox.type}
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )}

        {alertBox.show && alertBox.type === "NetError" && (
          <AlertBox
            data={{ line1: "Please fill at least one field." }}
            type={alertBox.type}
            onClose={closeModal}
            onConfirm={confirmModal}
          />
        )} */}
      </div>
    </>
  );
};
export default UserManagement;
