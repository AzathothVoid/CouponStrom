import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Pagination } from "../../utils/Paginate";
import StoreCouponsSection from "../../components/Sections/StoreCouponsSection/StoreCouponsSection";
import BlogsSection from "../../components/Sections/BlogsSection/BlogsSection";
import { getCouponsByStore } from "../../api/CouponsAPI";
import Loader from "../../components/Loader/Loader";
import { getStoreById } from "../../api/StoresAPI";
import { likeStore } from "../../api/StoresAPI";

export default function StorePage(props) {
  const { storeId } = useParams();
  const storeID = Number.parseInt(storeId);

  const [likeStoreCall, setLikeStoreCall] = useState(false);
  const [currCouponPage, setCurrCouponPage] = useState(1);
  const [couponSection, setCouponSection] = useState("coupon");
  const [storeData, setStoreData] = useState();
  const [couponsData, setCouponsData] = useState();
  const [likedStores, setLikedStores] = useState(
    JSON.parse(localStorage.getItem("likedStores")) || []
  );

  useEffect(() => {
    getStoreById({ "store-id": storeID }).then((response) => {
      setStoreData(response);
    });
  }, [storeID]);

  useEffect(() => {
    getCouponsByStore({ "store-id": storeID }).then((response) => {
      setCouponsData(response);
    });
  }, [storeID, storeData]);

  useEffect(() => {
    console.log("inserting", likedStores);
    localStorage.setItem("likedStores", JSON.stringify(likedStores));
  }, [likedStores]);

  useEffect(() => {
    if (likeStoreCall) {
      if (likedStores.includes(storeID)) return;
      try {
        likeStore({ "store-id": storeID }).then((response) => {
          setLikedStores((prev) => [...prev, storeID]);
          setStoreData((prev) => {
            return { ...prev, likes: prev.likes + 1 };
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [likeStoreCall]);

  const itemsPerPage = 5;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let filteredCoupons = couponsData;

  console.log("Coupons Data: ", couponsData);

  if (couponsData)
    filteredCoupons = couponsData.filter(
      (coupon) => coupon.type === couponSection.toLowerCase()
    );

  console.log("Coupons Filtered Data: ", filteredCoupons);

  let couponsToShow;

  if (filteredCoupons)
    couponsToShow = filteredCoupons.slice(startIndex, endIndex);

  let keywords;

  if (storeData)
    keywords = storeData.subcategories.map((keyword) => {
      return (
        <span className="col col-lg-3 px-0 bg-white text-center fs-tags text-dark">
          {keyword.subcategory.name}
        </span>
      );
    });

  const couponSectionHandler = (event) => {
    event.preventDefault();
    setCouponSection(event.target.innerHTML.toLowerCase());
  };

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  const handleStoreLike = () => {
    setLikeStoreCall(true);
  };

  return (
    <>
      {storeData && couponsData ? (
        <>
          <Header />
          <div className="container-fluid shadow-tb p-5 bg-primary-custom ">
            <div className="row d-flex justify-content-center align-content-center">
              <div
                style={{ maxWidth: "250px", height: "100%" }}
                className="col col-lg-4 mb-3 mb-sm-0"
              >
                <img className="w-100" src={storeData.images[0].image} alt="" />
              </div>
              <div className="col-12 col-sm-4 col-md-5 col-lg-5 ms-md-4">
                <h1 className="h1 mb-2 fw-bolder">{storeData.name}</h1>
                <p className="">{storeData.description}</p>
              </div>
              <div className="col col-lg-3">
                <div className="row gx-custom-7 gh-custom-7">
                  <span className="fs-2 fw-bolder px-0">TAGS</span>
                  {keywords}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 ">
            <section className="container p-0">
              <div className="d-flex gap-0 mb-2">
                <span>
                  <button
                    onClick={couponSectionHandler}
                    className={`btn-custom fs-4 ${
                      couponSection === "coupon" ? "btn-active-primary" : null
                    }`}
                  >
                    COUPON
                  </button>
                </span>
                <span>
                  <button
                    onClick={couponSectionHandler}
                    className={`btn-custom fs-4 ${
                      couponSection === "deal" ? "btn-active-primary" : null
                    }`}
                  >
                    DEAL
                  </button>
                </span>
              </div>
            </section>

            <section className="container p-0">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4">
                  {console.log("Coupons to show, store page: ", couponsToShow)}
                  <StoreCouponsSection data={couponsToShow} />
                  <div className="sticky-footer">
                    <Pagination
                      totalItems={filteredCoupons.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-5 col-lg-4 p-0 container sidebarWrapper me-0 mb-4">
                  <div className="container p-6 pe-0">
                    <div style={{ height: "500px" }} className="mb-4">
                      <div className="bg-dark h-100 w-100 d-flex  p-5 p-md-3 ps-md-0 pe-md-0 flex-column align-items-center justify-content-center">
                        <img
                          className="w-75 rounded mb-4 bg-white"
                          src={storeData.images[0].image}
                          alt=""
                        />
                        <h3 className="text-white fs-6 fw-light mb-1 mb-md-2">
                          Are you happy with these offers?
                        </h3>
                        <div class="row sticky-footer">
                          <div className="col-6 ">
                            <button
                              onClick={handleStoreLike}
                              className="btn btn-primary padding-inline-long rounded-0 fw-bolder"
                            >
                              YES
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ height: "200px" }}
                      className="container text-center shadow"
                    >
                      <div className="row g-4 bg-white pb-2">
                        <div className="col-12 ">
                          Total Coupons: {storeData.total_coupons}
                        </div>
                        <div className="col-12 ">
                          Total Deals: {storeData.total_deals}
                        </div>
                        <div className="col-12 ">
                          Last Update:{" "}
                          {new Date(storeData.updated_at).toLocaleDateString()}
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center gap-2">
                          <i
                            style={{ color: "red" }}
                            className="bi-heart-fill"
                          ></i>
                          <span>{storeData.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <BlogsSection />
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
