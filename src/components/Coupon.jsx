import React from "react";

export default function Coupon(props) {
  //TODO Add pagination


  return (
    <div className="container">
      <div className="container objectsWrapper row">
        <div className="container my-4 row object">
          <div className="col-xl-3  img">
            <img
              className=""
              src="/aliexpress.webp"
              alt="AliExpress"
              width={"100%"}
              height={"110px"}
              style={{ maxWidth: 180 }}
            />
          </div>

          <div className="col-xl-6 container p-2 text-dark">
            <div className="couponDescription lead my-1">
              {props.description}
            </div>
            <div className="couponExpiry text-muted mb-1">
              Expires {props.expiryDate}
            </div>
            <div
              className="couponDetails display-5 popupBtn"
              onclick="showPopup()"
            >
              Details:
              <i className="bi bi-arrow-down-circle" id="detailsArrowIcon"></i>
              <span className="popupText">{props.details}</span>
            </div>
          </div>

          <div className="col-xl-3 d-flex align-items-start justify-content-end p-2 container">
            <button className="px-5 btn btn-primary">Get Offer</button>
          </div>
        </div>
      </div>
    </div>
  );
}
