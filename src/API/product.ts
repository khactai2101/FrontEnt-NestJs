import axios from "axios";

const token = localStorage.getItem("accessToken");

export const createProductSize = (data: any) => {
  return axios
    .post(`https://nestjs-c3hh.onrender.com/api/v1/products/productSize`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};
export const createProduct = (data: any) => {
  return axios
    .post(`https://nestjs-c3hh.onrender.com/api/v1/products`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};
export const getAllProducts = (data: any) => {
  return axios
    .get("https://nestjs-c3hh.onrender.com/api/v1/products", {
      params: data,
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

export const BlockProducts = (data: any) => {
  return axios
    .put(
      `https://nestjs-c3hh.onrender.com/api/v1/products/block/${data.id}`,
      { status: data.status },
      {
        headers: { Authorization: `Bearer ${data.token}` },
      }
    )

    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const getOneProduct = (id: number) => {
  return axios
    .get(`https://nestjs-c3hh.onrender.com/api/v1/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};

export const updateProduct = (id: number, data: any) => {
  return axios
    .put(`https://nestjs-c3hh.onrender.com/api/v1/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};

export const deleteProductSize = (productsId: number, sizesId: any) => {
  return axios
    .delete(
      `https://nestjs-c3hh.onrender.com/api/v1/products/productSize/${productsId}/${sizesId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};
