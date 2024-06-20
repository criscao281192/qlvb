import React, { useEffect, useState } from "react";
import { Form, Row, Input, Col, DatePicker, Button, TreeSelect } from "antd";
import { getConfigPerson } from "../api/person";
import { useHistory } from "react-router-dom";
import {
  DON_VI,
} from "../shared/constants/index";

const SearchCaseThanNhanCanBo = ({ onSearch, onDownload }) => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    const selectedDoiCongTac =
      values["don_vi_cong_tac"] && values["don_vi_cong_tac"].length > 0
        ? values["don_vi_cong_tac"][0].value
        : null;
    onSearch({
      ...values,
      don_vi_cong_tac: selectedDoiCongTac,
      ngay_sinh_1:
        values["ngay_sinh"] &&
        values["ngay_sinh"][0] &&
        values["ngay_sinh"][0].format("yyyy-MM-DD"),
      ngay_sinh_2:
        values["ngay_sinh"] &&
        values["ngay_sinh"][1] &&
        values["ngay_sinh"][1].format("yyyy-MM-DD"),
    });
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigPerson().then((data) => {
      setConfig(data);
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const searchControls = [
    {
      name: "ho_ten",
      label: "HỌ VÀ TÊN",
      render: () => {
        return <Input placeholder="Nguyễn Văn A" />;
      },
    },
    {
      name: "ngay_sinh",
      label: "NGÀY SINH",
      render: () => {
        return (
          <DatePicker.RangePicker
            style={{ width: "100%" }}
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
          />
        );
      },
    },
    {
      name: "que_quan",
      label: "QUÊ QUÁN",
      render: () => {
        return <Input placeholder="XÃ - HUYỆN - TỈNH" />;
      },
    },
    {
      name: "can_bo",
      label: "THÂN NHÂN CÁN BỘ",
      render: () => {
        return <Input placeholder="NGUYỄN VĂN A" />;
      },
    },
    {
      name: "don_vi_cong_tac",
      label: "ĐƠN VỊ CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            treeData={DON_VI}
            placeholder="ĐƠN VỊ"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
    },
    {
      name: "ma_so_the",
      label: "MÃ SỐ THẺ",
      render: () => {
        return <Input placeholder="ABCD 123456" />;
      },
    },
  ];

  const getFields = () => {
    return searchControls.map((control, i) => {
      return (
        <Col span={8} key={i}>
          <Form.Item name={control.name} label={control.label}>
            {control.render()}
          </Form.Item>
        </Col>
      );
    });
  };

  const onReset = () => {
    form.resetFields();
    window.location.reload();
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={12} style={{ textAlign: "left" }}>
            <Button
              onClick={() => {
                history.push("/quan-ly-than-nhan-can-bo/them-moi");
              }}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              THÊM THÂN NHÂN CÁN BỘ MỚI
            </Button>
            <Button
              onClick={onDownload}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              TẢI DANH SÁCH
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <div>
              <Button type="primary" htmlType="submit">
                TÌM KIẾM
              </Button>
              <Button style={{ margin: "0 8px" }} onClick={onReset}>
                XÓA
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchCaseThanNhanCanBo;
