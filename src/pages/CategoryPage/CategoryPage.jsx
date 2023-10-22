import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import categorieData from "../Categories/categoriesData";
import storeData from "../Stores/storeData";
import couponsData from "../Home/couponsData";
import { Link } from "react-router-dom";
import GeneralCoupon from "../../components/GeneralCoupon";
import StoreCouponsSection from "../../components/Sections/StoreCouponsSection/StoreCouponsSection";
import { Pagination } from "../../utils/Paginate";

const sliderSettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2, // Number of logos to show at a time
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, // Set the time in milliseconds between each scroll
  centerMode: false, // Change to true if you want the logos to be centered
  variableWidth: false, // Change to true if you want logos to have variable width
};

export default function CategoryPage(props) {
  const { categoryId } = useParams();
  const { subCatId } = useParams();
  const categoryID = Number.parseInt(categoryId);
  var subCatID = Number.parseInt(subCatId);

  const [currCouponPage, setCurrCouponPage] = useState(1);
  const [couponSection, setCouponSection] = useState("coupon");
  const [subCatsChecked, setSubCatsChecked] = useState(
    subCatID ? [subCatID] : []
  );

  const categoryData = categorieData.categories.find(
    (category) => categoryID === category.id
  );

  const categoryStores = storeData.filter((store) =>
    store.categoryIds.includes(categoryID)
  );

  const itemsPerPage = 20;
  const startIndex = (currCouponPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSubCatChange = (e) => {
    const value = Number.parseInt(e.target.value);

    if (subCatsChecked.includes(value)) {
      setSubCatsChecked((prev) => prev.filter((v) => v !== value));
    } else {
      setSubCatsChecked((prev) => [...prev, value]);
    }
  };

  const handlePageChange = (page) => {
    setCurrCouponPage(page);
  };

  const firstFilter = couponsData.filter((coupon) =>
    coupon.categoryIds.includes(categoryID)
  );

  const secondFilter = firstFilter.filter(
    (coupon) => coupon.type === couponSection.toLowerCase()
  );

  var finalCoupons = secondFilter;

  if (subCatsChecked.length !== 0) {
    finalCoupons = secondFilter.filter((coupon) =>
      coupon.subCategoryIds.some((value) => subCatsChecked.includes(value))
    );
  }

  const couponsToShow = finalCoupons.slice(startIndex, endIndex);
  const storesToShow = categoryStores.slice(0, 5);

  const subCategoryElements = categoryData.subcategories.map((subCategory) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="subCatsSelected"
          checked={subCatsChecked.includes(subCategory.id)}
          id={subCategory.id}
          value={subCategory.id}
          onChange={handleSubCatChange}
        />
        <label className="form-check-label" for={subCategory.id}>
          {subCategory.name}
        </label>
      </div>
    );
  });

  const storeElements = storesToShow.map((store) => {
    return (
      <div className="col-6">
        <Link to={`/stores/${store.id}`}>
          <img className="w-100" src={`/${store.img}`} alt="" />
        </Link>
      </div>
    );
  });

  const topCategoryCoupons = firstFilter.slice(0, 2);
  const topCategoryCouponElements = topCategoryCoupons.map((coupon) => {
    return <GeneralCoupon data={coupon} btn={false} />;
  });

  const couponSectionHandler = (event) => {
    event.preventDefault();
    setCouponSection(event.target.innerHTML.toLowerCase());
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="my-3">
          <h1 className="h1 mb-2 fw-bolder">{categoryData.name}</h1>
          <div className="d-flex gap-2 flex-wrap flex-lg-nowrap">
            {topCategoryCouponElements}
          </div>
        </div>

        <section className="container p-0">
          <div className="row">
            <div className="col-12 col-md-5 col-lg-4 py-3 container-fluid sidebarWrapper">
              <div className=" shadow rounded p-3 mb-4">
                <h3>SUBCATEGORIES</h3>
                <form>{subCategoryElements}</form>
              </div>
              <div className="shadow rounded p-3 mb-4">
                <h3>STORES</h3>
                <div className="row gx-5">{storeElements}</div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4 p-4">
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
              <StoreCouponsSection data={couponsToShow} />
              <div className="sticky-footer">
                <Pagination
                  totalItems={finalCoupons.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
