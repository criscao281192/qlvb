// const CanBo = dbConfig.define("can_bo", {
// 	id: {
// 	  type: Sequelize.INTEGER,
// 	  autoIncrement: true,
// 	  primaryKey: true,
// 	},
// 	ho_ten: {
// 	  type: Sequelize.STRING,
// 	},
// 	gioi_tinh: {
// 	  type: Sequelize.STRING,
// 	},
// 	doan_the: {
// 	  type: Sequelize.STRING,
// 	},
// 	chuc_vu: {
// 	  type: Sequelize.STRING,
// 	},
// 	chuc_vu_dang: {
// 	  type: Sequelize.STRING,
// 	},
// 	ngay_bo_nhiem: {
// 	  type: Sequelize.DATE,
// 	},
// 	ngay_sinh: {
// 	  type: Sequelize.DATE,
// 	},
// 	que_quan: {
// 	  type: Sequelize.STRING,
// 	},
// 	noi_o_hien_nay: {
// 	  type: Sequelize.STRING,
// 	},
// 	dan_toc: {
// 	  type: Sequelize.STRING,
// 	},
// 	ngay_vao_nganh: {
// 	  type: Sequelize.DATE,
// 	},
// 	ngay_vao_dang: {
// 	  type: Sequelize.DATE,
// 	},
// 	ngay_vao_dang_chinh_thuc: {
// 	  type: Sequelize.DATE,
// 	},
// 	trinh_do_ly_luan: {
// 	  type: Sequelize.STRING,
// 	},
// 	trinh_do_dao_tao: {
// 	  type: Sequelize.STRING,
// 	},
// 	trinh_do_cong_an: {
// 	  type: Sequelize.STRING,
// 	},
// 	chuc_danh: {
// 	  type: Sequelize.STRING,
// 	},
// 	don_vi_cong_tac: {
// 	  type: Sequelize.STRING,
// 	},
// 	so_hieu: {
// 	  type: Sequelize.STRING,
// 	},
// 	qua_trinh_cong_tac: {
// 	  type: Sequelize.STRING,
// 	},
// 	qua_trinh_len_luong: {
// 	  type: Sequelize.STRING,
// 	},
// 	xep_loai_can_bo: {
// 	  type: Sequelize.STRING,
// 	},
// 	khen_thuong: {
// 	  type: Sequelize.STRING,
// 	},
// 	ky_luat: {
// 	  type: Sequelize.STRING,
// 	},
// 	cap_bac: {
// 	  type: Sequelize.STRING,
// 	},
//   });

package entity

type CanBo struct {
	ID                   int    `json:"id" gorm:"primaryKey;autoIncrement;column:id"`
	HoTen                string `json:"ho_ten" gorm:"column:ho_ten"`
	GioiTinh             string `json:"gioi_tinh" gorm:"column:gioi_tinh"`
	DoanThe              string `json:"doan_the" gorm:"column:doan_the"`
	ChucVu               string `json:"chuc_vu" gorm:"column:chuc_vu"`
	ChucVuDang           string `json:"chuc_vu_dang" gorm:"column:chuc_vu_dang"`
	NgayBoNhiem          string `json:"ngay_bo_nhiem" gorm:"column:ngay_bo_nhiem"`
	NgaySinh             string `json:"ngay_sinh" gorm:"column:ngay_sinh"`
	QueQuan              string `json:"que_quan" gorm:"column:que_quan"`
	NoiOHienNay          string `json:"noi_o_hien_nay" gorm:"column:noi_o_hien_nay"`
	DanToc               string `json:"dan_toc" gorm:"column:dan_toc"`
	NgayVaoNganh         string `json:"ngay_vao_nganh" gorm:"column:ngay_vao_nganh"`
	NgayVaoDang          string `json:"ngay_vao_dang" gorm:"column:ngay_vao_dang"`
	NgayVaoDangChinhThuc string `json:"ngay_vao_dang_chinh_thuc" gorm:"column:ngay_vao_dang_chinh_thuc"`
	TrinhDoLyLuan        string `json:"trinh_do_ly_luan" gorm:"column:trinh_do_ly_luan"`
	TrinhDoDaoTao        string `json:"trinh_do_dao_tao" gorm:"column:trinh_do_dao_tao"`
	TrinhDoCongAn        string `json:"trinh_do_cong_an" gorm:"column:trinh_do_cong_an"`
	ChucDanh             string `json:"chuc_danh" gorm:"column:chuc_danh"`
	DonViCongTac         string `json:"don_vi_cong_tac" gorm:"column:don_vi_cong_tac"`
	SoHieu               string `json:"so_hieu" gorm:"column:so_hieu"`
	QuaTrinhCongTac      string `json:"qua_trinh_cong_tac" gorm:"column:qua_trinh_cong_tac"`
	QuaTrinhLenLuong     string `json:"qua_trinh_len_luong" gorm:"column:qua_trinh_len_luong"`
	XepLoaiCanBo         string `json:"xep_loai_can_bo" gorm:"column:xep_loai_can_bo"`
	KhenThuong           string `json:"khen_thuong" gorm:"column:khen_thuong"`
	KyLuat               string `json:"ky_luat" gorm:"column:ky_luat"`
	CapBac               string `json:"cap_bac" gorm:"column:cap_bac"`
}
