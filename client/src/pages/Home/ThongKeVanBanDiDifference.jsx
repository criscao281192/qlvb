import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
} from "recharts";
import { countVanBanDiForComparison } from "../../api";

const ThongKeVanBanDiDifference = () => {
  const [caseVanBanDiDifference, setCaseVanBanDiDifference] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    countVanBanDiForComparison({})
      .then((response) => {
        const newData = response.data.map((item) => ({
          month: `T${item.month}`,
          countCurrentYear: item.countCurrentYear,
          countLastYear: item.countLastYear,
        }));
        setCaseVanBanDiDifference(newData);
      })
      .catch((err) => {
        setCaseVanBanDiDifference([]);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <br />
      <Row justify="center" align="middle">
        <Col span={24}>
          <LineChart width={800} height={350} data={caseVanBanDiDifference}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Legend />
            <Tooltip contentStyle={{ fontWeight: "bold" }} />
            <Line
              type="monotone"
              dataKey="countCurrentYear"
              name={`NĂM ${currentYear}`}
              stroke="#0958d9"
            />
            <Line
              type="monotone"
              dataKey="countLastYear"
              name={`NĂM ${currentYear - 1}`}
              stroke="#13c2c2"
            />
          </LineChart>
        </Col>
      </Row>
    </div>
  );
};

export default ThongKeVanBanDiDifference;
