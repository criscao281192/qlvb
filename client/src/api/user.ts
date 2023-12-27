import axios from "axios";
import { axiosInstance } from "./constants";

export const loginAPI = async (username: string, password: string) => {
  return axiosInstance.post(`/auth/whoami`, { username, password });
};

export const checkUser = async (params: any) => {
  return axiosInstance.get(`/auth/checkUser`, {
    params,
  });
};

export const getCaseUser = async (params: any) => {
  return axiosInstance.get(`/api/users`, {
    params,
  });
};

export const registerUser = async (body: any) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserRole = async (userId: string, userRoleId: string) => {
  try {
    const response = await axiosInstance.post(`/api/users/${userId}/updateRole`, { userRoleId });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCaseUserName = async (caseId: string) => {
  return axiosInstance.get(`/api/users/${caseId}`);
};

export const updateStatusInCaseUser = async (recordId: any, newStatus: any) => {
  try {
    const response = await getCaseUserName(recordId);
    const currentCase = response.data;
    currentCase.phan_quyen = newStatus;
    await registerUser(currentCase);
  } catch (error) {
    console.error("LỖI THÊM DỮ LIỆU:", error);
    throw error;
  }
};

export const getConfigUsers = async () => {
  const configUsers = await axiosInstance.get(`/api/configUser`);
  return configUsers.data;
};
