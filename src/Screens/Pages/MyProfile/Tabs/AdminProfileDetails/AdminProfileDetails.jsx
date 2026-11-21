import React, { useState } from "react";
import ProfileBox from "../../../../Components/ProfileBox/ProfileBox";

const AdminProfileDetails = () => {
  const [profleData, setProfileData] = useState({
    link: false,
    userType: "admin",
    userId: "",
  });
  return (
    <div className="AdminProfileDetails mt-3">
      <div className="row">
        <div className="col-lg-9 col-md-12 col-sm-12">
          <ProfileBox data={profleData} />
        </div>
      </div>
    </div>
  );
};

export default AdminProfileDetails;
