import ApiService from "./ApiService";

export const addCoupon = async (data) => {
  const response = await ApiService.post("/add-coupon", data);

  if (response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};

export const updateCoupon = async (data) => {
  const response = await ApiService.post("/update-coupon", data);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const changeCouponRating = async (data) => {
  const response = await ApiService.post("/change-coupon-rating", data);

  if (response.status === 200) {
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

export const getCouponByCategory = async (categoryID) => {
  const response = await ApiService.get("/get-coupon-by-cat", {
    params: categoryID,
  });

  if (response.status === 200) {
    return response.data;
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

export const getCouponsByStore = async (storeID) => {
  const response = await ApiService.get("/get-coupons-by-store", {
    params: storeID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const deleteCouponById = async (couponID) => {
  const response = await ApiService.get("/delete-coupon", {
    params: couponID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const likeCoupon = async (couponID) => {
  const response = await ApiService.post("like-coupon", couponID);

  if (response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};

export const getCouponByID = async (couponID) => {
  const response = await ApiService.get("/get-coupon-byID", {
    params: couponID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};
