import { axiosInstance } from "./constants";

export const loginAPI = async (username: string, password: string) => {
  return axiosInstance.post(`/auth/whoami`, { username, password });
};

export const checkUser = async (params: any) => {
  return axiosInstance.get(`/api/users/checkUser`, {
    params,
  });
};

export const getCaseUser = async (params: any) => {
  return axiosInstance.get(`/api/users`, {
    params,
  });
};

export const postCaseUser = async (body: any) => {
  try {
    const response = await axiosInstance.post(`/api/users`, body);
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
    await postCaseUser(currentCase);
  } catch (error) {
    console.error("LỖI THÊM DỮ LIỆU:", error);
    throw error;
  }
};

export const getConfigUsers = async () => {
  const configUsers = await axiosInstance.get(`/api/configUser`);
  return configUsers.data;
};
