import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { likeCoupon, getAllCoupons } from "../../api/CouponsAPI";
import { useDataDispatch } from "../Data/DataContext";

export default function ShareCouponModal(props) {
  const dataDispatch = useDataDispatch();

  const [data, setData] = useState(props.data);
  const [likeCouponCall, setLikeCouponCall] = useState(false);
  const [likedCoupons, setLikedCoupons] = useState(
    JSON.parse(localStorage.getItem("likedCoupons")) || []
  );

  useEffect(() => {
    if (likeCouponCall) {
      if (likedCoupons.includes(data.id)) return;
      try {
        likeCoupon({ "coupon-id": data.id }).then((response) => {
          getAllCoupons(dataDispatch);
        });
        setLikedCoupons((prev) => [...prev, data.id]);
        setData((prev) => {
          return { ...prev, likes: prev.likes + 1 };
        });
      } catch (error) {
        setLikedCoupons((prev) => {
          return prev.filter((coupon) => coupon.id != data.id);
        });
        setData((prev) => {
          return { ...prev, likes: prev.likes - 1 };
        });
        console.log(error);
      }
    }
  }, [likeCouponCall]);

  useEffect(() => {
    localStorage.setItem("likedCoupons", JSON.stringify(likedCoupons));
  }, [likedCoupons]);

  const handleLikeCoupon = (e) => {
    setLikeCouponCall(true);
  };

  return (
    <>
      <Modal size="lg" show={props.display} onHide={props.handleClose}>
        <Modal.Header className="d-flex justify-content-center fw-bold fs-3 text-success mb-3 text-capitalize">
          Share Coupon
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <Modal.Title>{data.name}</Modal.Title>
          <div className="d-flex justify-content-center align-items-center my-0 py-3">
            {likedCoupons.includes(data.id) ? (
              <div className="text-primary fs-5 m-0">
                <span>
                  You like this coupon!{" "}
                  <i className="bi bi-hand-thumbs-up ms-1"></i>
                </span>
              </div>
            ) : (
              <div>
                <button
                  onClick={handleLikeCoupon}
                  className="btn text-primary fs-5 m-0"
                >
                  Like
                  <i className="bi bi-hand-thumbs-up ms-1"></i>
                </button>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center gap-3 my-3 border-top w-100 pt-4">
            <p className="m-0">Share on</p>

            <a
              href={
                "https://twitter.com/share?text=" +
                encodeURIComponent(data.name) +
                "&url=" +
                encodeURIComponent(`${window.location.host}/coupon/${data.id}`)
              }
              target="_blank"
              data-show-count="false"
            >
              <img src={`/socialMediaIcons/twitter.svg`} alt="" />
            </a>

            <div
              className="fb-share-button"
              data-href="https://couponstrom.com"
              data-layout=""
              data-size=""
            >
              <a
                target="_blank"
                href={
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(
                    `${window.location.host}/coupon/${data.id}`
                  )
                }
                className="fb-xfbml-parse-ignore"
              >
                <img src={`/socialMediaIcons/facebook.svg`} alt="" />
              </a>
            </div>
            <a
              href={
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                encodeURIComponent(
                  `${window.location.host}/coupon/${data.id}`
                ) +
                "&title=" +
                encodeURIComponent("Check out this coupon: " + data.name)
              }
              target="_blank"
            >
              <img src={`/socialMediaIcons/linkedin.svg`} alt="" />
            </a>
            <a
              href={
                "https://api.whatsapp.com/send?text=" +
                encodeURIComponent(
                  data.name + "\n" + `${window.location.host}/coupon/${data.id}`
                )
              }
              target="_blank"
            >
              <img src={`/socialMediaIcons/whatsapp.svg`} alt="" />
            </a>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
