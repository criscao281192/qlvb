import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { countCasesVanBanDen } from "../../api";
import './ThongKeVanBanDen.css';

const ThongKeVanBanDen = () => {
  const [caseVanBanDens, setCaseVanBanDens] = useState([]);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    countCasesVanBanDen({})
      .then((response) => {
        setCaseVanBanDens(response.data);
        setHasData(response.data.length > 0);
      })
      .catch((err) => {
        setCaseVanBanDens([]);
        setHasData(false);
      });
  }, []);

  const columns = [
    {
      title: "LOẠI TÀI LIỆU",
      dataIndex: "ten_van_ban_den",
      key: "ten_van_ban_den",
      width: 200,
      align: "center",
    },
    {
      title: "SỐ LƯỢNG TRONG THÁNG",
      dataIndex: "no_van_ban_den",
      key: "no_van_ban_den",
      width: 200,
      align: "center",
    },
  ];

  const handleMoreInfo = () => {
    window.location.href = "/quan-ly-van-ban";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: '#237804' }}>THỐNG KÊ VĂN BẢN ĐẾN</div>
      <br />
      {hasData ? (
        <>
          <Table
            dataSource={caseVanBanDens}
            columns={columns}
            pagination={false}
            className="custom-table"
          />
          <Button type="primary" onClick={handleMoreInfo}>CHI TIẾT</Button>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#00474f" }}>KHÔNG CÓ DỮ LIỆU</div>
        </div>
      )}
    </div>
  );
};

export default ThongKeVanBanDen;