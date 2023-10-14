import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/OldHeader";
import Footer from "../../components/Footer/Footer";
import storesData from "../../pages/Stores/storeData";
import { couponsData } from "../Home/couponsData";
import StoreCouponsSection from "../../components/Sections/StoreCouponsSection/StoreCouponsSection";

export default function StorePage(props) {
  const [couponSection, setCouponSection] = useState("coupon");
  const { storeId } = useParams();
  const storeData = storesData.find(
    (store) => store.id === Number.parseInt(storeId)
  );

  const fileteredCouponsData = couponsData.filter(
    (coupon) => coupon.storeId === Number.parseInt(storeId)
  );

  const keywords = storeData.keywords.map((keyword) => {
    return (
      <span className="col col-lg-3 px-0 bg-secondary-custom text-center fs-tags text-dark">
        {keyword}
      </span>
    );
  });

  const couponSectionHandler = (event) => {
    event.preventDefault();
    setCouponSection((prev) => (prev === "coupon" ? "deal" : "coupon"));
  };

  return (
    <>
      <Header />
      <div className="container-fluid shadow mt-5 mb-5 p-5">
        <div className="row d-flex justify-content-center align-content-center">
          <div style={{ maxWidth: "250px" }} className="col col-lg-4">
            <img src={`/${storeData.img}`} alt="" />
          </div>
          <div className="col col-lg-5">
            <h1 className="h1 mb-2 fw-bolder">{storeData.name}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Distinctio consectetur dolorem debitis maxime cupiditate quisquam
              mollitia atque, iure nihil illo.
            </p>
          </div>
          <div className="col col-lg-3">
            <div className="row gx-custom-7 gh-custom-7">
              <span className="fs-2 fw-bolder px-0">TAGS</span>
              {keywords}
            </div>
          </div>
        </div>
      </div>

      <section className="container">
        <div className="d-flex gap-0 mb-2">
          <span>
            <button
              onClick={couponSectionHandler}
              className={`btn-custom fs-4 ${
                couponSection === "coupon" ? "btn-active-primary" : null
              }`}
            >
              COUPONS
            </button>
          </span>
          <span>
            <button
              onClick={couponSectionHandler}
              className={`btn-custom fs-4 ${
                couponSection === "deal" ? "btn-active-primary" : null
              }`}
            >
              DEALS
            </button>
          </span>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-7 col-lg-8">
            <StoreCouponsSection data={fileteredCouponsData} />
          </div>
          <div
            style={{ minHeight: "300px", maxHeight: "400px" }}
            className="col-12 col-md-5 col-lg-4 p-0 container sidebarWrapper me-0"
          >
            <div className="bg-dark w-100 d-flex p-5 p-md-3 ps-md-0 pe-md-0 flex-column align-items-center justify-content-center h-100">
              <img className="w-75 mb-4" src={`/${storeData.img}`} alt="" />
              <h3 className="text-white fs-6 fw-light mb-4">
                Are you happy with these offers?
              </h3>
              <div class="row sticky-footer">
                <div className="col-6 ">
                  <button className="btn btn-primary padding-inline-long rounded-0 fw-bolder">
                    YES
                  </button>
                </div>
                <div className="col-6 fw-bolder">
                  <button className="btn btn-primary padding-inline-long rounded-0 fw-bolder">
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
