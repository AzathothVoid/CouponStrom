import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Pagination } from "../../utils/Paginate";
import StoreCouponsSection from "../../components/Sections/StoreCouponsSection/StoreCouponsSection";
import TopStoresSection from "../../components/Sections/TopStores/TopStoresSection";
import { getCouponsByStore } from "../../api/CouponsAPI";
import Loader from "../../components/Loader/Loader";
import { getStoreById } from "../../api/StoresAPI";
import { likeStore } from "../../api/StoresAPI";
import GeneralCoupon from "../../components/GeneralCoupon";
import { Helmet } from "react-helmet";
import { useDataDispatch } from "../../components/Data/DataContext";
import { getAllStores } from "../../api/StoresAPI";

export default function StorePage() {
  const { storeId } = useParams();
  const storeID = Number.parseInt(storeId);
  const dataDispatch = useDataDispatch();

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
    localStorage.setItem("likedStores", JSON.stringify(likedStores));
  }, [likedStores]);

  useEffect(() => {
    if (likeStoreCall) {
      if (likedStores.includes(storeID)) return;
      try {
        likeStore({ "store-id": storeID }).then((response) => {
          getAllStores(dataDispatch);
        });
        setLikedStores((prev) => [...prev, storeID]);
        setStoreData((prev) => {
          return { ...prev, likes: prev.likes + 1 };
        });
      } catch (error) {
        setLikedStores((prev) => {
          return prev.filter((store) => store.id != data.id);
        });
        setStoreData((prev) => {
          return { ...prev, likes: prev.likes - 1 };
        });
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
    filteredCoupons = couponsData
      .filter((coupon) => coupon.type === couponSection.toLowerCase())
      .sort((coup1, coup2) => coup2.rating - coup1.rating);

  console.log("Coupons Filtered Data: ", filteredCoupons);

  let couponsToShow;

  if (filteredCoupons)
    couponsToShow = filteredCoupons.slice(startIndex, endIndex);

  let keywords;

  if (storeData)
    keywords = storeData.subcategories.map((keyword) => {
      return keyword.subcategory.name;
    });

  const couponSectionHandler = (event) => {
    event.preventDefault();
    setCouponSection(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  const handleStoreLike = () => {
    setLikeStoreCall(true);
  };

  const visitStore = () => {
    window.open(storeData.link);
  };

  let topStoreCouponData = [];
  let topStoreCouponElements = [];

  if (couponsData) {
    topStoreCouponData = couponsData
      .sort((item1, item2) => item2.likes - item1.likes)
      .slice(0, 2);
    topStoreCouponElements = topStoreCouponData.map((coupon) => {
      return <GeneralCoupon data={coupon} />;
    });
  }

  return (
    <>
      {storeData && couponsData ? (
        <>
          <Helmet>
            <title>{`${storeData.name}-Coupon Strom`}</title>
            <meta
              name="description"
              content={`Find all your favorite coupons and deals in ${storeData.name}! ${storeData.description}`}
            />
            <meta name="keywords" content={storeData.keywords} />
            <meta
              property="og:title"
              content={`${storeData.name}-Coupon Strom`}
            />
            <meta
              property="og:description"
              content={`Find all your favorite coupons and deals in ${storeData.name}! ${storeData.description}`}
            />
            <meta property="og:image" content="/logo.svg" />
            <meta property="og:url" content={`${window.location.href}`} />
            <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
            <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
          </Helmet>
          <Header />
          <div className="container py-3 ">
            <div className="d-flex align-items-center text-footer-custom flex-column flex-md-row flex-wrap flex-md-nowrap mb-4 mt-2 bg-primary-custom p-3 p-md-4 rounded">
              <h1 className="mb-3 m-md-0 h1 fw-bolder">{storeData.name}</h1>
              <p className="m-0 fs-5 ms-5 ">{storeData.description}</p>
              <button
                onClick={visitStore}
                className="btn bg-white ms-auto"
                type="button"
              >
                Visit Store
              </button>
            </div>
            <div className="d-flex align-items-center gap-2 flex-wrap flex-lg-nowrap">
              {topStoreCouponElements}
            </div>
          </div>

          <div className="pt-4 ">
            <section className="container ">
              <div className="d-flex gap-0 mb-2">
                <span>
                  <button
                    onClick={couponSectionHandler}
                    className={`btn-custom fs-4 ${
                      couponSection === "coupon" ? "btn-active-primary" : null
                    }`}
                    value={"coupon"}
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
                    value={"deal"}
                  >
                    DEALS
                  </button>
                </span>
              </div>
            </section>

            <section className="container ">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4">
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
                          className="w-75 rounded mb-4 p-5 bg-white"
                          src={storeData.images[0].image}
                          alt=""
                        />
                        {!likedStores.includes(storeID) ? (
                          <div className="d-flex flex-column align-items-center">
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
                        ) : (
                          <h3 className="text-white fs-6 fw-light mb-1 mb-md-0 mt-4">
                            You are happy with this Store!
                          </h3>
                        )}
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
                          Last Update:
                          {` ${new Date(
                            storeData.updated_at
                          ).toLocaleDateString()}`}
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
            <div className="my-5">
              <TopStoresSection />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
