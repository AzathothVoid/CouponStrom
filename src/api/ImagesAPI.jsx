import ApiService from "./ApiService";

export const getImage = async (path) => {
  const response = await ApiService.get("/get-image", {
    params: { imageurl: path },
  });

  if (response.status === 200) {
    return response;
  } else {
    throw response.data;
  }
};
