import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { bangThongTinCanBo, searchThongTinCanBo } from "../../api/personnel";
import SearchCaseCanBo from "../../components/SearchCaseCanBo";
import ThongBaoBoNhiemLai from "../Home/ThongBaoBoNhiemLai";
import { useHistory } from "react-router-dom";
import moment from "moment";

const PersonnelList = () => {
  const [cases, setCases] = useState([]);
  const [searchCondition, setSearchCondition] = useState();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  let history = useHistory();

  const CaseColumns = [
    {
      title: "TT",
      render: (text, selectedCase, index) => {
        return calculateRowNumber(index);
      },
      align: "center",
    },
    {
      title: "CẤP BẬC",
      dataIndex: "cap_bac",
      key: "cap_bac",
      align: "center",
    },
    {
      title: "HỌ TÊN",
      dataIndex: "ho_ten",
      key: "ho_ten",
      align: "center",
    },
    {
      title: "SỐ HIỆU",
      dataIndex: "so_hieu",
      key: "so_hieu",
      align: "center",
      width: 100,
    },
    {
      title: "NGÀY SINH",
      dataIndex: "ngay_sinh",
      key: "ngay_sinh",
      align: "center",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      width: 100,
    },
    {
      title: "QUÊ QUÁN",
      dataIndex: "que_quan",
      key: "que_quan",
      align: "center",
    },
    {
      title: "ĐƠN VỊ CÔNG TÁC",
      dataIndex: "don_vi_cong_tac",
      key: "don_vi_cong_tac",
      align: "center",
      render: (text) => {
        return text === "0"
          ? "Lãnh đạo Phòng"
          : text === "1"
            ? "Đội Tham mưu"
            : text === "2"
              ? "Đội Khám nghiệm hiện trường"
              : text === "3"
                ? "Đội Giám định KTHS truyền thống và tài liệu"
                : text === "4"
                  ? "Đội Giám định hoá, KTPL và pháp y, sinh vật"
                  : "Đội Kỹ thuật phòng, chống tội phạm";
      },
    },
    {
      title: "CHỨC VỤ",
      dataIndex: "chuc_vu",
      key: "chuc_vu",
      align: "center",
      render: (text) => {
        return text === "1"
          ? "Trưởng phòng"
          : text === "2"
            ? "Phó Trưởng phòng"
            : text === "3"
              ? "Đội trưởng"
              : text === "4"
                ? "Phó Đội trưởng"
                : "Cán bộ";
      },
    },
    {
      title: "CHỨC DANH",
      dataIndex: "chuc_danh",
      key: "chuc_danh",
      align: "center",
    },
    {
      title: "GHI CHÚ",
      key: "",
      dataIndex: "action",
      align: "center",
      render: (text, selectedCase) => (
        <>
          <EditOutlined
            onClick={() =>
              history.push(`/quan-ly-can-bo/chinh-sua/${selectedCase.id}`)
            }
            style={{ marginRight: 8 }}
          />
          <SearchOutlined onClick={() => handleViewDetail(selectedCase)} style={{ marginRight: 8 }} />
        </>
      ),
    },
  ];

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [currentRowNumber, setCurrentRowNumber] = useState(0);

  const calculateRowNumber = (index) => {
    return currentRowNumber + index + 1;
  };

  useEffect(() => {
    if (searchCondition) {
      searchThongTinCanBo(searchCondition)
        .then((response) => {
          setTotalItems(response.data.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          const sortedCases = response.data.sort((a, b) => {
            if (a.don_vi_cong_tac === b.don_vi_cong_tac) {
              return a.chuc_vu - b.chuc_vu;
            }
            return a.don_vi_cong_tac - b.don_vi_cong_tac;
          });
          setCases(sortedCases);
        })
        .catch((err) => {
          setCases([]);
        });
    } else {
      bangThongTinCanBo()
        .then((response) => {
          setTotalItems(response.data.result.length);
          setCurrentRowNumber((currentPage - 1) * itemsPerPage);
          const sortedCases = response.data.result.sort((a, b) => {
            if (a.don_vi_cong_tac === b.don_vi_cong_tac) {
              return a.chuc_vu - b.chuc_vu;
            }
            return a.don_vi_cong_tac - b.don_vi_cong_tac;
          });
          setCases(sortedCases);
        })
        .catch((err) => {
          setCases([]);
        });
    }
  }, [searchCondition, currentPage, itemsPerPage]);

  const handleTableChange = (pagination, filters, sorter) => {
    setCurrentPage(pagination.current);
    setItemsPerPage(pagination.pageSize);
  };

  const onSearch = (searchParams) => {
    setSearchCondition(searchParams);
  };

  const handleViewDetail = (selectedCase) => {
    setSelectedCase(selectedCase);
    setViewModalVisible(true);
  };

  const handleViewModalCancel = () => {
    setViewModalVisible(false);
  };

  const mapCongTac = (value) => {
    switch (value) {
      case "0":
        return "Lãnh đạo Phòng";
      case "1":
        return "Đội Tham mưu";
      case "2":
        return "Đội Khám nghiệm hiện trường";
      case "3":
        return "Đội Giám định KTHS truyền thống và tài liệu";
      case "4":
        return "Đội Giám định hoá, KTPL và pháp y, sinh vật";
      default:
        return "Đội Kỹ thuật phòng, chống tội phạm";
    }
  };

  const mapChucVu = (value) => {
    switch (value) {
      case "1":
        return "Trưởng phòng";
      case "2":
        return "Phó Trưởng phòng";
      case "3":
        return "Đội trưởng";
      case "4":
        return "Phó Đội trưởng";
      default:
        return "Cán bộ";
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
        QUẢN LÝ CÁN BỘ
      </div>
      <br />
      <ThongBaoBoNhiemLai />
      <SearchCaseCanBo onSearch={onSearch} cases={cases} />
      <Table
        rowKey={"id"}
        columns={CaseColumns}
        dataSource={cases}
        loading={cases.length === 0}
        defaultSortOrder={"decrease"}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalItems,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
      <Modal
        title="THÔNG TIN CÁN BỘ"
        visible={viewModalVisible}
        onCancel={handleViewModalCancel}
        footer={null}
      >
        {selectedCase && (
          <div>
            <p><strong>1. Cấp bậc:</strong> {selectedCase.cap_bac}</p>
            <p><strong>2. Họ tên:</strong> {selectedCase.ho_ten}</p>
            <p><strong>3. Số hiệu:</strong> {selectedCase.so_hieu}</p>
            <p><strong>4. Công tác:</strong> {mapCongTac(selectedCase.don_vi_cong_tac)}</p>
            <p><strong>5. Chức vụ:</strong> {mapChucVu(selectedCase.chuc_vu)} </p>
            <p><strong>6. Chức vụ Đảng:</strong> {selectedCase.chuc_vu_dang}</p>
            <p>
              <strong>7. Ngày bổ nhiệm:</strong>{" "}
              {selectedCase.ngay_bo_nhiem && moment(selectedCase.ngay_bo_nhiem).isValid()
                ? moment(selectedCase.ngay_bo_nhiem).format("DD/MM/YYYY")
                : "Không"}
            </p>
            <p>
              <strong>8. Phụ cấp:</strong>{" "}
              {parseFloat(((selectedCase.chuc_vu_dang === 'Bí thư Đảng uỷ' || selectedCase.chuc_vu_dang === 'Phó Bí thư Đảng uỷ' || selectedCase.chuc_vu_dang === 'Uỷ viên Ban Thường vụ Đảng uỷ' || selectedCase.chuc_vu_dang.includes('Uỷ viên Ban Chấp hành Đảng bộ') ? 0.3 : 0)
                +
                ((selectedCase.chuc_vu_dang === 'Bí thư Chi đoàn cơ sở' || selectedCase.chuc_vu_dang === 'Phó Bí thư Chi đoàn cơ sở' || selectedCase.chuc_vu_dang === 'Chủ tịch Hội Phụ nữ' || selectedCase.chuc_vu_dang === 'Phó Chủ tịch Hội Phụ nữ') ? 0.2 : 0))
                +
                parseFloat((selectedCase.chuc_vu === '1') ? 0.8 :
                  ((selectedCase.chuc_vu === '2') ? 0.7 :
                    ((selectedCase.chuc_vu === '3') ? 0.3 :
                      ((selectedCase.chuc_vu === '4') ? 0.25 : 0))))) !== 0 ?
                (parseFloat(((selectedCase.chuc_vu_dang === 'Bí thư Đảng uỷ' || selectedCase.chuc_vu_dang === 'Phó Bí thư Đảng uỷ' || selectedCase.chuc_vu_dang === 'Uỷ viên Ban Thường vụ Đảng uỷ' || selectedCase.chuc_vu_dang === 'Uỷ viên Ban Chấp hành Đảng bộ') ? 0.3 : 0)
                  +
                  ((selectedCase.chuc_vu_dang === 'Bí thư Chi đoàn cơ sở' || selectedCase.chuc_vu_dang === 'Phó Bí thư Chi đoàn cơ sở' || selectedCase.chuc_vu_dang === 'Chủ tịch Hội Phụ nữ' || selectedCase.chuc_vu_dang === 'Phó Chủ tịch Hội Phụ nữ') ? 0.2 : 0))
                  +
                  parseFloat((selectedCase.chuc_vu === '1') ? 0.8 :
                    ((selectedCase.chuc_vu === '2') ? 0.7 :
                      ((selectedCase.chuc_vu === '3') ? 0.3 :
                        ((selectedCase.chuc_vu === '4') ? 0.25 : 0))))) : 'Không'}</p>
            <p><strong>9. Chức danh:</strong> {selectedCase.chuc_danh}</p>
            <p><strong>10. Giới tính:</strong> {selectedCase.gioi_tinh}</p>
            <p><strong>12. Đảng/Đoàn thể:</strong> {selectedCase.doan_the}</p>
            <p><strong>13. Ngày sinh:</strong> {moment(selectedCase.ngay_sinh).format("DD/MM/YYYY")}</p>
            <p><strong>14. Quê quán:</strong> {selectedCase.que_quan}</p>
            <p><strong>15. Nơi ở hiện nay:</strong> {selectedCase.noi_o_hien_nay}</p>
            <p><strong>16. Dân tộc:</strong> {selectedCase.dan_toc}</p>
            <p><strong>17. Ngày vào ngành:</strong> {moment(selectedCase.ngay_vao_nganh).format("DD/MM/YYYY")}</p>
            <p><strong>18. Ngày vào Đảng:</strong> {moment(selectedCase.ngay_vao_dang).format("DD/MM/YYYY")}</p>
            <p><strong>20. Ngày chuyển Đảng chính thức:</strong> {moment(selectedCase.ngay_vao_dang_chinh_thuc).format("DD/MM/YYYY")}</p>
            <p><strong>21. Trình độ lý luận:</strong> {selectedCase.trinh_do_ly_luan}</p>
            <p><strong>22. Trình độ đào tạo:</strong> {selectedCase.trinh_do_dao_tao}</p>
            <p><strong>23. Trình độ nghiệp vụ Công an:</strong> {selectedCase.trinh_do_cong_an}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>24. Quá trình công tác:</strong> <br />{selectedCase.qua_trinh_cong_tac}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>25. Quá trình lên lương:</strong> <br />{selectedCase.qua_trinh_len_luong}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>26. Xếp loại cán bộ:</strong> <br />{selectedCase.xep_loai_can_bo}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>27. Khen thưởng:</strong> <br />{selectedCase.khen_thuong}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>28. Kỷ luật:</strong> <br />{selectedCase.ky_luat}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PersonnelList;
