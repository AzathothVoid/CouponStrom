import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { getCouponByID } from "../../api/CouponsAPI";
import Loader from "../../components/Loader/Loader";
import CouponModal from "../../components/Modal/CouponModal";
import { Helmet } from "react-helmet";
import {
  useDataDispatch,
  useDataState,
} from "../../components/Data/DataContext";
import { Link } from "react-router-dom";

function getTimeRemaining(expiryDate) {
  if (!expiryDate) return;
  const expiration = new Date(expiryDate);
  const now = new Date();
  const timeDifference = expiration - now;

  if (timeDifference <= 0) {
    // Coupon has expired
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate remaining time
  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export default function CouponPage() {
  const { couponId } = useParams();
  const couponID = Number.parseInt(couponId);
  const useData = useDataState();

  const categories = useData.categories;
  const coupons = useData.coupons;

  const [coupon, setCoupon] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(
    coupon ? getTimeRemaining(coupon.expiry) : null
  );
  const [modalDisplay, setModalDisplay] = useState(false);

  const keywords = categories.map((category) => {
    return category.name;
  });

  keywords.push("Coupons");
  keywords.push("Deals");

  useEffect(() => {
    if (couponID) {
      getCouponByID({ "coupon-id": couponID }).then((response) => {
        setCoupon(response);
      });
    }
  }, [couponId]);

  useEffect(() => {
    if (!coupon) return;
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining(coupon.expiry));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [coupon]);

  const handleShow = () => setModalDisplay(true);
  const handleClose = () => setModalDisplay(false);
  const handleCouponVisit = (event, couponID) => {
    window.open(`/coupon/${couponID}`, "_self");
  };

  let subCategoryElements;
  let relatedCouponElements;

  if (coupon)
    relatedCouponElements = coupons
      .filter((coupon) =>
        coupon.subcategories.some((subcategory) =>
          coupon.subcategories.includes(subcategory)
        )
      )
      .slice(0, 5)
      .map((coupon) => {
        return (
          <li key={coupon.id} className="row my-4 align-items-center  my-md-3">
            <div className="col-3 d-flex align-items-center justify-content-center border hover-image p-3">
              <Link to={`/stores/${coupon.store}`}>
                <img className="w-100" src={coupon.images[0].image} alt="" />
              </Link>
            </div>
            <p
              onClick={(event) => handleCouponVisit(event, coupon.id)}
              className="col-9 fs-6"
            >
              {coupon.name}
            </p>
          </li>
        );
      });

  let categoryElements;

  if (coupon)
    categoryElements = coupon.categories.map((category) => {
      return (
        <li className="" key={category.category.id}>
          <h3 className="h5">{category.category.name}</h3>
        </li>
      );
    });

  return (
    <>
      {coupon ? (
        <>
          <Helmet>
            <title>{`${coupon.name}-Coupon Strom`}</title>
            <meta name="description" content={`${coupon.details}`} />
            <meta name="keywords" content={keywords} />

            <meta property="og:title" content={`${coupon.name}`} />
            <meta property="og:description" content={`${coupon.details}`} />
            <meta property="og:image" content={`/logo.svg`} />
            <meta property="og:url" content={`${window.location.href}`} />
            <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
            <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
          </Helmet>
          <Header />
          <main className="container d-flex flex-column my-3">
            <section className="row">
              <div className="col-12 col-md-7 col-lg-8">
                <div className="my-4 d-flex mx-5 py-3 flex-column align-items-center gap-4 shadow rounded">
                  <img
                    className="border p-3"
                    width={"200px"}
                    src={coupon.images[0].image}
                  />
                  <h1 className="h1 text-center px-2">{coupon.name}</h1>
                  <div className="d-flex justify-content-center align-items-center flex-wrap my-4 border-top border-bottom w-100 p-2">
                    <p className="m-0 me-4">Share on</p>

                    <div className="d-flex gap-3">
                      <a
                        href={
                          "https://twitter.com/share?text=" +
                          encodeURIComponent(coupon.name) +
                          "&url=" +
                          encodeURIComponent(window.location.href)
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
                            encodeURIComponent(`${window.location.href}`)
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
                          encodeURIComponent(
                            "Check out this coupon: " + coupon.name
                          )
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
                              coupon.name +
                              "\n" +
                              window.location.href
                          )
                        }
                        class="whatsapp-share-button"
                        target="_blank"
                      >
                        <img src={`/socialMediaIcons/whatsapp.svg`} alt="" />
                      </a>
                    </div>

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
                  <div className="w-100 p-4 px-5">
                    <button
                      onClick={handleShow}
                      className="btn text-light w-100 bg-primary-custom py-2"
                    >
                      {coupon.type === "coupon" ? "Get Code" : "Get Offer"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5 col-lg-4">
                <div className="shadow rounded p-4 mb-4 my-4 text-center m-auto">
                  <h2 className="fs-3 border-bottom pb-2">Expires in</h2>
                  <div className="text-danger mt-2 fs-2 d-flex gap-2 align-items-center justify-content-center">
                    <i className="bi bi-clock"></i>
                    {timeRemaining
                      ? `${timeRemaining.days} Days ${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`
                      : null}
                  </div>
                </div>
                <div className=" shadow rounded py-4 mb-4 my-4 m-auto">
                  <h3 className="mb-4 fs-4 border-bottom w-100 ps-3 pb-2">
                    Related Coupons
                  </h3>
                  <ul>{relatedCouponElements}</ul>
                </div>
                {/* <div className=" shadow rounded p-4 mb-4 my-4 m-auto">
                  <h3 className="mb-3 text-center">Categories</h3>
                  <ul>{categoryElements}</ul>
                </div> */}
              </div>
            </section>
          </main>
          <Footer />
          <CouponModal
            data={coupon}
            display={modalDisplay}
            handleClose={handleClose}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

{
  /* <main className="container d-flex flex-column my-3">
            <section className="row">
              <div className="col-md-9">
                <div className="my-4 d-flex mx-5 py-3 flex-column align-items-center gap-4 shadow rounded">
                  <img
                    className="border p-3"
                    width={"200px"}
                    src={coupon.images[0].image}
                  />
                  <h1 className="h1">{coupon.name}</h1>
                  <div className="d-flex justify-content-center align-items-center gap-3 my-4 border-top border-bottom w-100 py-2">
                    <p className="m-0">Share on</p>

                    <a
                      href={
                        "https://twitter.com/share?text=" +
                        encodeURIComponent(coupon.name) +
                        "&url=" +
                        encodeURIComponent(window.location.href)
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
                          encodeURIComponent(`${window.location.href}`)
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
                        encodeURIComponent(
                          "Check out this coupon: " + coupon.name
                        )
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
                            coupon.name +
                            "\n" +
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
            </div>
                  </div>
                  <div className="w-100 p-4 px-5">
                    <button
                      onClick={handleShow}
                      className="btn text-light w-100 bg-primary-custom py-2"
                    >
                      {coupon.type === "coupon" ? "Get Code" : "Get Offer"}
                    </button>
                  </div>
                </div>
              </div>
              <div className=" col-md-3">
                <div className=" shadow rounded p-4 mb-4 my-4 text-center m-auto">
                  <h2 className="">Expires in</h2>
                  <div className=" fs-2 d-flex gap-2 align-items-center justify-content-center">
                    <i className="bi bi-clock"></i>
                    {timeRemaining
                      ? `${timeRemaining.days}:${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`
                      : null}
                  </div>
                </div>
                <div className=" shadow rounded p-4 mb-4 my-4 m-auto">
                  <h3 className="mb-3 text-center">Subcategories</h3>
                  <ul>{subCategoryElements}</ul>
                </div>
                <div className=" shadow rounded p-4 mb-4 my-4 m-auto">
                  <h3 className="mb-3 text-center">Categories</h3>
                  <ul>{categoryElements}</ul>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <CouponModal
            data={coupon}
            display={modalDisplay}
            handleClose={handleClose}
          />
        </> */
}
