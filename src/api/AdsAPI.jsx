import ApiService from "./ApiService";

export const addAd = async (data) => {
  const response = await ApiService.post("/add-ad", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response === 201) {
    return response.data;
  }
};

export const getAd = async (dispatch) => {
  const response = await ApiService.get("/get-ad");

  if (response.status === 200) {
    dispatch({ type: "LOAD_ADS", payload: response.data });
  } else {
    throw response;
  }
};
