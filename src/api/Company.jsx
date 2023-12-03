import ApiService from "./ApiService";

export const getCompanyInfo = async (dispatch) => {
  const response = await ApiService.get("/get-company-info");

  if (response.status === 200) {
    console.log("RESPONSE DATA: ", response.data);
    dispatch({ type: "LOAD_COMPANY_INFO", payload: response.data });
  } else {
    throw response;
  }
};

export const updateCompanyInfo = async (data) => {
  const response = await ApiService.post("/update-company-info", data);

  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw response;
  }
};
