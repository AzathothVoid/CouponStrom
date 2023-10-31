import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { likeCoupon } from "../../api/CouponsAPI";

export default function CouponModal(props) {
  const codeToCopyRef = useRef(null);

  const [data, setData] = useState(props.data);
  const [likeCouponCall, setLikeCouponCall] = useState(false);
  const [likedCoupons, setLikedCoupons] = useState(
    JSON.parse(localStorage.getItem("likedCoupons")) || []
  );

  const handleCopyClick = (e) => {
    if (codeToCopyRef.current) {
      codeToCopyRef.current.select();
      navigator.clipboard.writeText(codeToCopyRef.current.value).then(() => {
        e.target.innerHTML = "Text Copied!";
      });
    }
  };

  useEffect(() => {
    if (likeCouponCall) {
      if (likedCoupons.includes(data.id)) return;
      try {
        likeCoupon({ "coupon-id": data.id }).then((response) => {
          setLikedCoupons((prev) => [...prev, prev.id]);
          setData((prev) => {
            return { ...prev, likes: prev.likes + 1 };
          });
        });
      } catch (error) {
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
        <Modal.Header closeButton></Modal.Header>
        <Modal.Header className="d-flex flex-column align-items-center">
          <div style={{ maxWidth: "25%" }}>
            <img className="mw-100" src={data.images[0].image} alt="" />
          </div>
          <Modal.Title className="mb-4">{data.title}</Modal.Title>
          <div className="mb-4 d-flex flex-column align-items-center">
            {data.type === "coupon" ? (
              <div className="d-flex mb-4">
                <input
                  style={{ width: "fit-content" }}
                  class="form-control text-center shadow-none"
                  type="text"
                  value={data.code}
                  readOnly
                  ref={codeToCopyRef}
                ></input>
                <button
                  onClick={handleCopyClick}
                  className="btn btn-primary btn-search-secondary"
                >
                  Copy
                </button>
              </div>
            ) : (
              <a
                target="_blank"
                className="link-primary fw-bold fs-5"
                href={data.deal}
              >
                Get Deal
              </a>
            )}
            {data.type === "coupon" ? (
              <h4 className="mt-1">Copy code and continue to offer</h4>
            ) : (
              <h4 className="mt-4">Click above to get the deal!</h4>
            )}
          </div>
          <a
            target="_blank"
            className="link-primary fw-bold fs-6"
            href={data.stores.link}
          >
            Continue to offer
          </a>
        </Modal.Header>
        <Modal.Body className="px-4 my-3">
          <div className="ms-3">
            <h3 className="mb-2">Details</h3>
            <p>{data.details}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center border-top my-0 py-3">
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
          <div className="d-flex justify-content-center align-items-center gap-3 my-4 border-top pt-4">
            <p className="m-0">Share on</p>
            {/* <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20coupon%20on%20MyCouponSite:%20https://couponstrom.com/"
              target="_blank"
            >
              <img src={`/socialMediaIcons/twitter.svg`} alt="" />
            </a> */}
            <a
              href={
                "https://twitter.com/share?text=" +
                encodeURIComponent("Check out this coupon: " + data.title) +
                "&url=" +
                encodeURIComponent(window.location.href)
              }
              target="_blank"
              class="twitter-share-button"
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
                  encodeURIComponent(window.location.href) +
                  "&quote=" +
                  encodeURIComponent("Check out this coupon: " + data.title)
                }
                className="fb-xfbml-parse-ignore"
              >
                <img src={`/socialMediaIcons/facebook.svg`} alt="" />
              </a>
            </div>
            <a
              href={
                "https://www.linkedin.com/sharing/share-offsite/?url=" +
                encodeURIComponent(window.location.href) +
                "&title=" +
                encodeURIComponent("Check out this coupon: " + data.title)
              }
              class="linkedin-share-button"
              target="_blank"
            >
              <img src={`/socialMediaIcons/linkedin.svg`} alt="" />
            </a>
            <a
              href={
                "https://api.whatsapp.com/send?text=" +
                encodeURIComponent(
                  "Check out this coupon: " +
                    data.title +
                    " " +
                    window.location.href
                )
              }
              class="whatsapp-share-button"
              target="_blank"
            >
              <img src={`/socialMediaIcons/whatsapp.svg`} alt="" />
            </a>

            {/* 
            <div
              className="fb-share-button"
              data-href="https://couponstrom.com"
              data-layout=""
              data-size=""
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcouponstrom.com%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                <img src={`/socialMediaIcons/facebook.svg`} alt="" />
              </a>
            </div> */}
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
