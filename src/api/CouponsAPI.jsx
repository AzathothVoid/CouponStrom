import ApiService from "./ApiService";

export const addCopuon = async (data) => {
  const response = await ApiService.post("/add-coupon", data);

  if (response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};

export const getAllCoupons = async (dispatch) => {
  const response = await ApiService.get("/get-coupon");

  if (response.status === 200) {
    dispatch({ type: "LOAD_COUPONS", payload: response.data });
  } else {
    throw response;
  }
};

export const getCouponByCategory = async (setter, categoryID) => {
  const response = await ApiService.get("/get-coupon-by-cat", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getCouponBySubCategory = async (setter, subCategoryID) => {
  const response = await ApiService.get("/get-coupon-by-subcat", {
    params: subCategoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getCouponsByStore = async (setter, storeID) => {
  const response = await ApiService.get("/get-coupons-by-store", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};
