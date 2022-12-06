DROP TABLE IF EXISTS loai_tai_lieus;

CREATE TABLE IF NOT EXISTS loai_tai_lieus(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO loai_tai_lieus (name) VALUES('CÔNG VĂN');
INSERT INTO loai_tai_lieus (name) VALUES('KẾ HOẠCH');
INSERT INTO loai_tai_lieus (name) VALUES('BÁO CÁO');
INSERT INTO loai_tai_lieus (name) VALUES('THÔNG BÁO');
INSERT INTO loai_tai_lieus (name) VALUES('NGHỊ ĐỊNH');
INSERT INTO loai_tai_lieus (name) VALUES('NGHỊ QUYẾT');
INSERT INTO loai_tai_lieus (name) VALUES('QUYẾT ĐỊNH');
INSERT INTO loai_tai_lieus (name) VALUES('CHỈ THỊ');
INSERT INTO loai_tai_lieus (name) VALUES('THÔNG TƯ');
INSERT INTO loai_tai_lieus (name) VALUES('THÔNG CÁO');
INSERT INTO loai_tai_lieus (name) VALUES('HƯỚNG DẪN');







DROP TABLE IF EXISTS co_quan_ban_hanhs;

CREATE TABLE IF NOT EXISTS co_quan_ban_hanhs(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO co_quan_ban_hanhs (name) VALUES('CATP HÀ NỘI');
INSERT INTO co_quan_ban_hanhs (name) VALUES('ĐẢNG UỶ');
INSERT INTO co_quan_ban_hanhs (name) VALUES('BỘ CÔNG AN');
INSERT INTO co_quan_ban_hanhs (name) VALUES('UBND HUYỆN');
INSERT INTO co_quan_ban_hanhs (name) VALUES('UBND TỈNH');
INSERT INTO co_quan_ban_hanhs (name) VALUES('TAND HUYỆN');
INSERT INTO co_quan_ban_hanhs (name) VALUES('TAND TỈNH');



DROP TABLE IF EXISTS phu_traches;

CREATE TABLE IF NOT EXISTS phu_traches(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    PRIMARY KEY (id)
);

INSERT INTO phu_traches (name) VALUES('Đ/c Tuyến');
INSERT INTO phu_traches (name) VALUES('Đ/c Ngọc Anh');
INSERT INTO phu_traches (name) VALUES('Đ/c Quyên');
INSERT INTO phu_traches (name) VALUES('Đ/c Huy Anh');
INSERT INTO phu_traches (name) VALUES('Đ/c Kiên');
INSERT INTO phu_traches (name) VALUES('Đ/c Tuấn');
INSERT INTO phu_traches (name) VALUES('Đ/c Hùng');
INSERT INTO phu_traches (name) VALUES('Đ/c Tuấn Anh');
INSERT INTO phu_traches (name) VALUES('Đ/c Tuyền');
INSERT INTO phu_traches (name) VALUES('Đ/c Tuyển');

DROP TABLE IF EXISTS tai_lieus;

CREATE TABLE IF NOT EXISTS tai_lieus(
    id INT NOT NULL AUTO_INCREMENT,
    loai_tai_lieu_id INT,
    so_tai_lieu INT,
    co_quan_ban_hanh_id INT,
    ten_don_vi VARCHAR(500),
    so_van_ban VARCHAR(500),
    ngay_ban_hanh DATE,
    ngay_tiep_nhan DATE,
    do_mat VARCHAR(500),
    do_khan VARCHAR(500),
    noi_dung_van_ban VARCHAR(500),
    yeu_cau VARCHAR(500),
    ngay_het_han DATE,
    nguoi_ki VARCHAR(500),
    doi_bao_cao VARCHAR(500),
    lanh_dao_phu_trach VARCHAR(500),
    phu_trach_id INT,
    so_van_ban_tra_loi VARCHAR(500),
    ngay_van_ban_tra_loi DATE,
    trang_thai_van_ban VARCHAR(500),
    trang_thai_d2 VARCHAR(100),
    trang_thai_d3 VARCHAR(100),
    trang_thai_d4 VARCHAR(100),
    trang_thai_d5 VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (loai_tai_lieu_id) REFERENCES loai_tai_lieus(id),
    FOREIGN KEY (co_quan_ban_hanh_id) REFERENCES co_quan_ban_hanhs(id),
    FOREIGN KEY (phu_trach_id) REFERENCES phu_traches(id)

);