import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Col } from "antd";
import { getCaseUser, updateStatusInCaseUser } from "../../api";
import { useHistory } from "react-router-dom";
import "./styles.css";

const CaseUserNames = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleCaseUser = async (recordId) => {
    try {
      const updatedCases = cases.map((caseItem) =>
        caseItem.id === recordId
          ? { ...caseItem, phan_quyen: "2" }
          : caseItem
      );
      setCases(updatedCases);
      await updateStatusInCaseUser(recordId, "2");
      history.go(0);
    } catch (error) {
      console.error("LỖI THÊM DỮ LIỆU:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCaseUser();
        setCases(response.data.result);
      } catch (err) {
        setError(err.message || "LỖI TẢI DỮ LIỆU.");
        setCases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    history.push("/userName");
  };

  const CaseColumns = [
    {
      title: "STT",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
      width: 50,
    },
    {
      title: "TÀI KHOẢN",
      dataIndex: "username",
      key: "username",
      align: "center",
      width: 100,
    },
    {
      title: "HỌ VÀ TÊN",
      dataIndex: "fullname",
      key: "fullname",
      align: "center",
      width: 200,
    },
    {
      title: "ĐƠN VỊ CÔNG TÁC",
      dataIndex: "don_vi",
      key: "don_vi",
      align: "center",
      width: 200,
      render: (text) => {
        return text === "1" ? "Đội Tham mưu" :
          text === "2" ? "Đội Khám nghiệm hiện trường" :
            text === "3" ? "Đội Giám định KTHS truyền thống và tài liệu" :
              text === "4" ? "Đội Giám định hoá, KTPL và pháp y, sinh vật" :
                "Đội Kỹ thuật phòng, chống tội phạm";
      },
    },
    {
      title: "QUYỀN TRUY CẬP",
      dataIndex: "phan_quyen",
      key: "phan_quyen",
      align: "center",
      width: 200,
      render: (text, record) => (
        <>
          {text === "1" ? (
            "ADMIN"
          ) : text === "2" ? (
            "USER"
          ) : (
            <Button danger onClick={() => handleCaseUser(record.id)}>
              XONG
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
        QUẢN LÝ TÀI KHOẢN
      </div>
      <br />
      <Col span={12} style={{ textAlign: "left" }}>
        <Button danger onClick={handleButtonClick} style={{ marginBottom: 16 }}>
          TẠO TÀI KHOẢN MỚI
        </Button>
      </Col>
      {error && (
        <Modal title="Lỗi" visible={true} onOk={() => setError(null)}>
          {error}
        </Modal>
      )}
      <Table
        rowKey={(record, index) => index.toString()}
        columns={CaseColumns}
        dataSource={cases}
        loading={loading}
        scroll={{ x: 600 }}
      />
    </div>
  );
};

export default CaseUserNames;
