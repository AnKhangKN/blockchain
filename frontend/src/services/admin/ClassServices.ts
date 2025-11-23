import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 
// Ví dụ: http://localhost:5000/api

export const getClasses = async (accessToken: string) => {
  return axios.get(`${API_URL}/classes`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getClassById = async (id: string, accessToken: string) => {
  return axios.get(`${API_URL}/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const createClass = async (data: any, accessToken: string) => {
  return axios.post(`${API_URL}/classes`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const updateClass = async (id: string, data: any, accessToken: string) => {
  return axios.put(`${API_URL}/classes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const deleteClass = async (id: string, accessToken: string) => {
  return axios.delete(`${API_URL}/classes/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
