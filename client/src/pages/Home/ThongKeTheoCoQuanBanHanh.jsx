import React, { useState, useEffect } from "react";
import { Col, DatePicker, Row, Input } from "antd";
import { Table } from "antd";
import { countCasesByDistrict } from "../../api";

const INITIAL_COLUMNS = [
  {
    title: "CƠ QUAN BAN HÀNH VĂN BẢN",
    dataIndex: "co_quan_ban_hanh",
    key: "co_quan_ban_hanh",
  },
];

const ThongKeTheoCoQuanBanHanh = ({ config }) => {
  const [casesByDistrictsColumns, setCasesByDistrictsColumns] = useState(
    INITIAL_COLUMNS
  );
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getFullYear();

  const [caseByDistricts, setCaseByDistricts] = useState([]);
  const [condition, setCondition] = useState({
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth, 30),
    noi_dung_van_ban: '',
  });

  useEffect(() => {
    if (config) {
      const columns = config["loai_tai_lieu"].map((vv) => {
        return {
          title: vv.name,
          dataIndex: `type_${vv.id}`,
          key: `type_${vv.id}`,
          render: (data) => (data ? data : 0),
        };
      });
      setCasesByDistrictsColumns([...casesByDistrictsColumns, ...columns]);
    }
  }, [config]);

  useEffect(() => {
    countCasesByDistrict({
      startDate: condition.startDate,
      endDate: condition.endDate,
      noi_dung_van_ban: condition.noi_dung_van_ban,
    })
      .then((response) => {
        console.log(response.data);
        setCaseByDistricts(response.data);
      })
      .catch((err) => {
        setCaseByDistricts([]);
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

  return (
    <div>
      <h2>THỐNG KÊ SỐ VĂN BẢN THEO CƠ QUAN BAN HÀNH</h2>
      <Row>
        <Col span={6}>
          <DatePicker.RangePicker onChange={onChange} placeholder={['TỪ NGÀY','ĐẾN NGÀY']}/>
        </Col>
        <Col span={6}>
          <Input placeholder="NỘI DUNG VĂN BẢN"  onPressEnter={(e) => {
            setCondition({
              ...condition,
              noi_dung_van_ban: e.target.value,
            })
          }}/>
        </Col>
      </Row>
      <br />
      <Table
        rowKey={"id"}
        columns={casesByDistrictsColumns}
        dataSource={caseByDistricts}
      />
    </div>
  );
};

export default ThongKeTheoCoQuanBanHanh;
