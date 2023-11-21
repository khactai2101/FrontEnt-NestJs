import axios from "axios";
import BaseAxios from "./axiosClient";

const token = localStorage.getItem("accessToken");

export const getAllUsers = (data: any, dataToken: any) => {
  return axios
    .get("http://localhost:9000/api/v1/user", {
      params: data,
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
export const getOneUser = (token: any) => {
  return axios
    .get(`http://localhost:9000/api/v1/user/me`, {
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

export const changeStatusUser = (req: any) => {
  return axios
    .put(
      `http://localhost:9000/api/v1/user/updateStatus/${req.id}`,
      { status: req.status },
      {
        headers: { Authorization: `Bearer ${req.token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};
export const updateProfile = (id: number, data: any) => {
  return axios
    .put(
      `http://localhost:9000/api/v1/sizes/${id}`,
      { fullName: data.fullName },
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

export const addToCart = (data: any, Datatoken: any) => {
  return axios
    .post(`http://localhost:9000/api/v1/carts`, data, {
      headers: { Authorization: `Bearer ${Datatoken.dataToken}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};

export const updateCart = (id: number, data: any) => {
  return axios
    .put(`http://localhost:9000/api/v1/carts/${id}`, data, {
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
export const deleteCartItemByUser = (id: any) => {
  return axios
    .delete(`http://localhost:9000/api/v1/carts/${id}`, {
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
export const createOrder = (data: any, Datatoken: any) => {
  return axios
    .post(`http://localhost:9000/api/v1/order`, data, {
      headers: { Authorization: `Bearer ${Datatoken}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Lỗi!!!!", error);
      throw error;
    });
};

export const getAllProductSize = async () => {
  return await axios
    .get("http://localhost:9000/api/v1/productSizes")
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      console.error("Error!!!!", error);
      return [];
    });
};

export const getAllCartByUser = (dataToken: any) => {
  return axios
    .get("http://localhost:9000/api/v1/carts/me", {
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

export const login = async (data: any) => {
  return await axios
    .post(`http://localhost:9000/api/v1/auth/login`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return error;
    });
};
