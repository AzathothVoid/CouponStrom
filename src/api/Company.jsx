import ApiService from "./ApiService";

export const getCompanyInfo = async () => {
  const response = await ApiService.get("/get-company-info");

  if (response === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const updateCompanyInfo = async (data) => {
  const response = await ApiService.post("/update-company-info", data);

  if (response === 200 || response === 201) {
    return response.data;
  } else {
    throw response;
  }
};
