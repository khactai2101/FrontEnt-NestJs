import axios from "axios";

const token = localStorage.getItem("accessToken");

export const getAllAddress = (token: any) => {
  return axios
    .get("http://localhost:9000/api/v1/addresses/me", {
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
      `http://localhost:9000/api/v1/addresses`,
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
