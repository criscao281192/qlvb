import Sequelize from "sequelize";
import { sequelize as dbConfig } from "../db/config";

const CanBo = dbConfig.define("can_bo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ho_ten: {
    type: Sequelize.STRING,
  },
  gioi_tinh: {
    type: Sequelize.STRING,
  },
  doan_the: {
    type: Sequelize.STRING,
  },
  chuc_vu: {
    type: Sequelize.STRING,
  },
  chuc_vu_dang: {
    type: Sequelize.STRING,
  },
  ngay_bo_nhiem: {
    type: Sequelize.DATE,
  },
  ngay_sinh: {
    type: Sequelize.DATE,
  },
  que_quan: {
    type: Sequelize.STRING,
  },
  noi_o_hien_nay: {
    type: Sequelize.STRING,
  },
  dan_toc: {
    type: Sequelize.STRING,
  },
  ngay_vao_nganh: {
    type: Sequelize.DATE,
  },
  ngay_vao_dang: {
    type: Sequelize.DATE,
  },
  ngay_vao_dang_chinh_thuc: {
    type: Sequelize.DATE,
  },
  trinh_do_ly_luan: {
    type: Sequelize.STRING,
  },
  trinh_do_dao_tao: {
    type: Sequelize.STRING,
  },
  trinh_do_cong_an: {
    type: Sequelize.STRING,
  },
  chuc_danh: {
    type: Sequelize.STRING,
  },
  don_vi_cong_tac: {
    type: Sequelize.STRING,
  },
  so_hieu: {
    type: Sequelize.STRING,
  },
  qua_trinh_cong_tac: {
    type: Sequelize.STRING,
  },
  qua_trinh_len_luong: {
    type: Sequelize.STRING,
  },
  xep_loai_can_bo: {
    type: Sequelize.STRING,
  },
  khen_thuong: {
    type: Sequelize.STRING,
  },
  ky_luat: {
    type: Sequelize.STRING,
  },
  cap_bac: {
    type: Sequelize.STRING,
  },
});
CanBo.sync();
export { CanBo };
