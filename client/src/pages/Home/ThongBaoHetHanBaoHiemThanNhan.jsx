import React, { useState, useEffect } from "react";
import { Table, Empty, Button } from "antd";
import { bangThongBaoThoiHanThe, updateStatusInData } from "../../api/person";
import { useHistory } from "react-router-dom";
import "./stylesHome.css";

const ThongBaoHetHanBaoHiemThanNhan = () => {
  const [cases, setCases] = useState([]);
  const [isDisplayPeriod, setIsDisplayPeriod] = useState(false);
  let history = useHistory();

  const handleStatusClick = async (recordId) => {
    try {
      const updatedCases = cases.map((caseItem) =>
        caseItem.id === recordId
          ? { ...caseItem, trang_thai: "0" }
          : caseItem
      );
      setCases(updatedCases);
      await updateStatusInData(recordId, "0");
      history.go(0);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const CaseColumns = [
    {
      title: "HỌ TÊN",
      dataIndex: "ho_ten",
      key: "ho_ten",
      align: "center",
    },
    {
      title: "THÂN NHÂN CÁN BỘ",
      dataIndex: "can_bo",
      key: "can_bo",
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
      title: "HẾT HẠN",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <>
          <Button danger onClick={() => handleStatusClick(record.id)}>
            XONG
          </Button>
        </>
      ),
    },
  ];

  const rowClassName = (record) => {
    return "warning-row-error blink";
  };

  useEffect(() => {
    const currentDate = new Date();
    const startDisplayDate = new Date(currentDate.getFullYear(), 6, 15);
    const endDisplayDate = new Date(currentDate.getFullYear(), 6, 15);

    if (currentDate >= startDisplayDate && currentDate <= endDisplayDate) {
      setIsDisplayPeriod(true);
      bangThongBaoThoiHanThe()
        .then((response) => {
          setCases(response.data.result);
        })
        .catch((err) => {
          setCases([]);
        });
    } else {
      setIsDisplayPeriod(false);
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {isDisplayPeriod ? (
        cases.length === 0 ? (
          <Empty description=" " />
        ) : (
          <Table
            rowKey="id"
            columns={CaseColumns}
            dataSource={cases}
            rowClassName={rowClassName}
            loading={!cases.length}
            defaultSortOrder="ascend"
          />
        )
      ) : (
        <Empty description="NGOÀI THỜI GIAN HIỂN THỊ THÔNG BÁO" />
      )}
    </div>
  );
};

export default ThongBaoHetHanBaoHiemThanNhan;
