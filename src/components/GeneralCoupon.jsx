import React from "react";
import { useState } from "react";
import CouponModal from "./Modal/CouponModal";

export default function Coupon(props) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const data = props.data;

  const handleShow = () => setModalDisplay(true);
  const handleClose = () => setModalDisplay(false);

  return (
    <div className="container-md pe-0">
      <div className="container-fluid pe-0 row">
        <div className="container-fluid row shadow bg-white">
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
              Expires {data.expiryDate}
            </div>
            <div
              className="couponDetails display-5 fs-5 popupBtn"
              onclick="showPopup()"
            >
              Details:
              <i className="bi bi-arrow-down-circle" id="detailsArrowIcon"></i>
              <span className="popupText">{data.details}</span>
            </div>
          </div>

          <div className="col-3 d-none d-sm-flex align-items-start justify-content-end p-2 container">
            <button
              onClick={handleShow}
              className="px-4 btn text-light bg-primary-custom"
            >
              Get Offer
            </button>
            <CouponModal
              data={data}
              display={modalDisplay}
              handleClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
