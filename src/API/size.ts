import axios from "axios";

const token = localStorage.getItem("accessToken");

export const getAllSize = (data: any, dataToken: any) => {
  return axios
    .get("http://localhost:9000/api/v1/sizes", {
      headers: {
        Authorization: `Bearer ${dataToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return error;
    });
};
export const createSize = (data: any) => {
  return axios
    .post(
      `http://localhost:9000/api/v1/sizes`,
      { size: data.size, percent: data.percent },
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

export const updateSize = (id: number, data: any) => {
  return axios
    .put(
      `http://localhost:9000/api/v1/sizes/${id}`,
      { size: data.size, percent: data.percent },
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

export const deleteSize = (id: any) => {
  return axios
    .delete(`http://localhost:9000/api/v1/sizes/${id}`, {
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

// export const getOneProduct = (id: number) => {
//   return axios
//     .get(`http://localhost:9000/api/v1/products/${id}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("Error!!!!", error);
//       throw error;
//     });
// };
