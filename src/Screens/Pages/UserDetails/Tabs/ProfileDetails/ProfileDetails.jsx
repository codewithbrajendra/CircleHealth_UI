import React, { useState } from "react";
import Myprofile from "../../../../Components/ProfileBox/ProfileBox";

import "./Profile.scss";

function ProfileDetails() {
  const [profleData, setProfileData] = useState({
    link: true,
    userType: "user",
  });

  return (
    <div className="tab_inner_profile_details">
      <div className="row">
        <div className="col-md-12 col-lg-9 col-sm-12">
          <Myprofile data={profleData} />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
