import ApiService from "./ApiService";

export const addCategory = async (data) => {
  const response = await ApiService.post("/add-product-category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === 201) {
    return response.data;
  } else {
    throw error;
  }
};

export const updateCategory = async (data) => {
  const response = await ApiService.post("/update-product-category", data);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const getAllCategories = async (dispatch) => {
  const response = await ApiService.get("/get-product-categories");

  if (response.status === 200) {
    dispatch({ type: "LOAD_CATEGORIES", payload: response.data });
  }
};

export const getCategoryById = async (categoryID) => {
  const response = await ApiService.get("/get-product-category-byID", {
    params: categoryID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const getCategoryByStore = async (setter, storeID) => {
  const response = await ApiService.get("/get-product-categories-byStore", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCategoriesByStore = async (setter, storeID) => {
  const response = await ApiService.get("/get-product-subcategories-byStore", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data[0]);
  } else {
    throw response;
  }
};

export const getSubCategoriesByCategory = async (setter, categoryID) => {
  const response = await ApiService.get("/get-subcat-catid", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCatsByStoreAndCategory = async (setter, data) => {
  const response = await ApiService.get("/get-subcat-by-catid-and-storeid", {
    params: data,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getSubCategoriesByID = async (setter, categoryID) => {
  const response = await ApiService.get("/get-product-SUBcategory-byID", {
    params: categoryID,
  });

  if (response.status === 200) {
    setter(response.data);
  }
};

export const deleteCategoryById = async (categoryID) => {
  const response = await ApiService.post(
    "/delete-product-category",
    categoryID
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const likeCategory = async (categoryID) => {
  const response = await ApiService.post("/like-category", categoryID);

  if (response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};
