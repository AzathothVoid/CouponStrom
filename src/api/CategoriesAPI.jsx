import ApiSerivce from "./ApiService";

export const addCategory = async (data) => {
  const response = await ApiSerivce.post("/add-product-category", data);

  if (response.status === 201) {
    return response.data;
  } else {
    console.log(response);
  }
};
