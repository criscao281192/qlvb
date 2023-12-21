USE qlvb;

DROP TABLE IF EXISTS loai_tai_lieus;

CREATE TABLE IF NOT EXISTS loai_tai_lieus(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO loai_tai_lieus (name) VALUES('BÁO CÁO');
INSERT INTO loai_tai_lieus (name) VALUES('CHƯƠNG TRÌNH');
INSERT INTO loai_tai_lieus (name) VALUES('CÔNG VĂN');
INSERT INTO loai_tai_lieus (name) VALUES('GIẤY GIỚI THIỆU');
INSERT INTO loai_tai_lieus (name) VALUES('GIẤY MỜI');
INSERT INTO loai_tai_lieus (name) VALUES('GIẤY XÁC NHẬN');
INSERT INTO loai_tai_lieus (name) VALUES('HƯỚNG DẪN');
INSERT INTO loai_tai_lieus (name) VALUES('KẾ HOẠCH');
INSERT INTO loai_tai_lieus (name) VALUES('PHƯƠNG ÁN');
INSERT INTO loai_tai_lieus (name) VALUES('QUYẾT ĐỊNH');
INSERT INTO loai_tai_lieus (name) VALUES('THÔNG BÁO');
INSERT INTO loai_tai_lieus (name) VALUES('TỜ TRÌNH');
INSERT INTO loai_tai_lieus (name) VALUES('TRÍCH SAO');
INSERT INTO loai_tai_lieus (name) VALUES('YÊU CẦU');
INSERT INTO loai_tai_lieus (name) VALUES('BẢN ĐỊNH THỜI HẠN BẢO QUẢN HỒ SƠ');


DROP TABLE IF EXISTS van_ban_dens;

CREATE TABLE IF NOT EXISTS van_ban_dens(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO van_ban_dens (name) VALUES('TÀI LIỆU THƯỜNG');
INSERT INTO van_ban_dens (name) VALUES('TÀI LIỆU MẬT');
INSERT INTO van_ban_dens (name) VALUES('TÀI LIỆU KHÁC');

DROP TABLE IF EXISTS tai_lieus;

CREATE TABLE IF NOT EXISTS tai_lieus(
    id INT NOT NULL AUTO_INCREMENT,
    loai_tai_lieu_id INT,
    van_ban_den_id INT,
    van_ban_den_so VARCHAR(100),
    ten_don_vi VARCHAR(100),
    so_van_ban VARCHAR(100),
    ngay_ban_hanh DATETIME,
    ngay_tiep_nhan DATETIME,
    do_mat VARCHAR(500),
    do_khan VARCHAR(500),
    noi_dung_van_ban VARCHAR(500),
    ngay_het_han DATETIME,
    noi_nhan VARCHAR(500),
    de_xuat VARCHAR(500),
    trang_thai_van_ban VARCHAR(100),
    file_van_ban LONGBLOB,

    PRIMARY KEY (id),
    FOREIGN KEY (loai_tai_lieu_id) REFERENCES loai_tai_lieus(id),
    FOREIGN KEY (van_ban_den_id) REFERENCES van_ban_dens(id),
);

CREATE TABLE IF NOT EXISTS user_logins (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    don_vi VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);