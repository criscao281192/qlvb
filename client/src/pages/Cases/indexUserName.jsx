import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Col } from "antd";
import { getCaseUser } from "../../api";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

const CaseUserNames = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCaseUser();
        setCases(response.data.result);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi khi tải dữ liệu.");
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
      width: 100,
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
    },
    {
      title: "PHÂN QUYỀN",
      dataIndex: "phan_quyen",
      key: "phan_quyen",
      align: "center",
      width: 200,
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
