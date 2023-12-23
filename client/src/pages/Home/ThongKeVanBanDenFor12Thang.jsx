import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend
} from "recharts";
import { countCasesVanBanDenFor12 } from "../../api";

const ThongKeVanBanDenFor12Thang = () => {
  const [caseVanBanDenForThangs, setCaseVanBanDenForThangs] = useState([]);

  useEffect(() => {
    countCasesVanBanDenFor12({})
      .then((response) => {
        const newData = response.data.map((item, index) => ({
          ...item,
          month: `T${index + 1}`,
        }));
        setCaseVanBanDenForThangs(newData);
      })
      .catch((err) => {
        setCaseVanBanDenForThangs([]);
      });
  }, []);

  const renderAreas = () => {
    return (
      <Area
        type="monotone"
        dataKey="count"
        name="TỔNG SỐ VĂN BẢN TIẾP NHẬN"
        stroke="#08979c"
        fill="url(#colorUv1)"
      />
    );
  };


  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <Row justify="center" align="middle">
        <Col span={24}>
          <AreaChart width={800} height={300} data={caseVanBanDenForThangs}>
            <defs>
              <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#08979c" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#08979c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip
              contentStyle={{ fontWeight: "bold" }} />
            {renderAreas()}
          </AreaChart>
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeVanBanDenFor12Thang;
