import axios from "axios";

const API_ENDPOINT = "";

export const getConfigs = async () => {
  const configs = await axios.get(`${API_ENDPOINT}/api/configs`);
  return configs.data;
};

export const searchCases = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases`, {
    params,
  });
};

export const getCase = async (caseId: string) => {
  return axios.get(`${API_ENDPOINT}/api/cases/${caseId}`);
};

export const deleteCase = async (caseId: string) => {
  return axios.delete(`${API_ENDPOINT}/api/cases/${caseId}`);
};

export const countCasesByCreator = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countByCreator`, {
    params,
  });
};


export const countCasesByMonth = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countByMonth`, {
    params,
  });
};


export const countCasesByDistrict = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countByDistrict`, {
    params,
  });
};

export const postCase = async (body: any) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/api/cases`, body);

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const kiem_tra_so_tai_lieu = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/kiemTraSoTaiLieu`, {
    params,
  });
}