import React from "react";
import ApiService from "./ApiService";

export const UserLogin = async (email, password) => {
  const loginInfo = { email: email, password: password };

  const response = await ApiService.post(`/login`, loginInfo);

  if (response.status === 200) {
    return response.data;
  } else {
    console.log(response);
  }
};

export const userRegistration = async (
  name,
  email,
  password,
  confirmPassword
) => {
  const registrationInfo = {
    name: name,
    email: email,
    category_id: 2,
    password: password,
    password_confirmation: confirmPassword,
  };

  console.log("Registration info: ", registrationInfo);

  const response = await ApiService.post(`/add-user`, registrationInfo);

  if (response.status === 201) {
    return { response: "Registration Successful" };
  } else {
    console.log("Error");
  }
};
