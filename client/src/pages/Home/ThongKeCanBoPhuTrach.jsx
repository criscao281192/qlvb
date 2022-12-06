import React, { useState, useEffect } from "react";
import { Col, DatePicker, Row, Input } from "antd";
import { Table } from "antd";
import { countCasesByCreator } from "../../api";

const INITIAL_COLUMNS = [
  {
    title: "CÁN BỘ - ĐỘI PHỤ TRÁCH",
    dataIndex: "phu_trach",
    key: "phu_trach",
  },
];

const ThongKeCanBoPhuTrach = ({ config }) => {
  const [casesByCreatorsColumns, setCasesByCreatorsColumns] = useState(
    INITIAL_COLUMNS
  );
  const currentMonth = new Date().getUTCMonth();
  const currentYear = new Date().getFullYear();

  const [caseByCreators, setCaseByCreators] = useState([]);
  const [condition, setCondition] = useState({
    startDate: new Date(currentYear, currentMonth, 1),
    endDate: new Date(currentYear, currentMonth, 30),
    trang_thai_van_ban: '',
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
      setCasesByCreatorsColumns([...casesByCreatorsColumns, ...columns]);
    }
  }, [config]);

  useEffect(() => {
    countCasesByCreator({
      startDate: condition.startDate,
      endDate: condition.endDate,
      trang_thai_van_ban: condition.trang_thai_van_ban,
    })
      .then((response) => {
        setCaseByCreators(response.data);
      })
      .catch((err) => {
        setCaseByCreators([]);
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
      <h2>THỐNG KÊ SỐ LƯỢNG VĂN BẢN THEO CÁN BỘ</h2>
      <Row>
        <Col span={6}>
          <DatePicker.RangePicker
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
            onChange={onChange}
          />
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
      <Table
        rowKey={"id"}
        columns={casesByCreatorsColumns}
        dataSource={caseByCreators}
      />
    </div>
  );
};

export default ThongKeCanBoPhuTrach;
