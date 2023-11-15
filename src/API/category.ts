import axios from "axios";

const token = localStorage.getItem("accessToken");

export const getAllCategories = (data: any, dataToken: any) => {
  return axios
    .get("http://localhost:9000/api/v1/categories", {
      params: data,
      headers: { Authorization: `Bearer ${dataToken}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return error;
    });
};
export const createCategories = (data: any) => {
  return axios
    .post(
      `http://localhost:9000/api/v1/categories`,
      { category: data },
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

export const updateCategories = (id: number, data: any) => {
  return axios
    .put(
      `http://localhost:9000/api/v1/categories/${id}`,
      { category: data },
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

export const deleteCategories = (id: any) => {
  return axios
    .delete(`http://localhost:9000/api/v1/categories/${id}`, {
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
