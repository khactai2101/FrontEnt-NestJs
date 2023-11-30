import axios from "axios";


export const getAllOrderByAdmin = (dataToken: any) => {
  return axios
    .get("http://localhost:9000/api/v1/order", {
      headers: { Authorization: `Bearer ${dataToken}` },
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error!!!!", error);
      return error;
    });
};
