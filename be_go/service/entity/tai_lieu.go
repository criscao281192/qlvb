package entity

type TaiLieu struct {
	ID              int    `json:"id" gorm:"primaryKey;autoIncrement;column:id"`
	VanBanDenSo     string `json:"van_ban_den_so" gorm:"column:van_ban_den_so"`
	DeXuat          string `json:"de_xuat" gorm:"column:de_xuat"`
	TenDonVi        string `json:"ten_don_vi" gorm:"column:ten_don_vi"`
	SoVanBan        string `json:"so_van_ban" gorm:"column:so_van_ban"`
	NgayBanHanh     string `json:"ngay_ban_hanh" gorm:"column:ngay_ban_hanh"`
	NgayTiepNhan    string `json:"ngay_tiep_nhan" gorm:"column:ngay_tiep_nhan"`
	DoMat           string `json:"do_mat" gorm:"column:do_mat"`
	DoKhan          string `json:"do_khan" gorm:"column:do_khan"`
	NoiDungVanBan   string `json:"noi_dung_van_ban" gorm:"column:noi_dung_van_ban"`
	NgayHetHan      string `json:"ngay_het_han" gorm:"column:ngay_het_han"`
	NoiNhan         string `json:"noi_nhan" gorm:"column:noi_nhan"`
	TrangThaiVanBan string `json:"trang_thai_van_ban" gorm:"column:trang_thai_van_ban"`
	CreatedAt       string `json:"createdAt" gorm:"column:createdAt"`
	CreatedBy       string `json:"createdBy" gorm:"column:createdBy"`
	UpdatedAt       string `json:"updatedAt" gorm:"column:updatedAt"`
	UpdatedBy       string `json:"updatedBy" gorm:"column:updatedBy"`
	FileVanBan      string `json:"file_van_ban" gorm:"column:file_van_ban"`
}

type LoaiTaiLieu struct {
	ID   int    `json:"id" gorm:"primaryKey;autoIncrement;column:id"`
	Name string `json:"name" gorm:"column:name"`
}

type VanBanDen struct {
	ID   int    `json:"id" gorm:"primaryKey;autoIncrement;column:id"`
	Name string `json:"name" gorm:"column:name"`
}
