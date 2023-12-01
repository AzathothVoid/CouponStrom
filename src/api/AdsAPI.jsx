import ApiService from "./ApiService";

export const addAd = async (data) => {
  const response = await ApiService.post("/add-ad", data);

  if (response === 201) {
    return response.data;
  } else {
    throw response;
  }
};

export const updateBlog = async (data) => {
  const response = await ApiService.post("/update-ad", data);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
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

export const deleteAdById = async (adID) => {
  const response = await ApiService.post("/delete-ad", adID);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};
