import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { useDataState } from "../../components/Data/DataContext";
import GeneralCoupon from "../../components/GeneralCoupon";

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

  console.log("filtered coupons data: ", filteredCoupons);

  return (
    <>
      {coupons ? (
        <>
          <Header />
          <main className="container py-3">
            <div className="d-flex align-items-center gap-2">
              <h1 className="h2 mb-0 ">Coupons:</h1>
              <p className="fs-4 couponExpiry mt-1 mb-0">
                {`${category}->${store}`} {type ? `->${type}` : null}
              </p>
            </div>
            <section className="my-4">{filteredCouponElements}</section>
          </main>
          <Footer />
        </>
      ) : null}
    </>
  );
}
