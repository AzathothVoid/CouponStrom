import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDataState } from "../../components/Data/DataContext";
import GeneralCoupon from "../../components/GeneralCoupon";
import { Helmet } from "react-helmet";

export default function CouponsPage() {
  const useData = useDataState();
  const coupons = useData.coupons;

  const { category, store, type } = useParams();

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.stores.name === store && (type ? coupon.type === type : true)
  );

  const filteredCouponElements = filteredCoupons.map((coupon) => {
    return (
      <div className="mb-2">
        <GeneralCoupon data={coupon} />
      </div>
    );
  });

  const keywords = [category, store];

  if (type) keywords.push(type);

  return (
    <>
      <Helmet>
        <title>Deals & Coupons-Coupons Strom</title>
        <meta
          name="description"
          content={`List of ${
            type ? type : "all coupons and deals"
          } of the category ${category} and store ${store}`}
        />
        <meta name="keywords" content={keywords} />

        <meta property="og:title" content="Deals & Coupons-Coupons Strom" />
        <meta
          property="og:description"
          content={`List of ${
            type ? type : "all coupons and deals"
          } of the category ${category} and store ${store}`}
        />
        <meta property="og:image" content="/logo.svg" />
        <meta property="og:url" content={`${window.location.href}`} />
        <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
        <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
      </Helmet>

      {coupons ? (
        <>
          <Header />
          <main className="container py-3">
            <div className="d-flex align-items-center gap-2">
              <ol className="breadcrumb fs-3">
                <li className="breadcrumb-item">{category}</li>
                <li className="breadcrumb-item">{store}</li>
                <li className={`breadcrumb-item ${type ? "active" : null}`}>
                  {type ? type : "All"}
                </li>
              </ol>
            </div>
            <section className="my-4">{filteredCouponElements}</section>
          </main>
          <Footer />
        </>
      ) : null}
    </>
  );
}
