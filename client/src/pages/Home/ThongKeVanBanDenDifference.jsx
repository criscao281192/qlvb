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
  ResponsiveContainer,
} from "recharts";
import { countVanBanDenForComparison } from "../../api";

const ThongKeVanBanDenDifference = () => {
  const [caseVanBanDenDifference, setCaseVanBanDenDifference] = useState([]);
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  useEffect(() => {
    countVanBanDenForComparison({})
      .then((response) => {
        const newData = response.data.map((item) => ({
          month: `T${item.month}`,
          countCurrentYear: item.countCurrentYear,
          countLastYear: item.countLastYear,
        }));
        setCaseVanBanDenDifference(newData);
      })
      .catch((err) => {
        setCaseVanBanDenDifference([]);
      });
  }, []);

  return (
    <div >
      <ResponsiveContainer width="100%" height={350}>
        <LineChart width={800} height={350} data={caseVanBanDenDifference}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Legend />
          <Tooltip contentStyle={{ fontWeight: "bold" }} />
          <Line
            type="monotone"
            dataKey="countCurrentYear"
            name={`NĂM ${currentYear}`}
            stroke="#f5222d"
          />
          <Line
            type="monotone"
            dataKey="countLastYear"
            name={`NĂM ${lastYear}`}
            stroke="#389e0d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThongKeVanBanDenDifference;
