import React from "react";

export default function Coupon(props) {
  //TODO Add pagination
  return (
    <div className="container">
      <div className="container row">
        <div className="col-12 container my-4 objectsWrapper">
          <div className="container my-3 row object">
            <div className="col-3 img">
              <img
                className=""
                src="/aliexpress.webp"
                alt="AliExpress"
                width="180"
                height="110"
              />
            </div>

            <div className="col-6 container p-2 text-dark">
              <div className="couponDescription lead my-1">
                {props.description}
              </div>
              <div className="couponExpiry text-muted mb-1">
                Expires {props.expiryDate}
              </div>
              <div className="couponDetails display-5">Details:</div>
            </div>

            <div className="col-3 d-flex align-items-start justify-content-end p-2 container">
              <button className="px-5 btn btn-primary">Get Offer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
