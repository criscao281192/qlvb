import React, { useEffect, useState } from "react";
import { Col, DatePicker, Row, Select } from "antd";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Bar,
} from "recharts";

import { countCasesVanBanDi } from "../../api";
import { XAY_DUNG_VAN_BAN } from "../../shared/constants";

const { Option } = Select;

const ThongKeVanBanDi = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [caseVanBanDis, setCaseVanBanDis] = useState([]);
  const [condition, setCondition] = useState({
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth, 30),
    noi_nhan: '',
  });

  const hasData = () => {
    return caseVanBanDis.some((item) => item.no_loai_tai_lieu > 0);
  };

  const filterData = () => {
    return caseVanBanDis.filter((item) => item.no_loai_tai_lieu > 0);
  };

  useEffect(() => {
    countCasesVanBanDi({
      startDate: condition.startDate,
      endDate: condition.endDate,
      noi_nhan: condition.noi_nhan,
    })
      .then((response) => {
        setCaseVanBanDis(response.data);
      })
      .catch((err) => {
        setCaseVanBanDis([]);
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
    if (hasData()) {
      return (
        <Bar
          dataKey="no_loai_tai_lieu"
          name="SỐ LƯỢNG VĂN BẢN"
          fill="#0958d9"
        />
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "32px", fontWeight: "bold", color: '#0958d9' }}>THỐNG KÊ VĂN BẢN ĐI</div>
      <br />
      <Row>
        <Col span={12}>
          <DatePicker.RangePicker
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
            onChange={onChange}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="THỰC HIỆN"
            style={{ width: "80%" }}
            value={condition.noi_nhan}
            onChange={(value) => {
              setCondition({
                ...condition,
                noi_nhan: value,
              });
            }}
          >
            {XAY_DUNG_VAN_BAN.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <br />
      {filterData().length > 0 ? (
        <div style={{ display: 'flex' }}>
          <BarChart width={800} height={250} data={filterData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ten_loai_tai_lieu" tickFormatter={(name) => {

              if (name === "BÁO CÁO") {
                return "BC";
              }
              if (name === "CHƯƠNG TRÌNH") {
                return "CTr";
              }
              if (name === "CÔNG VĂN") {
                return "CV";
              }
              if (name === "TRÍCH SAO") {
                return "TTs";
              }
              if (name === "GIẤY MỜI") {
                return "GM";
              }
              if (name === "HƯỚNG DẪN") {
                return "HD";
              }
              if (name === "KẾ HOẠCH") {
                return "KH";
              }
              if (name === "PHƯƠNG ÁN") {
                return "PA";
              }
              if (name === "QUYẾT ĐỊNH") {
                return "QĐ";
              }
              if (name === "THÔNG BÁO") {
                return "TB";
              }
              if (name === "YÊU CẦU") {
                return "YC";
              }
              if (name === "TỜ TRÌNH") {
                return "TTr";
              }
              if (name === "BÁO CÁO-ĐTN") {
                return "BC-ĐTN";
              }
              if (name === "GIẤY XÁC NHẬN") {
                return "GXN";
              }
              if (name === "GIẤY GIỚI THIỆU") {
                return "GTT";
              }
              return name;
            }} />
            <YAxis />
            <Tooltip />
            {renderBars()}
          </BarChart>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#00474f" }}>KHÔNG CÓ DỮ LIỆU</div>
        </div>
      )}

    </div>
  );
};

export default ThongKeVanBanDi;