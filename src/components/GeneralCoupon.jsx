import React from "react";
import { useState } from "react";
import CouponModal from "./Modal/CouponModal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { areDatesOneDayApart } from "../utils/DateUtils";

export default function GeneralCoupon(props, { btn = true }) {
  const [modalDisplay, setModalDisplay] = useState(false);
  const navigate = useNavigate();
  const data = props.data;
  const expiry = new Date(data.expiry);

  const handleShow = () => setModalDisplay(true);
  const handleClose = () => setModalDisplay(false);
  const handleShowSmallScreen = () => {
    if (window.screen.width < 576) setModalDisplay(true);
    window.open(`/coupon/${data.id}`, "_blank");
  };

  let limitedTime = false;

  if (areDatesOneDayApart(data.expiry, new Date().getTime())) {
    limitedTime = true;
  }

  const showPopUp = (e) => {
    e.stopPropagation();
    const details = document.getElementById(`details${data.id}`);
    console.log(details);
    details.classList.toggle("show");
  };

  return (
    <div className="container-md pe-0 ">
      <div className="container-fluid pe-0 row">
        <div className="container-fluid row shadow bg-white">
          <div className="col-4 col-sm-3 d-flex flex-column align-items-center justify-content-center img">
            <Link to={`/stores/${data.store}`}>
              <img
                style={{ maxHeight: "107px", maxWidth: "300px" }}
                className="w-100 p-2 border my-4 hover-image"
                src={data.images[0].image}
                alt=""
              />
            </Link>
          </div>

          <div
            onClick={handleShowSmallScreen}
            className="col-8 col-sm-6 container-fluid p-2 text-dark"
          >
            <div className="couponDescription mt-1 mb-2 lead fs-4">
              {data.name}
              <div>
                {!limitedTime ? null : (
                  <span
                    style={{ fontSize: "1rem" }}
                    className="badge text-bg-primary"
                  >
                    Limited Time
                  </span>
                )}
              </div>
            </div>
            <div className="couponExpiry text-muted mb-2">
              <i className="bi bi-clock me-2"></i>

              {`${expiry.toDateString()} ${expiry.toLocaleTimeString()}`}
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
              className="px-4 btn text-light bg-primary-custom hover-button"
            >
              {data.type === "coupon" ? "Get Code" : "Get Offer"}
            </button>
          </div>

          <CouponModal
            data={data}
            display={modalDisplay}
            handleClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
