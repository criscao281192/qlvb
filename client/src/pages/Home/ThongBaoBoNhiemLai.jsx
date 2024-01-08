import React, { useState, useEffect } from "react";
import { Table, Empty, Button } from "antd";
import { bangBoNhiemLai, updatePersonnelRole } from "../../api/personnel";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./stylesHome.css";

const ThongBaoBoNhiemLai = () => {
  const [cases, setCases] = useState([]);
  let history = useHistory();

  const handleCasePersonnel = async (recordId, hoTen) => {
    try {
      const confirmResult = window.confirm(
        `Đã có Quyết định bổ nhiệm lại của đồng chí ${hoTen}?`
      );
      if (!confirmResult) return;

      const currentDate = moment().format("YYYY-MM-DDT13:00:00.000Z");

      const updatedCases = cases.map((caseItem) =>
        caseItem.id === recordId
          ? { ...caseItem, ngay_bo_nhiem: currentDate }
          : caseItem
      );
      setCases(updatedCases);

      await updatePersonnelRole(recordId, currentDate);
      history.go(0);
    } catch (error) {
      console.error("LỖI THÊM DỮ LIỆU:", error);
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
      title: "NGÀY BỔ NHIỆM",
      dataIndex: "ngay_bo_nhiem",
      key: "ngay_bo_nhiem",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
    },
    {
      title: "BỔ NHIỆM LẠI",
      dataIndex: "",
      key: "",
      align: "center",
      width: 200,
      render: (text, record) => (
        <Button
          danger
          onClick={() => handleCasePersonnel(record.id, record.ho_ten)}
        >
          HOÀN THÀNH
        </Button>
      ),
    },
  ];

  useEffect(() => {
    bangBoNhiemLai()
      .then((response) => {
        setCases(response.data.result);
      })
      .catch((err) => {
        setCases([]);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {cases.length === 0 ? (
        <Empty description=" " />
      ) : (
        <Table
          rowKey="id"
          columns={CaseColumns}
          dataSource={cases}
          loading={!cases.length}
          defaultSortOrder="ascend"
        />
      )}
    </div>
  );
};

export default ThongBaoBoNhiemLai;
