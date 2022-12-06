import Sequelize from "sequelize";
import { sequelize as dbConfig } from "../db/config";

const TaiLieu = dbConfig.define("tai_lieu", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  so_tai_lieu: {
    type: Sequelize.INTEGER,
  },
  ten_don_vi: {
    type: Sequelize.INTEGER,
  },
  so_van_ban: {
    type: Sequelize.INTEGER,
  },
  ngay_ban_hanh: {
    type: Sequelize.DATE,
  },
  ngay_tiep_nhan: {
    type: Sequelize.DATE,
  },
  do_mat: {
    type: Sequelize.INTEGER,
  },
  do_khan: {
    type: Sequelize.INTEGER,
  },
  noi_dung_van_ban: {
    type: Sequelize.STRING,
  },
  yeu_cau: {
    type: Sequelize.STRING,
  },
  ngay_het_han: {
    type: Sequelize.DATE,
  },
  nguoi_ki: {
    type: Sequelize.INTEGER,
  },
  doi_bao_cao: {
    type: Sequelize.INTEGER,
  },
  so_van_ban_tra_loi: {
    type: Sequelize.INTEGER,
  },
  ngay_van_ban_tra_loi: {
    type: Sequelize.DATE,
  },
  trang_thai_van_ban: {
    type: Sequelize.STRING,
  },
  trang_thai_d2: {
    type: Sequelize.STRING,
  },
  trang_thai_d3: {
    type: Sequelize.STRING,
  },
  trang_thai_d4: {
    type: Sequelize.STRING,
  },
  trang_thai_d5: {
    type: Sequelize.STRING,
  },
  lanh_dao_phu_trach: {
    type: Sequelize.STRING,
  },
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

const PhuTrach = dbConfig.define("phu_trach", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
});

const CoQuanBanHanh = dbConfig.define("co_quan_ban_hanh", {
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
TaiLieu.belongsTo(CoQuanBanHanh, { foreignKey: "co_quan_ban_hanh_id" });
TaiLieu.belongsTo(PhuTrach, { foreignKey: "phu_trach_id" });

export { LoaiTaiLieu, CoQuanBanHanh, PhuTrach, TaiLieu};
