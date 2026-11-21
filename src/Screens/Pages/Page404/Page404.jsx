import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Buttons/button";

export default function Page404() {
  return (
    <section className="Page_404">
      <div className="container">
        <div className="row justify-content-center align-items-center h-100vh text-center">
          <div className="col-auto">
            <h1>404</h1>
            <p className="mb-4">Oops.. page not found!</p>
            <Link to="/">
              <Button
                className="btn btn-theme1-circle"
                text="Back To Home"
              ></Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
