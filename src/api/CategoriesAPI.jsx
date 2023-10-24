import ApiSerivce from "./ApiService";

export const addCategory = async (data) => {
  const response = await ApiSerivce.post("/add-product-category", data);

  if (response.status === 201) {
    return response.data;
  } else {
    console.log(response);
  }
};

export const getAllCategories = async (dispatch) => {
  const response = await ApiSerivce.get("/get-product-categories");

  if (response.status === 200) {
    dispatch({type: "LOAD_CATEGORIES", payload: response.data});
  }
};

export const getCategoryById = async (setter, categoryID) => {
  const response = await ApiSerivce.get("/get-product-category-byID", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getCategoryByStore = async (setter, storeID) => {
  const response = await ApiSerivce.get("/get-product-categories-byStore", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCategoriesByStore = async (setter, storeID) => {
  const response = await ApiSerivce.get("/get-product-subcategories-byStore", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCategoriesByCategory = async (setter, categoryID) => {
  const response = await ApiSerivce.get("/get-subcat-catid", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCategoriesByID = async (setter, categoryID) => {
  const response = await ApiSerivce.get("/get-product-SUBcategory-byID", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  }
};
