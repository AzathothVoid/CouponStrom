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

export const getStoreById = async (storeID) => {
  const response = await ApiService.get("/get-store-by-ID", {
    params: storeID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const getStoreByCategory = async (categoryID) => {
  const response = await ApiService.get("/get-store-by-category", {
    params: categoryID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const getStoreBySubCategory = async (subCategoryID) => {
  const response = await ApiService.get("/get-store-by-Subcategory", {
    params: subCategoryID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const deleteStoreById = async (storeID) => {
  const response = await ApiService.post("/delete-stores", storeID);

  if (response.status === 200) {
    console.log(response);
    return response.data;
  } else {
    throw response;
  }
};

export const likeStore = async (storeID) => {
  const response = await ApiService.post("like-store", storeID);

  if (response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};
