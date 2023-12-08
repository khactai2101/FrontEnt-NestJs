import axios from "axios";

const token = localStorage.getItem("accessToken");

export const getAllAddress = (token: any) => {
  return axios
    .get("https://nestjs-c3hh.onrender.com/api/v1/addresses/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return error;
    });
};

export const createAddress = (data: any) => {
  return axios
    .post(
      `https://nestjs-c3hh.onrender.com/api/v1/addresses`,
      { address: data.address, phoneNumber: data.phoneNumber },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return error;
    });
};
