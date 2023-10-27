import ApiService from "./ApiService";

export const addBlog = async (data) => {
  const response = await ApiService.post("/add-blog", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response === 201) {
    return response.data;
  }
};

export const getBlogs = async (dispatch) => {
  const response = await ApiService.get("/get-blog");

  if (response.status === 200) {
    dispatch({ type: "LOAD_BLOGS", payload: response.data });
  } else {
    throw response;
  }
};