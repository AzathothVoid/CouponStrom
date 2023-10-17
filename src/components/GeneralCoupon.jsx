import React from "react";

export default function Coupon(props) {
  return (
    <div className="container-md pe-0">
      <div className="container-fluid pe-0 row">
        <div className="container-fluid row shadow">
          <div className="col-4 col-sm-3 d-flex flex-column justify-content-center img">
            <img
              className=""
              src="/Hardees-logo.png"
              alt="AliExpress"
              width={"100%"}
            />
          </div>

          <div className="col-8 col-sm-6 container-fluid p-2 text-dark">
            <div className="couponDescription my-1 lead">
              {props.description}
            </div>
            <div className="couponExpiry text-muted mb-1">
              Expires {props.expiryDate}
            </div>
            <div
              className="couponDetails display-5 fs-5 popupBtn"
              onclick="showPopup()"
            >
              Details:
              <i className="bi bi-arrow-down-circle" id="detailsArrowIcon"></i>
              <span className="popupText">{props.details}</span>
            </div>
          </div>

          <div className="col-3 d-none d-sm-flex align-items-start justify-content-end p-2 container">
            <button className="px-4 btn text-light bg-primary-custom">
              Get Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
