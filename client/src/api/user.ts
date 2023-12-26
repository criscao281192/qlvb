import axios from "axios";
import { API_ENDPOINT } from "./constants";


export const loginAPI = async (username: string, password: string) => {
  return axios.post(`${API_ENDPOINT}/auth/whoami`, { username, password });
};

export const checkUser = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/users/checkUser`, {
    params,
  });
}


export const getCaseUser = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/users/getCaseUser`, {
    params,
  });
}

export const postCaseUser = async (body: any) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/api/users/userName`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCaseUserName = async (caseId: string) => {
  return axios.get(`${API_ENDPOINT}/api/users/userName/${caseId}`);
};

export const updateStatusInCaseUser = async (recordId: any, newStatus: any) => {
  try {
    const response = await getCaseUserName(recordId);
    const currentCase = response.data;
    currentCase.phan_quyen = newStatus;
    await postCaseUser(currentCase);
  } catch (error) {
    console.error("LỖI THÊM DỮ LIỆU:", error);
    throw error;
  }
};

export const getConfigUsers = async () => {
  const configUsers = await axios.get(`${API_ENDPOINT}/api/configUser`);
  return configUsers.data;
};
