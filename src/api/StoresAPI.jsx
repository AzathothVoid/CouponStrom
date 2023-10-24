import axios from "axios";
import ApiService from "./ApiService";

export const addStore = async (store) => {
  const response = await ApiService.post("/add-store", store, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === 201) {
    return { response: "Store Added Successfully" };
  } else {
    return { response: "Error" };
  }
};

export const getAllStores = async (dispatch) => {
  const response = await ApiService.get("/get-stores");

  if (response.status === 200) {
    dispatch({ type: "LOAD_STORES", payload: response.data });
  } else {
    throw response;
  }
};

export const getStoreById = async (setter, storeID) => {
  const response = await ApiService.get("/get-store-by-ID", {
    params: storeID,
  });

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getStoreByCategory = async (setter, categoryID) => {
  const response = await ApiService.get("/get-store-by-category", {
    params: categoryID,
  });

  if (response.status === 200) {
    console.log(response);
    setter(response.data[0]);
  } else {
    throw response;
  }
};

export const getStoreBySubCategory = async (setter, subCategoryID) => {
  const response = await ApiService.get("/get-store-by-Subcategory", {
    params: subCategoryID,
  });

  if (response.status === 200) {
    console.log(response);
    setter(response.data[0]);
  } else {
    throw response;
  }
};
