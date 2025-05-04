package entity

type ThanNhanCanBo struct {
	ID           int    `json:"id" gorm:"primaryKey;autoIncrement;column:id"`
	HoTen        string `json:"ho_ten" gorm:"column:ho_ten"`
	GioiTinh     string `json:"gioi_tinh" gorm:"column:gioi_tinh"`
	NgaySinh     string `json:"ngay_sinh" gorm:"column:ngay_sinh"`
	QueQuan      string `json:"que_quan" gorm:"column:que_quan"`
	CanBo        string `json:"can_bo" gorm:"column:can_bo"`
	DonViCongTac string `json:"don_vi_cong_tac" gorm:"column:don_vi_cong_tac"`
	MaSoThe      string `json:"ma_so_the" gorm:"column:ma_so_the"`
	TrangThai    string `json:"trang_thai" gorm:"column:trang_thai"`
}
