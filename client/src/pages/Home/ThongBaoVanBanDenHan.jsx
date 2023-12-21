import React, { useState, useEffect } from "react";
import { Table, Empty, Button } from "antd";
import { bangVanBanDenHan, updateStatusInDatabase } from "../../api";
import { SyncOutlined, WarningOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./stylesHome.css";

const ThongBaoVanBanDenHan = () => {
  const [cases, setCases] = useState([]);
  const [sortedInfo] = useState({});
  let history = useHistory();

  const handleStatusClick = async (recordId) => {
    try {
      const updatedCases = cases.map((caseItem) =>
        caseItem.id === recordId ? { ...caseItem, trang_thai_van_ban: "XONG" } : caseItem
      );
      setCases(updatedCases);
      await updateStatusInDatabase(recordId, "XONG");
      history.go(0);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const CaseColumns = [
    {
      title: "ĐƠN VỊ",
      dataIndex: "ten_don_vi",
      key: "ten_don_vi",
      align: "center",
    },
    {
      title: "SỐ VĂN BẢN",
      dataIndex: "so_van_ban",
      key: "so_van_ban",
      align: "center",
    },
    {
      title: "NGÀY BAN HÀNH",
      dataIndex: "ngay_ban_hanh",
      key: "ngay_ban_hanh",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
    },
    {
      title: "NGÀY TIẾP NHẬN",
      key: "ngay_tiep_nhan",
      dataIndex: "ngay_tiep_nhan",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      align: "center",
    },
    {
      title: "NỘI DUNG",
      key: "noi_dung_van_ban",
      dataIndex: "noi_dung_van_ban",
    },
    {
      title: "NGÀY HẾT HẠN",
      key: "ngay_het_han",
      dataIndex: "ngay_het_han",
      render: (data) => data && moment(data).format("DD/MM/YYYY"),
      sorter: (a, b) => new Date(a.ngay_het_han) - new Date(b.ngay_het_han),
      sortOrder: sortedInfo.columnKey === 'ngay_het_han' ? sortedInfo.order : 'ascend',
      align: "center",
    },
    {
      title: "THỰC HIỆN",
      key: "noi_nhan",
      dataIndex: "noi_nhan",
      align: "center",
    },
    {
      title: "TRẠNG THÁI",
      key: "trang_thai_van_ban",
      dataIndex: "trang_thai_van_ban",
      align: "center",
      render: (text) => {
        if (text === "ĐANG XỬ LÝ") {
          return <SyncOutlined spin className="icon-wrapper-load" />;
        }
        return null;
      },
    },
    {
      title: "HOÀN THÀNH",
      key: "",
      dataIndex: "action",
      align: "center",
      render: (text, record) => (
        <>
          <Button danger onClick={() => handleStatusClick(record.id)}>XONG</Button>
        </>
      ),
    },
  ];

  const rowClassName = (record) => {
    const currentDate = new Date();
    const deadline = new Date(record.ngay_het_han);
    const diffTime = deadline - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      return "warning-row-error blink";
    }
    return "";
  };

  useEffect(() => {
    bangVanBanDenHan()
      .then((response) => {
        setCases(response.data.result);
      })
      .catch((err) => {
        setCases([]);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <WarningOutlined style={{ fontSize: "48px", fontWeight: "bold", color: "red" }} />
      {cases.length === 0 ? (
        <Empty description="TẤT CẢ BÁO CÁO ĐẾN HẠN ĐÃ HOÀN THÀNH" />
      ) : (
        <Table
          rowKey="id"
          columns={CaseColumns}
          dataSource={cases}
          rowClassName={rowClassName}
          loading={!cases.length}
          defaultSortOrder="ascend"
        />
      )}
    </div>
  );
};

export default ThongBaoVanBanDenHan;