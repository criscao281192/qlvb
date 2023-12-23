import Sequelize, { DataTypes } from "sequelize";
import { sequelize as dbConfig } from "../db/config";

const TaiLieu = dbConfig.define("tai_lieu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  van_ban_den_so: {
    type: Sequelize.STRING,
  },
  de_xuat: {
    type: Sequelize.STRING,
  },
  ten_don_vi: {
    type: Sequelize.STRING,
  },
  so_van_ban: {
    type: Sequelize.STRING,
  },
  ngay_ban_hanh: {
    type: Sequelize.DATE,
  },
  ngay_tiep_nhan: {
    type: Sequelize.DATE,
  },
  do_mat: {
    type: Sequelize.STRING,
  },
  do_khan: {
    type: Sequelize.STRING,
  },
  noi_dung_van_ban: {
    type: Sequelize.STRING,
  },
  ngay_het_han: {
    type: Sequelize.DATE,
  },
  noi_nhan: {
    type: Sequelize.STRING,
  },
  trang_thai_van_ban: {
    type: Sequelize.STRING,
  },
  file_van_ban: {
    type: DataTypes.BLOB,
  }
});

const LoaiTaiLieu = dbConfig.define("loai_tai_lieu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

const VanBanDen = dbConfig.define("van_ban_den", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

TaiLieu.belongsTo(LoaiTaiLieu, { foreignKey: "loai_tai_lieu_id" });
TaiLieu.belongsTo(VanBanDen, { foreignKey: "van_ban_den_id" });

export { LoaiTaiLieu, VanBanDen, TaiLieu };

