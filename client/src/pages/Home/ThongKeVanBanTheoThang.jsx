import { Col, DatePicker, Row, Input } from "antd";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import { countCasesByMonth } from "../../api";

const ThongKeVanBanTheoThang = ({ config }) => {
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getFullYear();

  const [caseByMonths, setCaseByMonths] = useState([]);
  const [condition, setCondition] = useState({
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth, 30),
    noi_dung_van_ban: '',
    trang_thai_van_ban: '',
  });

  useEffect(() => {
    countCasesByMonth({
      startDate: condition.startDate,
      endDate: condition.endDate,
      noi_dung_van_ban: condition.noi_dung_van_ban,
      trang_thai_van_ban: condition.trang_thai_van_ban,
    })
      .then((response) => {
        setCaseByMonths(response.data);
      })
      .catch((err) => {
        setCaseByMonths([]);
      });
  }, [condition]);

  const onChange = (value) => {
    if (value && value[0] && value[1]) {
      setCondition({
        ...condition,
        startDate: value[0].format("yyyy-MM-DD"),
        endDate: value[1].format("yyyy-MM-DD"),
      });
    }
  };

  const renderBars = () => {
    return (
      config && (
        <Bar
          dataKey="no_tai_lieu"
          name="SỐ LƯỢNG VĂN BẢN"
          fill="#008000"
        />
      )
    );
  };

  return (
    <div>
      <h2>THỐNG KÊ SỐ LƯỢNG VĂN BẢN</h2>

      <Row>
        <Col span={6}>
          <DatePicker.RangePicker
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
            onChange={onChange}
          />
        </Col>
        <Col span={6}>
          <Input placeholder="NỘI DUNG VĂN BẢN"  onPressEnter={(e) => {
            setCondition({
              ...condition,
              noi_dung_van_ban: e.target.value,
            })
          }}/>
        </Col>
        <Col span={6}>
          <Input placeholder="TRẠNG THÁI VĂN BẢN TRẢ LỜI"  onPressEnter={(e) => {
            setCondition({
              ...condition,
              trang_thai_van_ban: e.target.value,
            })
          }}/>
        </Col>
      </Row>

      <br />
      <BarChart
        width={1000}
        height={300}
        data={caseByMonths}
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ten_tai_lieu" />
        <YAxis />
        <Tooltip />
        <Legend />
        {renderBars()}
      </BarChart>
    </div>
  );
};

export default ThongKeVanBanTheoThang;
