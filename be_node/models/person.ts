import Sequelize from "sequelize";
import { sequelize as dbConfig } from "../db/config";

const ThanNhanCanBo = dbConfig.define("than_nhan_can_bo", {
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
  ngay_sinh: {
    type: Sequelize.DATE,
  },
  que_quan: {
    type: Sequelize.STRING,
  },
  can_bo: {
    type: Sequelize.STRING,
  },
  don_vi_cong_tac: {
    type: Sequelize.STRING,
  },
  ma_so_the: {
    type: Sequelize.STRING,
  },
  trang_thai: {
    type: Sequelize.STRING,
  },
});
ThanNhanCanBo.sync();
export { ThanNhanCanBo };
