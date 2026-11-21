import logo from "../../../Assets/Images/new-logo-small.png";
import HeaderUserBox from "../../Components/HeaderUserBox/HeaderUserBox";
import SearchBox from "../../Components/SearchBox/SearchBox";
import NotificationBox from "../../Components/NotificationBox/NotificationBox";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = (props) => {
  return (
    <section className="Top_Header bg_white">
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col logo_Wrapper">
            <img src={logo} className="img_logo" />
          </div>
          <div className="col-auto  HeaderRightAria">
            <div className="d-flex align-items-center mobile-hide">
              <SearchBox
                id="Searchbox"
                className="HeaderSearch mr-25"
                input={{
                  className: "form-control",
                  error: "",
                  name: "search",
                  type: "text",
                  required: "required",
                  placeholder: "Search for Anything (Global Search)",
                }}
              />
              <NotificationBox className="mr-25" />
              <Link to="/admin_profile">
                <HeaderUserBox />
              </Link>
            </div>
            {props.menuToggle === true && (
              <div
                className=" alignItemsCenter"
                style={{ height: 44, display: "flex" }}
              >
                <div className="pr-3  mobileUserBox">
                  <Link to="/admin_profile">
                    <HeaderUserBox />
                  </Link>
                </div>
                <div className="menuToggle" onClick={() => props.menuHandler()}>
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar mb-0"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
