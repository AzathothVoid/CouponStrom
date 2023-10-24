import React, { useEffect } from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addCopuon, getAllCoupons } from "../../../../api/CouponsAPI";
import { useAuth } from "../../../../components/Auth/AuthContext";
import { useDataState } from "../../../../components/Data/DataContext";

export default function AdminCoupons(props) {
  const useData = useDataState();
  const storeData = useData.stores;
  const couponData = useData.coupons;
  const categoryData = useData.categories;

  const [show, setShow] = useState(false);
  const [blocksCategory, setBlocksCategory] = useState([]);
  const [blocksSubcategory, setBlocksSubcategory] = useState([]);

  const [couponCategory, setCouponCategory] = useState("");
  const [couponSubCategory, setCouponSubCategory] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    store: "",
    expiry: "",
    category: [],
    sub_category: [],
    deal: "",
    code: "",
    details: "",
    image: "",
  });

  console.log("Form Data: ", formData);

  // const [couponTitle, setCouponTitle] = useState("");
  // const [couponDetails, setCouponDetails] = useState("");
  // const [couponExpiryData, setCouponExpiryData] = useState();
  // const [couponStore, setCouponStore] = useState();
  // const [couponCode, setCouponCode] = useState("");
  // const [couponDeal, setCouponDeal] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("Stores: ", storeData);

  const storeSelectElements = storeData.map((store) => {
    return (
      <option key={store.id} value={[store.name, store.id]}>
        {store.name}
      </option>
    );
  });

  const categorySelectElements = categoryData.map((category) => {
    return (
      <option key={category.id} value={[category.name, category.id]}>
        {category.name}
      </option>
    );
  });

  const blockElementsCategory = blocksCategory.map((block) => {
    return (
      <div
        key={store.id}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd"
      >
        {" "}
        {block}{" "}
      </div>
    );
  });

  const blockElementsSubcategory = blocksSubcategory.map((block) => {
    return (
      <div
        key={store.id}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd"
      >
        {" "}
        {block}{" "}
      </div>
    );
  });

  const addCategory = (e) => {
    const data = e.target.parentElement.parentElement.firstChild.value;

    if (blocksCategory.find((block) => block === data)) return;
    setBlocksCategory((prev) => [
      ...prev,
      e.target.parentElement.parentElement.firstChild.value,
    ]);
  };

  const addSubcategory = (e) => {
    const data = e.target.parentElement.parentElement.firstChild.value;

    if (blocksSubcategory.find((block) => block === data)) return;
    setBlocksSubcategory((prev) => [
      ...prev,
      e.target.parentElement.parentElement.firstChild.value,
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let change = value;

    if (name === "store") {
      change = value.split(",");
    }

    console.log("Values: ", change);

    setFormData((prev) => {
      return { ...formData, [name]: change };
    });
  };

  const handleCouponCategoryChange = (e) => {
    setCouponCategory(e.target.value.split(","));
  };

  const handleCouponSubCategoryChange = (e) => {
    setCouponSubCategory(e.target.value.split(","));
  };

  // const handleCouponDetailsChange = (e) => {
  //   setCouponDetails(e.target.value);
  // };

  // const handleCouponCodeChange = (e) => {
  //   setCouponCode(e.target.value);
  // };

  // const handleCouponDealChange = (e) => {
  //   setCouponDeal(e.target.value);
  // };

  // const handleCouponExpiryDate = (e) => {
  //   setCouponExpiryData(e.target.value);
  // };

  // const handleCouponStoreChange = (e) => {
  //   setCouponStore(e.target.value);
  // };

  const handleSubmit = (event) => {
    var title = document.getElementById("title").value;
    var store = document.getElementById("store").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var code = document.getElementById("code").value;
    var deal = document.getElementById("deal").value;
    var details = document.getElementById("details").value;

    var cats = document.querySelectorAll(".categoryAdd");
    var subCats = document.querySelectorAll(".subCategoryAdd");

    cats.forEach((el) => {
      console.log(el.innerHTML);
    });

    subCats.forEach((el) => {
      console.log(el.innerHTML);
    });

    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        <Navigation setSection={props.setSection} section={props.section} />

        <div className="container border border-warning mainSection px-4">
          <div className="container py-4">
            <button
              className="btn py-0 btn-outline-secondary lead d-flex align-items-center"
              onClick={handleShow}
            >
              <i className="bi bi-plus fs-4"></i>ADD COUPON
            </button>
          </div>

          <div className="container py-2">
            <div className="dropdown">
              <button
                className="col-4 btn btn-outline-secondary lead dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SELECT STORE
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
                <li>
                  <a className="dropdown-item" href="#"></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="container mb-4">
            <div className="container objectContainer">
              <div className="my-4 row object">
                <div className="col-xl-3 col-lg-3 img">
                  <img
                    className=""
                    src={""}
                    alt=""
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="couponDescription lead fs-4 my-1">
                    Shop Popular Items for up to 70% Off
                  </div>
                  <div className="couponExpiry text-muted mb-1">
                    Expires Mar 31
                  </div>
                  <div
                    className="couponDetails display-5 popupBtn"
                    onClick="showPopup()"
                  >
                    Details:
                    <i
                      className="bi bi-arrow-down-circle"
                      id="detailsArrowIcon"
                    ></i>
                    <span className="popupText">details lao laka</span>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>

              <div className="my-4 row object">
                <div className="col-xl-3 col-lg-3 img">
                  <img
                    className=""
                    src={""}
                    alt=""
                    width="180"
                    height="110"
                  ></img>
                </div>

                <div className="col-xl-6 col-lg-6 container p-2 text-dark">
                  <div className="couponDescription lead fs-4 my-1">
                    Shop Popular Items for up to 70% Off
                  </div>
                  <div className="couponExpiry text-muted mb-1">
                    Expires Mar 31
                  </div>
                  <div
                    className="couponDetails display-5 popupBtn"
                    onClick="showPopup()"
                  >
                    Details:
                    <i
                      className="bi bi-arrow-down-circle"
                      id="detailsArrowIcon"
                    ></i>
                    <span className="popupText">details lao laka</span>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
                  <button className="btn">
                    <i className="bi bi-trash-fill fs-2"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD COUPON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="couponForm">
            <Form.Group className="mb-4">
              <Form.Label>Coupon Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                name="title"
                autoFocus
                size="lg"
                id="title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                value={formData.store}
                onChange={handleInputChange}
                name="store"
                id="store"
                required
              >
                <option value="" disabled selected>
                  Select a store
                </option>
                {storeSelectElements}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                value={formData.expiry}
                onChange={handleInputChange}
                name="expiry"
                type="date"
                id="expiryDate"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                value={formData.code}
                onChange={handleInputChange}
                name="code"
                className="mb-4"
                type="text"
                id="code"
                disabled={formData.deal.length > 0}
              />
              <Form.Label>Deal</Form.Label>
              <Form.Control
                value={formData.deal}
                name="deal"
                onChange={handleInputChange}
                className="mb-4"
                type="text"
                id="deal"
                disabled={formData.code.length > 0}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                name="category"
                className="mb-2"
                id="category"
                value={formData.category}
                onChange={handleCouponCategoryChange}
                required
              >
                <option value="" disabled selected>
                  Select a category
                </option>
                {categorySelectElements}
              </Form.Select>

              <div className="container categoryContainer">
                <Button
                  variant="outline-secondary"
                  className="justify-content-center"
                  onClick={addCategory}
                >
                  +
                </Button>
                {blockElementsCategory}
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                value={formData.sub_category}
                onChange={handleCouponSubCategoryChange}
                name="sub_category"
                className="mb-2"
                id="subCategory"
              >
                <option value="" disabled selected>
                  Select a subcategory
                </option>
                {/* {subCategorySelectElements} */}
              </Form.Select>

              <div className="container subcategoryContainer">
                <Button
                  variant="outline-secondary"
                  className="justify-content-center"
                  onClick={addSubcategory}
                >
                  +
                </Button>
                {blockElementsSubcategory}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                className="mb-3"
                as="textarea"
                name="details"
                rows={4}
                id="details"
                value={formData.details}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            form="couponForm"
            onClick={handleClose}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
