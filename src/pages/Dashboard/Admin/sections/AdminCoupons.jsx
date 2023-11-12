import React, { useEffect } from "react";
import Navigation from "../../Navigation";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  addCoupon,
  deleteCouponById,
  getAllCoupons,
} from "../../../../api/CouponsAPI";
import {
  getCategoryByStore,
  getSubCategoriesByCategory,
} from "../../../../api/CategoriesAPI";
import {
  useDataState,
  useDataDispatch,
} from "../../../../components/Data/DataContext";
import { formatDate } from "../../../../utils/DateUtils";

export default function AdminCoupons(props) {
  const useData = useDataState();
  const dataDispatch = useDataDispatch();
  const storesData = useData.stores;
  const couponsData = useData.coupons;

  const [show, setShow] = useState(false);
  const [callDelete, setCallDelete] = useState(null);

  const [categoriesDataByStore, setCategoriesDataByStore] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [showStoreId, setShowStoreId] = useState("");

  const [couponCategory, setCouponCategory] = useState("");
  const [couponSubCategory, setCouponSubCategory] = useState("");

  const currDate = formatDate(new Date());

  let couponsToShow = couponsData;

  const [formData, setFormData] = useState({
    title: "",
    store: "",
    expiry: "",
    category: [],
    sub_category: [],
    deal: "",
    code: "",
    details: "",
  });

  useEffect(() => {
    if (formData.store) {
      getCategoryByStore(setCategoriesDataByStore, {
        "store-id": Number.parseInt(formData.store[1]),
      });
    }
  }, [formData.store]);

  useEffect(() => {
    if (callDelete) {
      try {
        const response = deleteCouponById({ id: callDelete }).then(
          (response) => {
            window.location.reload();
          }
        );
        console.log(response);
      } catch (error) {}
    }
  }, [callDelete]);

  useEffect(() => {
    if (couponCategory) {
      getSubCategoriesByCategory(setSubCategoriesData, {
        "category-id": Number.parseInt(couponCategory[1]),
      });
    }
  }, [couponCategory]);

  const handleClose = () => {
    setCouponCategory("");
    setCouponSubCategory("");
    setFormData({
      title: "",
      store: "",
      expiry: "",
      category: [],
      sub_category: [],
      deal: "",
      code: "",
      details: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const deleteCategory = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        category: formData.category.filter((cat) => cat !== e.target.innerHTML),
      };
    });
  };

  const deleteSubCategory = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        sub_category: formData.sub_category.filter(
          (cat) => cat !== e.target.innerHTML
        ),
      };
    });
  };

  const deleteCoupon = (e, couponID) => {
    e.preventDefault();
    setCallDelete(couponID);
  };

  const showPopUp = (e, couponId) => {
    e.stopPropagation();

    const details = document.getElementById(`details${couponId}`);

    details.classList.toggle("show");
  };

  const showStoreElements = storesData.map((store) => {
    return (
      <option key={store.id} value={[store.name, store.id]}>
        {store.name}
      </option>
    );
  });

  if (showStoreId.length > 1) {
    console.log("Filtering data: ", showStoreId);
    couponsToShow = couponsData.filter(
      (coupon) => coupon.store === showStoreId[1]
    );
    console.log("Coupons to show: ", couponsToShow);
  }

  const couponElements = couponsToShow.map((coupon) => {
    console.log("Coupons: ", coupon);
    return (
      <div className="my-4 row object">
        <div className="col-xl-3 col-lg-3 img">
          <img
            className=""
            src={coupon.images[0].image}
            alt=""
            width="180"
            height="110"
          ></img>
        </div>

        <div className="col-xl-6 col-lg-6 container p-2 text-dark">
          <div className="couponDescription lead fs-4 my-1">{coupon.name}</div>
          <div className="couponExpiry text-muted mb-1">
            Expires {coupon.expiry}
          </div>
          <div style={{ width: "fit-content" }} className="position-relative">
            <div
              className="couponDetails display-5  popupBtn"
              onClick={(e) => showPopUp(e, coupon.id)}
            >
              Details:
              <i className="bi bi-arrow-down-circle" id="detailsArrowIcon"></i>
            </div>
            <p
              id={`details${coupon.id}`}
              className="popupText mt-3 fs-6 position-absolute"
            >
              {coupon.details}
            </p>
          </div>
        </div>

        <div className="col-xl-3 col-lg-3 d-flex align-items-start justify-content-end p-2 container">
          <button onClick={(e) => deleteCoupon(e, coupon.id)} className="btn">
            <i className="bi bi-trash-fill fs-2"></i>
          </button>
        </div>
      </div>
    );
  });

  const storeSelectElements = storesData.map((store) => {
    console.log(store);
    return (
      <option key={store.id} value={[store.name, store.id]}>
        {store.name}
      </option>
    );
  });

  const categorySelectElements = categoriesDataByStore.map((category) => {
    return (
      <option key={category[0].id} value={[category[0].name, category[0].id]}>
        {category[0].name}
      </option>
    );
  });

  const subCategorySelectElements = subCategoriesData.map((subCategory) => {
    return (
      <option key={subCategory.id} value={[subCategory.name, subCategory.id]}>
        {subCategory.name}
      </option>
    );
  });

  const blockElementsCategory = formData.category.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light categoryAdd"
      >
        <span onClick={deleteCategory} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const blockElementsSubcategory = formData.sub_category.map((block) => {
    return (
      <div
        key={block}
        className="d-inline-flex bg-secondary border border-dark p-1 m-1 text-light subCategoryAdd"
      >
        <span onClick={deleteSubCategory} className="bi bi-trash">
          {block}
        </span>
      </div>
    );
  });

  const addCategory = (e) => {
    if (!couponCategory) return;
    if (formData.category.find((block) => block === couponCategory[0])) return;
    setFormData((prev) => {
      return { ...prev, category: [...prev.category, couponCategory[0]] };
    });
  };

  const addSubcategory = (e) => {
    if (!couponSubCategory) return;
    if (formData.sub_category.find((block) => block === couponSubCategory[0]))
      return;
    setFormData((prev) => {
      return {
        ...prev,
        sub_category: [...prev.sub_category, couponSubCategory[0]],
      };
    });
    if (formData.category.find((block) => block === couponCategory[0])) return;

    setFormData((prev) => {
      return {
        ...prev,
        category: [...prev.category, couponCategory[0]],
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "store") {
      const split = value.split(",");
      setFormData((prev) => {
        return {
          ...formData,
          [name]: split,
        };
      });
      return;
    }

    setFormData((prev) => {
      return { ...formData, [name]: value };
    });
  };

  const handleCouponCategoryChange = (e) => {
    setCouponCategory(e.target.value.split(","));
  };

  const handleCouponSubCategoryChange = (e) => {
    setCouponSubCategory(e.target.value.split(","));
  };

  const handleCouponStoreChange = (e) => {
    setShowStoreId(e.target.value.split(","));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submission = new FormData();

    if (formData.category.length === 0 || formData.sub_category.length === 0) {
      alert("Enter atleast one Category and sub category");
      return;
    }

    submission.append("name", formData.title);
    submission.append("store", formData.store[1]);
    submission.append("expiry", formData.expiry);
    for (let i = 0; i < formData.category.length; i++) {
      submission.append("category[]", formData.category[i]);
    }
    for (let i = 0; i < formData.sub_category.length; i++) {
      submission.append("sub_category[]", formData.sub_category[i]);
    }
    submission.append("details", formData.details);
    if (formData.deal.length > 0) {
      submission.append("deal", formData.deal);
      submission.append("type", "deal");
    } else {
      submission.append("code", formData.code);
      submission.append("type", "coupon");
    }

    try {
      addCoupon(submission).then((response) => {
        getAllCoupons(dataDispatch);
      });
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  return (
    <>
      <div className="container">
        <Navigation
          sections={props.sections}
          setSection={props.setSection}
          section={props.section}
        />

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
            <Form.Group className="row mb-3 col-6 ">
              <Form.Select
                name="stores"
                size="6"
                className="mb-2"
                id="showStore"
                value={showStoreId}
                onChange={handleCouponStoreChange}
                placeholder="Select Category"
              >
                <option value="" selected>
                  Show all coupons
                </option>
                {showStoreElements}
              </Form.Select>
            </Form.Group>
          </div>
          {couponElements}
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
                size="6"
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
                min={currDate}
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
                disabled={formData.deal}
              />
              <Form.Label>Deal</Form.Label>
              <Form.Control
                value={formData.deal}
                name="deal"
                onChange={handleInputChange}
                className="mb-4"
                type="url"
                id="deal"
                disabled={formData.code}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Select
                name="category"
                className="mb-2"
                size="6"
                id="category"
                value={couponCategory}
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
                value={couponSubCategory}
                size="6"
                onChange={handleCouponSubCategoryChange}
                name="sub_category"
                className="mb-2"
                id="subCategory"
              >
                <option value="" disabled selected>
                  Select a subcategory
                </option>
                {subCategorySelectElements}
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
          <Button variant="primary" type="submit" form="couponForm">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
