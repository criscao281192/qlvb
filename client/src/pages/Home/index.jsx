import React, { useEffect, useState } from "react";
import { getConfigs } from "../../api";
import ThongKeVanBanDi from "./ThongKeVanBanDi";
import ThongKeVanBanDen from "./ThongKeVanBanDen";
import ThongKeVanBanDenDifference from "./ThongKeVanBanDenDifference";
import ThongKeVanBanDiDifference from "./ThongKeVanBanDiDifference";
import { Col, Row } from "antd";

const ThongKe = () => {
  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });
  }, []);

  return (
    <div
    >
      
      <Row>
        <Col span={12}>
          <ThongKeVanBanDen config={config} />
        </Col>
        <Col span={12}>
          <ThongKeVanBanDi config={config} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <ThongKeVanBanDenDifference config={config} />
        </Col>
        <Col span={12}>
          <ThongKeVanBanDiDifference config={config} />
        </Col>
      </Row>
    </div>
  );
};

export default ThongKe;
