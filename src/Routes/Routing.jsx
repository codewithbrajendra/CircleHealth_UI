import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../Screens/Pages/Login/Login";
import ForgetPassword from "../Screens/Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../Screens/Pages/ResetPassword/ResetPassword";
import Page404 from "../Screens/Pages/Page404/Page404";

const Home = lazy(() => import("../Screens/Pages/Home/Home"));
const UserManagement = lazy(() =>
  import("../Screens/Pages/UserManagement/UserManagement")
);
const AddPiletUser = lazy(() =>
  import("../Screens/Pages/AddPiletUser/AddPiletUser")
);
const UserTabs = lazy(() => import("../Screens/Pages/UserDetails/UserTabs"));
const MyProfile = lazy(() => import("../Screens/Pages/MyProfile/MyProfile"));
const Therapist = lazy(() => import("../Screens/Pages/Therapists/Therapists"));
const Analytics = lazy(() => import("../Screens/Pages/Analytics/Analytics"));
const EditTherapist = lazy(() =>
  import("../Screens/Pages/EditTherapist/EditTherapist")
);
const AddTherapist = lazy(() =>
  import("../Screens/Pages/AddTherapist/AddTherapist")
);
const AdminList = lazy(() =>
  import("../Screens/Pages/AdminManagment/AdminList/AdminList")
);
const AddAdmin = lazy(() =>
  import("../Screens/Pages/AdminManagment/AddAdmin/AddAdmin")
);
const EditAdmin = lazy(() =>
  import("../Screens/Pages/AdminManagment/EditAdmin/EditAdmin")
);

const Routing = (props) => {
  const { Auth, UserType } = props;
  //console.log(Auth);

  if (Auth === true) {
    return (
      <main className="Main_Area">
        <Suspense fallback={<div className="loader m-5-auto"></div>}>
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/" component={UserManagement} />
            <Route exact path="/therapists" component={Therapist} />
            <Route exact path="/edit_therapist/:id" component={EditTherapist} />
            <Route exact path="/add_therapist" component={AddTherapist} />
            <Route exact path="/add_pilet_user" component={AddPiletUser} />
            <Route exact path="/edit_pilet_user/:id" component={AddPiletUser} />
            <Route exact path="/user_info/:id" component={UserTabs} />
            <Route exact path="/admin_profile" component={MyProfile} />
            <Route exact path="/analytics" component={Analytics} />
            {UserType === "SUPER_ADMIN" && (
              <Route exact path="/admins" component={AdminList} />
            )}
            {UserType === "SUPER_ADMIN" && (
              <Route exact path="/addAdmin" component={AddAdmin} />
            )}
            {UserType === "SUPER_ADMIN" && (
              <Route exact path="/editAdmin/:id" component={EditAdmin} />
            )}

            <Route component={Page404} />
          </Switch>
        </Suspense>
      </main>
    );
  }

  return (
    <main className="Main_Area">
      <Suspense fallback={<div className="loader m-5-auto"></div>}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/forget_password" component={ForgetPassword} />
          <Route exact path="/reset_password" component={ResetPassword} />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </main>
  );
};

export default Routing;
