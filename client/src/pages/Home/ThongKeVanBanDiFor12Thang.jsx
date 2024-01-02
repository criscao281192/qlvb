import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from "recharts";
import { countCasesVanBanDiFor12 } from "../../api";

const ThongKeVanBanDiFor12Thang = () => {
  const [caseVanBanDiForThangs, setCaseVanBanDiForThangs] = useState([]);

  useEffect(() => {
    countCasesVanBanDiFor12({})
      .then((response) => {
        const newData = response.data.map((item, index) => ({
          ...item,
          month: `T${index + 1}`,
        }));
        setCaseVanBanDiForThangs(newData);
      })
      .catch((err) => {
        setCaseVanBanDiForThangs([]);
      });
  }, []);

  const renderAreas = () => {
    return (
      <Area
        type="monotone"
        dataKey="count"
        name="TỔNG SỐ VĂN BẢN BAN HÀNH"
        stroke="#391085"
        fill="url(#colorUv)"
      />
    );
  };

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <Row justify="center" align="middle">
        <Col span={24}>
          <AreaChart width={700} height={250} data={caseVanBanDiForThangs}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#391085" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#391085" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip contentStyle={{ fontWeight: "bold" }} />
            {renderAreas()}
          </AreaChart>
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeVanBanDiFor12Thang;
