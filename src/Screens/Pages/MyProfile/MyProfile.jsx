import React, { lazy, Suspense, useState } from "react";
import "./MyProfile.scss";

const AdminProfileDetails = lazy(() =>
  import("./Tabs/AdminProfileDetails/AdminProfileDetails")
);
const ChangeAccessCode = lazy(() =>
  import("./Tabs/ChangeAccessCode/ChangeAccessCode")
);

function Myprofile() {
  const [activeTab, setActiveTab] = useState(1);
  const tabHandler = (id) => {
    setActiveTab(id);
  };

  const tab = () => {
    switch (activeTab) {
      case 2:
        return <ChangeAccessCode />;
        break;
      default:
        return <AdminProfileDetails />;
    }
  };

  return (
    <div className="Page_Inner UserManagement p-20 ">
      <div className="User_Tab_Wrapper">
        <div className=" d-flex  tab_nav">
          <div
            className={`tab_nav_item ${activeTab === 1 && "active"}`}
            onClick={() => tabHandler(1)}
          >
            <h5>My Profiles</h5>
          </div>
          <div
            className={`tab_nav_item ${activeTab === 2 && "active"}`}
            onClick={() => tabHandler(2)}
          >
            <h5>Change Access Code</h5>
          </div>
        </div>
        <div className="tab_content py-3">
          <Suspense fallback={<div className="loader m-5-auto"></div>}>
            {tab()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Myprofile;
