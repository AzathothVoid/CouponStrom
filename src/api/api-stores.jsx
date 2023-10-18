import axios from "axios";
import apiService from "./apiService";

export const getAllStores = async () => {
  apiService
    .get("/api/getStores")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStore = async (storeID) => {
  apiService
    .get(`/api/getStore/${storeID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
