import { axiosInstance } from "./constants";

export const postPerson = async (body: any) => {
  try {
    const response = await axiosInstance.post(`/api/persons`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCasePerson = async (caseId: string) => {
  return axiosInstance.get(`/api/persons/${caseId}`);
};

export const bangThongTinThanNhanCanBo = async (params: any) => {
  return axiosInstance.get(`/api/persons`, {
    params,
  });
};

export const getConfigPerson = async () => {
  const configs = await axiosInstance.get(`/api/configPerson`);
  return configs.data;
};

export const searchThongTinThanNhanCanBo = async (params: any) => {
  return axiosInstance.get(`/api/persons/timThongTinThanNhanCanBo`, {
    params,
  });
};

export const bangThongBaoThoiHanThe = async (params: any) => {
  return axiosInstance.get(`/api/persons/bangThongBaoThoiHanThe`, {
    params,
  });
};

export const updateStatusInData = async (recordId: any, newStatus: any) => {
  try {
    const response = await getCasePerson(recordId);
    const currentCase = response.data;
    currentCase.trang_thai = newStatus;
    await postPerson(currentCase);
  } catch (error) {
    console.error("Error updating status in database:", error);
  }
};