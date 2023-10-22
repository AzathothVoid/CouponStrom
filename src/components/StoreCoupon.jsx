import React, { useState } from "react";
import { formatDate } from "../utils/DateUtils";
import CouponModal from "./Modal/CouponModal";

export default function StoreCoupon(props) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const data = props.data;

  const handleShow = () => setModalDisplay(true);
  const handleClose = () => setModalDisplay(false);
  const handleShowSmallScreen = () => {
    if (window.screen.width < 576) setModalDisplay(true);
  };

  const showPopUp = (e) => {
    e.stopPropagation();
    const details = document.getElementById(`details${data.id}`);
    console.log(details);
    details.classList.toggle("show");
  };

  return (
    <div className="container-md pe-0">
      <div className="container-fluid pe-0 row">
        <div className="container-fluid row shadow bg-white">
          <div className="col-4 col-sm-3 d-flex flex-column justify-content-center img">
            <img className="" src="/generalCoupon.svg" alt="" width={"100%"} />
          </div>

          <div
            onClick={handleShowSmallScreen}
            className="col-8 col-sm-6 container-fluid p-2 text-dark"
          >
            <div className="couponDescription my-1 lead">{data.title}</div>
            <div className="couponExpiry text-muted mb-1">
              Expires {formatDate(new Date(data.expiry))}
            </div>
            <div className="position-relative">
              <div
                style={{ width: "fit-content" }}
                className="couponDetails display-5 fs-5 popupBtn"
                onClick={showPopUp}
              >
                Details:
                <i
                  className="bi bi-arrow-down-circle mx-2 fs-6"
                  id="detailsArrowIcon"
                ></i>
              </div>
              <p
                id={`details${data.id}`}
                className="popupText mt-3 fs-6 position-absolute"
              >
                {data.details}
              </p>
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
