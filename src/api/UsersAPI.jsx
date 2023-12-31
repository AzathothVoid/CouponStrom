import React from "react";
import ApiService from "./ApiService";

export const UserLogin = async (email, password) => {
  const loginInfo = { email: email, password: password };

  console.log("LoginInfo: ", loginInfo);

  const response = await ApiService.post(`/login`, loginInfo);

  if (response.status === 200) {
    return response.data;
  } else {
    throw "UnAuthorized Access";
  }
};

export const userRegistration = async (data) => {
  const registrationInfo = {
    name: data.name,
    email: data.email,
    category_id: data.category_id,
    password: data.password,
    password_confirmation: data.confirmPassword,
  };

  const response = await ApiService.post(`/add-user`, registrationInfo);

  if (response.status === 201 || response.status === 200) {
    return response;
  } else {
    throw response;
  }
};

export const userLogout = async () => {
  const response = await ApiService.get(`/logout`);

  if (response.status === 200) {
    return response.data;
  } else {
    throw response;
  }
};

export const verifyEmail = async (data) => {
  const response = await ApiService.post(`/verify-email`, data);

  if (response.status === 200) {
    return response;
  } else if (response.status === 500) {
    return response.data.data.message;
  } else {
    console.log("ERROR: ", response);
  }
};

export const getUsers = async (setter, userID) => {
  const response = await ApiService.get("/get-users", userID);

  if (response.status === 200) {
    setter(response.data);
  } else {
    throw response.data.error;
  }
};
