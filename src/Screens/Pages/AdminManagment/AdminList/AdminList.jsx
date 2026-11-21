import { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../../Layouts/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import { FaSort, FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import ApiHelper from "../../../../Helpers/ApiHelpers";
import { useHistory } from "react-router-dom";

import AlertBox from "../../../Components/AlertBox/AlertBox";
import "./AdminList.scss";
import CalendlyBooking from "../../CalendlyBooking/CalendlyBooking";
import InfiniteScrollComp from "../../../Components/InfiniteScroll/InfiniteScroll";

const AdminList = () => {
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

  console.log(reverseData);

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
    history.push("/admins");
  };

  const closeModal = () => {
    setAlertBox({ show: false });
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => (
        <Link className="userLink" to={`editAdmin/${row.userId}`}>
          {row.firstName}
        </Link>
      ),
      //selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
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
      name: "DOB",
      selector: (row) => row.dateOfBirth,
      sortable: true,
    },
    {
      name: "AccessCode",
      selector: (row) => row.accessCode,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`editAdmin/${row.userId}`} className="pr-3 actBtns">
            <FiEdit />
          </Link>
          {"     "}
          <span
            className="pr-3 actBtns"
            onClick={() =>
              showModal({
                userId: row.userId,
                firstName: row.firstName,
                surName: row.lastName,
                type: "DeleteAdmin",
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
        "auth-service/admin/getAdmins",
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
      <Breadcrumb title="Admins"></Breadcrumb>
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
                  <Link to="/addAdmin">
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
export default AdminList;
