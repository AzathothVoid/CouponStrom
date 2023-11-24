import React from "react";
import { useState, useEffect } from "react";
import Coupon from "../../components/GeneralCoupon";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import LogoSlider from "../../components/Slider";
import { Pagination } from "../../utils/Paginate";
import TopStoresSection from "../../components/Sections/TopStores/TopStoresSection";
import TopCouponsSection from "../../components/Sections/TopCoupons/TopCoupons";
import LimitedTimeCouponsSection from "../../components/Sections/LimitedTimeCoupons/LimitedTimeCoupons";
import LatestCouponsSection from "../../components/Sections/LatestCoupons/LatestCoupons";
import BlogsSideBar from "../../components/Sections/BlogsSection/BlogsSideBar";
import { useDataState } from "../../components/Data/DataContext";
import Loader from "../../components/Loader/Loader";
import SearchCoupons from "../../components/SearchCoupons/SearchCoupons";
import { Helmet } from "react-helmet";

export default function Home() {
  const useData = useDataState();

  const [currCouponPage, setCurrCouponPage] = useState(1);
  const coupons = useData.coupons;
  const categories = useData.categories;

  const keywords = categories.map((category) => {
    return category.name;
  });

  keywords.push("Coupons");
  keywords.push("Deals");

  const itemsPerPage = 12;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const couponsToShow = coupons.slice(startIndex, endIndex);

  const couponElements = couponsToShow.map((coupon) => {
    return (
      <div className="my-3 my-sm-3">
        <Coupon data={coupon} />
      </div>
    );
  });

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Coupon Strom: Discount Codes And Offers</title>
        <meta
          name="description"
          content="Get Free discount codes and offers. Browse through your favorite stores and categories and get the best deal for yourself!"
        />
        <meta name="keywords" content={keywords} />

        <meta
          property="og:title"
          content="Coupon Strom: Discount Codes And Offers"
        />
        <meta
          property="og:description"
          content="Get Free discount codes and offers. Browse through your favorite stores and categories and get the best deal for yourself!"
        />
        <meta property="og:image" content={`/logo.svg`} />
        <meta property="og:url" content={import.meta.env.VITE_WEBSITE_URL} />

        <meta property="twitter:card" content="" />
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="" />
        <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
        <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
      </Helmet>
      {coupons && couponElements ? (
        <>
          <Header />

          <main>
            <section className="container m-auto flex-wrap flex-md-nowrap slider-container-bg align-items-center row gap-5 py-5">
              <div className="col-12 col-md-8">
                <LogoSlider />
              </div>
              <div className="col-12 col-md-4 my-md-0 my-4">
                <SearchCoupons />
              </div>
            </section>
            <div className="mb-5">
              <TopStoresSection />
            </div>
            <section className="container-md my-3 pe-0">
              <div style={{ minHeight: "100vh" }} className="row">
                <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4">
                  <h2 className="fs-2 text-primary-custom">Coupon Deals</h2>
                  <div>{couponElements}</div>
                  <div className="sticky-footer my-4">
                    <Pagination
                      totalItems={coupons.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
                <BlogsSideBar max={3} />
              </div>
            </section>
            <div className="my-4">
              <TopCouponsSection />
            </div>
            <div className="my-4">
              <LatestCouponsSection />
            </div>
            <div className="my-4">
              <LimitedTimeCouponsSection />
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
