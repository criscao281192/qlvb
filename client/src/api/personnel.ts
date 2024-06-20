import { axiosInstance } from "./constants";

export const postPersonnel = async (body: any) => {
  try {
    const response = await axiosInstance.post(`/api/personnels`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCasePersonnel = async (caseId: string) => {
  return axiosInstance.get(`/api/personnels/${caseId}`);
};

export const bangThongTinCanBo = async (params: any) => {
  return axiosInstance.get(`/api/personnels`, {
    params,
  });
};

export const getConfigPersonnel = async () => {
  const configs = await axiosInstance.get(`/api/configPersonnel`);
  return configs.data;
};

export const searchThongTinCanBo = async (params: any) => {
  return axiosInstance.get(`/api/personnels/timThongTinCanBo`, {
    params,
  });
};

export const bangBoNhiemLai = async (params: any) => {
  return axiosInstance.get(`/api/personnels/bangBoNhiemLai`, {
    params,
  });
};

export const countCanBo = async (params: any) => {
  return axiosInstance.get(`/api/personnels/countCanBo`, {
    params,
  });
};

export const updatePersonnelRole = async (
  personnelId: string,
  personnelRoleId: string
) => {
  try {
    const response = await axiosInstance.post(
      `/api/personnels/${personnelId}/updatePersonnelRole`,
      { personnelRoleId }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
