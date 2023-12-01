import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import GeneralCoupon from "../../components/GeneralCoupon";
import StoreCouponsSection from "../../components/Sections/StoreCouponsSection/StoreCouponsSection";
import { Pagination } from "../../utils/Paginate";
import { getCategoryById } from "../../api/CategoriesAPI";
import { getCouponByCategory } from "../../api/CouponsAPI";
import BlogsSection from "../../components/Sections/BlogsSection/BlogsSection";
import Loader from "../../components/Loader/Loader";
import { Helmet } from "react-helmet";

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
  const [categoryData, setCategoryData] = useState(null);
  const [couponsData, setCouponsData] = useState([]);

  useEffect(() => {
    try {
      getCategoryById({ "category-id": categoryID }).then((response) => {
        setCategoryData(response);
      });
    } catch (error) {}
  }, [categoryId]);

  useEffect(() => {
    if (categoryData) {
      try {
        getCouponByCategory({ "category-id": categoryID }).then((response) => {
          console.log("Coupon Response: ", response);
          setCouponsData(response);
        });
      } catch (error) {}
    }
  }, [categoryId, categoryData]);

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

  const firstFilter = couponsData.filter((coupon) => {
    return coupon.type === couponSection.toLowerCase();
  });

  var finalCoupons = firstFilter;

  if (subCatsChecked.length !== 0) {
    finalCoupons = firstFilter.filter((coupon) =>
      coupon.subcategories.some((value) =>
        subCatsChecked.includes(value.subcategory.id)
      )
    );
  }

  const couponsToShow = finalCoupons.slice(startIndex, endIndex);

  let storesToShow = [];
  let subCategoryElements = [];

  let keywords;

  if (categoryData) {
    keywords = [categoryData.name];
    categoryData.subcategories.map((subcategory) => {
      keywords.push(subcategory.name);
    });
  }

  if (categoryData) storesToShow = categoryData.stores.slice(0, 5);

  if (categoryData)
    subCategoryElements = categoryData.subcategories.map((subCategory) => {
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
      <div style={{ maxWidth: "150px" }} className="col-6 mb-5">
        <Link to={`/stores/${store.store.id}`}>
          <img className="w-100" src={store.store.images[0].image} alt="" />
        </Link>
      </div>
    );
  });

  const topCategoryCoupons = couponsData.slice(0, 2);
  const topCategoryCouponElements = topCategoryCoupons.map((coupon) => {
    return <GeneralCoupon data={coupon} />;
  });

  const couponSectionHandler = (event) => {
    event.preventDefault();
    setCouponSection(event.target.innerHTML.toLowerCase());
  };

  return (
    <>
      {categoryData ? (
        <>
          <Helmet>
            <title>{`${categoryData.name}-Coupons Strom`}</title>
            <meta
              name="description"
              content={`Get free discounted deals and coupons in the  ${categoryData.name} category. Find all your coupons for your favorite stores`}
            />
            <meta name="keywords" content={categoryData.keywords} />

            <meta
              property="og:title"
              content={`${categoryData.name}-Coupons Strom`}
            />
            <meta
              property="og:description"
              content={`Get free discounted deals and coupons in the  ${categoryData.name} category. Find all your coupons for your favorite stores`}
            />
            <meta property="og:image" content="/logo.svg" />
            <meta property="og:url" content={`${window.location.href}`} />
            <link rel="canonical" href={import.meta.env.VITE_WEBSITE_URL} />
            <link rel="shortLink" href={import.meta.env.VITE_WEBSITE_URL} />
          </Helmet>
          <Header />
          <div className="container">
            <div className="my-4">
              <div className="d-flex align-items-center h1 mb-2 fw-bolder">
                <div
                  className="me-3"
                  style={{
                    width: "35px",
                  }}
                >
                  {categoryData.images.length > 0 ? (
                    <img
                      className="w-100"
                      src={categoryData.images[0].image}
                      alt=""
                    />
                  ) : null}
                </div>
                <h1 className="">{categoryData.name}</h1>
              </div>
              <div className="d-flex gap-2 flex-wrap flex-lg-nowrap">
                {topCategoryCouponElements}
              </div>
            </div>

            <section className="container p-0">
              <div className="row">
                <div className="col-12 col-md-5 col-lg-4 py-3 container-fluid sidebarWrapper">
                  <div
                    style={{ maxWidth: "300px" }}
                    className=" shadow rounded p-3 mb-4"
                  >
                    <h3 className="mb-2">Subcategories</h3>
                    <form>{subCategoryElements}</form>
                  </div>
                  <div
                    style={{ maxWidth: "300px" }}
                    className="shadow rounded p-3 mb-4"
                  >
                    <h3 className="mb-2">Stores</h3>
                    <div className="row gx-5 align-items-center">
                      {storeElements}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-7 col-lg-8 mb-4 p-4">
                  <section className="container p-0">
                    <div className="d-flex gap-0 mb-2">
                      <span>
                        <button
                          onClick={couponSectionHandler}
                          className={`btn-custom fs-4 ${
                            couponSection === "coupon"
                              ? "btn-active-primary"
                              : null
                          }`}
                        >
                          COUPON
                        </button>
                      </span>
                      <span>
                        <button
                          onClick={couponSectionHandler}
                          className={`btn-custom fs-4 ${
                            couponSection === "deal"
                              ? "btn-active-primary"
                              : null
                          }`}
                        >
                          DEAL
                        </button>
                      </span>
                    </div>
                  </section>
                  {console.log("Coupons to show, store page: ", couponsToShow)}
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
