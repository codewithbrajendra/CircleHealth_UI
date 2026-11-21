import React, { useState, useEffect, lazy, Suspense } from "react";
import "./UserTabs.scss";

const Profile = lazy(() => import("./Tabs/ProfileDetails/ProfileDetails"));
const Question = lazy(() => import("./Tabs/QuestionDetails/QuestionDetails"));
const Analytics = lazy(() =>
  import("./Tabs/AnalyticsDetails/AnalyticsDetails")
);

function UserTabs() {
  const [activeTab, setActiveTab] = useState(1);
  const tabHandler = (id) => {
    setActiveTab(id);
  };

  const tab = () => {
    switch (activeTab) {
      case 3:
        return <Analytics />;
        break;
      case 2:
        return <Question />;
        break;
      default:
        return <Profile />;
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
            <h5>Profile Details</h5>
          </div>
          <div
            className={`tab_nav_item ${activeTab === 2 && "active"}`}
            onClick={() => tabHandler(2)}
          >
            <h5>Questions Detail</h5>
          </div>
          <div
            className={`tab_nav_item ${activeTab === 3 && "active"}`}
            onClick={() => tabHandler(3)}
          >
            <h5>Analytics Detail</h5>
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

export default UserTabs;
