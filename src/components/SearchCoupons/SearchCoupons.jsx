import React, { useState, useEffect } from "react";
import { getStoreByCategory } from "../../api/StoresAPI";
import { useDataState } from "../Data/DataContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function SearchCoupons() {
  const useData = useDataState();
  const categories = useData.categories;
  const navigate = useNavigate();

  const [couponType, setCouponType] = useState("");
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (category) {
      try {
        getStoreByCategory({ "category-id": category[1] }).then((response) => {
          setStores(response);
        });
      } catch (error) {}
    }
  }, [category]);

  const categorySelectElements = categories.map((category) => {
    return (
      <option key={category.id} value={[category.name, category.id]}>
        {category.name}
      </option>
    );
  });

  const storeSelectElements = stores.map((store) => {
    return (
      <option key={store.id} value={[store.name, store.id]}>
        {store.name}
      </option>
    );
  });

  const handleStoreChange = (e) => {
    setStore(e.target.value.split(","));
  };

  const handleCategoryChange = (e) => {
    setStore("");
    setCategory(e.target.value.split(","));
  };

  const handleCodeCouponChange = (e) => {
    setCouponType("coupon");
  };

  const handleDealCouponChange = (e) => {
    setCouponType("deal");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/coupons/${category[0]}/${store[0]}/${couponType}`);
  };

  return (
    <section className="container shadow p-4 rounded">
      <h4 className="h4 border-bottom pb-3 mb-3">Search Coupons</h4>
      <div className="d-flex gap-2">
        <button
          type="button"
          className={`btn-custom w-100 my-b d-flex flex-column align-items-center ${
            couponType === "coupon" ? "border-primary-custom" : null
          }`}
          onClick={handleCodeCouponChange}
        >
          <img className="w-50" src="/coupon.png" alt="" />
          <span className="fw-bold">Codes</span>
        </button>
        <button
          type="button"
          className={`btn-custom w-100  my-b d-flex flex-column align-items-center ${
            couponType === "deal" ? "border-primary-custom" : null
          }`}
          onClick={handleDealCouponChange}
        >
          <img className="w-50" src="/deal.png" alt="" />
          <span className="fw-bold">Deals</span>
        </button>
      </div>
      <div className="d-flex">
        <Form onSubmit={handleSubmit} className="w-100">
          <Form.Group className="d-flex justify-flex-between gap-4 my-4">
            <Form.Select
              name="category"
              id="couponSelectCateogry"
              value={category}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled selected>
                -Select-
              </option>
              {categorySelectElements}
            </Form.Select>

            <Form.Select
              name="store"
              id="couponSelectStore"
              value={store}
              onChange={handleStoreChange}
              required
            >
              <option value="" disabled selected>
                -Select-
              </option>
              {storeSelectElements}
            </Form.Select>
          </Form.Group>

          <Button
            variant="outline-secondary"
            type="submit"
            className="justify-content-center w-100 bg-primary-custom text-white my-b border-0"
          >
            Search
          </Button>
        </Form>
      </div>
    </section>
  );
}
