import React, { useEffect, useState } from "react";
import { Form, Row, Input, Col, Select, DatePicker, Button, TreeSelect } from "antd";
import { getConfigs } from "../api";
import { useHistory } from "react-router-dom";
import { XAY_DUNG_VAN_BAN } from "../shared/constants/index";

const SearchCaseVanBanBanHanh = ({ onSearch, onDownload }) => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    const selectedNoiNhan =
      values["noi_nhan"] && values["noi_nhan"].length > 0
        ? values["noi_nhan"][0].value
        : null;
    onSearch({
      ...values,
      noi_nhan: selectedNoiNhan,
      ngay_ban_hanh_1:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][0] &&
        values["ngay_ban_hanh"][0].format("yyyy-MM-DD"),
      ngay_ban_hanh_2:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][1] &&
        values["ngay_ban_hanh"][1].format("yyyy-MM-DD"),
    });
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });
  }, []);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const { Option } = Select;

  const searchControls = [
    {
      name: "loai_tai_lieu_id",
      label: "LOẠI TÀI LIỆU",
      render: () => {
        return (
          <Select>
            {config &&
              config["loai_tai_lieu"] &&
              config["loai_tai_lieu"].map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        );
      },
    },
    {
      name: "so_van_ban",
      label: "SỐ VĂN BẢN",
      render: () => {
        return <Input placeholder="123/BC-KH..." />;
      },
    },
    {
      name: "noi_dung_van_ban",
      label: "TRÍCH YẾU",
      render: () => {
        return <Input placeholder="ABC" />;
      },
    },
    {
      name: "ngay_ban_hanh",
      label: "NGÀY KÝ",
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
      name: "noi_nhan",
      label: "SOẠN THẢO VĂN BẢN",
      render: () => {
        return (
          <TreeSelect
            treeData={XAY_DUNG_VAN_BAN}
            placeholder="NƠI NHẬN"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
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
                history.push("/quan-ly-van-ban-ban-hanh/tao-moi");
              }}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              LẤY SỐ VĂN BẢN
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

export default SearchCaseVanBanBanHanh;
