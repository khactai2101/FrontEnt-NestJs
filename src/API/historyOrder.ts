import axios from "axios";

const token = localStorage.getItem("accessToken");

export const getAllHistoryByUser = (token: any) => {
  return axios
    .get("http://localhost:9000/api/v1/order/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error!!!!", error);
      return error;
    });
};

export const updateHistoryOrder = (id: number, status: any) => {
  return axios
    .put(
      `http://localhost:9000/api/v1/order/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error!!!!", error);
      return error;
    });
};
