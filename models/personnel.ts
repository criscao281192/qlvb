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
  que_quan: {
    type: Sequelize.STRING,
  },
  so_hieu: {
    type: Sequelize.STRING,
  },
  ngay_sinh: {
    type: Sequelize.DATE,
  },
  ngay_vao_nganh: {
    type: Sequelize.DATE,
  },
  ngay_vao_dang: {
    type: Sequelize.DATE,
  },
  doi_cong_tac: {
    type: Sequelize.STRING,
  },
  linh_vuc_cong_tac: {
    type: Sequelize.STRING,
  },
  chuc_vu: {
    type: Sequelize.STRING,
  },
  ngay_bo_nhiem: {
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
});
CanBo.sync();
export { CanBo };
