import axios from "axios";

const API_ENDPOINT = "http://localhost:8000";
// const API_ENDPOINT = "";

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

// QUẢN LÝ VĂN BẢN

export const countCasesVanBanDi = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDi`, {
    params,
  });
};


export const countCasesVanBanDen = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDen`, {
    params,
  });
};

export const countCasesVanBanDenFor12 = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDenFor12Months`, {
    params,
  });
};

export const countVanBanDenForComparison = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDenForComparison`, {
    params,
  });
};

export const countVanBanDiForComparison = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDiForComparison`, {
    params,
  });
};

export const countCasesVanBanDenDay = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDenForRecentDays`, {
    params,
  });
};

export const countCasesVanBanDiFor12 = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/countVanBanDiFor12Months`, {
    params,
  });
};

export const postCase = async (body: any) => {
  console.log(body)
  const formData = new FormData();
  if (body.id !== null && body.id !== undefined) {
    formData.append("id", body.id);
  }
  if (body.van_ban_den !== null && body.van_ban_den !== undefined) {
    formData.append("van_ban_den", body.van_ban_den);
  }
  if (body.van_ban_den_so !== null && body.van_ban_den_so !== undefined) {
    formData.append("van_ban_den_so", body.van_ban_den_so);
  }
  if (body.loai_tai_lieu !== null && body.loai_tai_lieu !== undefined) {
    formData.append("loai_tai_lieu", body.loai_tai_lieu);
  }
  if (body.ten_don_vi !== null && body.ten_don_vi !== undefined) {
    formData.append("ten_don_vi", body.ten_don_vi);
  }
  if (body.so_van_ban !== null && body.so_van_ban !== undefined) {
    formData.append("so_van_ban", body.so_van_ban);
  }
  if (body.do_mat !== null && body.do_mat !== undefined) {
    formData.append("do_mat", body.do_mat);
  }
  if (body.do_khan !== null && body.do_khan !== undefined) {
    formData.append("do_khan", body.do_khan);
  }
  if (body.noi_dung_van_ban !== null && body.noi_dung_van_ban !== undefined) {
    formData.append("noi_dung_van_ban", body.noi_dung_van_ban);
  }
  if (body.noi_nhan !== null && body.noi_nhan !== undefined) {
    formData.append("noi_nhan", body.noi_nhan);
  }
  if (body.trang_thai_van_ban !== null && body.trang_thai_van_ban !== undefined) {
    formData.append("trang_thai_van_ban", body.trang_thai_van_ban);
  }
  if (body.isChangedFile !== null && body.isChangedFile !== undefined) {
    formData.append("isChangedFile", body.isChangedFile);
  }

  if (body.de_xuat !== null && body.de_xuat !== undefined) {
    formData.append("de_xuat", body.de_xuat);
  }

  if (body.file_van_ban !== null && body.file_van_ban !== undefined) {
    formData.append("file_van_ban", body.file_van_ban);
  }

  const ngayBanHanhDate = new Date(body.ngay_ban_hanh);
  if (!isNaN(ngayBanHanhDate.getTime())) {
    formData.append("ngay_ban_hanh", ngayBanHanhDate.toISOString());
  } else {
    console.error('NGÀY BAN HÀNH KHÔNG HỢP LỆ');
  }

  const ngayTiepNhanDate = new Date(body.ngay_tiep_nhan);
  if (!isNaN(ngayTiepNhanDate.getTime())) {
    formData.append("ngay_tiep_nhan", ngayTiepNhanDate.toISOString());
  } else {
    console.error('NGÀY TIẾP NHẬN KHÔNG HỢP LỆ');
  }

  if (body.ngay_het_han !== null && body.ngay_het_han !== undefined) {
    const ngayHetHanDate = new Date(body.ngay_het_han);
    if (!isNaN(ngayHetHanDate.getTime())) {
      formData.append("ngay_het_han", ngayHetHanDate.toISOString());
    } else {
      console.error("NGÀY HẾT HẠN KHÔNG HỢP LỆ");
    }
  } else {
    formData.append("ngay_het_han", "null");
  }


  try {
    const response = await axios.post(`${API_ENDPOINT}/api/cases`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const lay_so_van_ban_den = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/laysoVanBanDen`, {
    params,
  });
}

export const lay_so_van_ban_di = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/laysoVanBanDi`, {
    params,
  });
}

export const bangVanBanDenHan = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/bangVanBanDenHan`, {
    params,
  });
}

export const bangVanBanDen = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/bangVanBanDen`, {
    params,
  });
}

export const bangVanBanBanHanh = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/cases/bangVanBanBanHanh`, {
    params,
  });
}

export const updateStatusInDatabase = async (recordId: any, newStatus: any) => {
  try {
    const response = await getCase(recordId);
    const currentCase = response.data;
    currentCase.trang_thai_van_ban = newStatus;
    await postCase(currentCase);
  } catch (error) {
    console.error("Error updating status in database:", error);
  }
};

export const loginAPI = async (username: string, password: string) => {
  return axios.post(`${API_ENDPOINT}/api/user/login`, { username, password });
};



export const checkUser = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/user/checkUser`, {
    params,
  });
}


export const getCaseUser = async (params: any) => {
  return axios.get(`${API_ENDPOINT}/api/user/getCaseUser`, {
    params,
  });
}

export const postCaseUser = async (body: any) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/api/user/userName`, body);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCaseUserName = async (caseId: string) => {
  return axios.get(`${API_ENDPOINT}/api/user/userName/${caseId}`);
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
