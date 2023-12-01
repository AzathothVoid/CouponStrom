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

export const updateBlog = async (data) => {
  const response = await ApiService.post("/update-blog", data);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
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

export const getBlogs2 = async (setter) => {
  const response = await ApiService.get("/get-blog");

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response;
  }
};

export const getBlogByID = async (blogID) => {
  const response = await ApiService.get("/get-blog-by-ID", {
    params: blogID,
  });

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const deleteBlogById = async (blogID) => {
  console.log("Blog to delete: ", blogID);
  const response = await ApiService.post("/delete-blog", blogID);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};
