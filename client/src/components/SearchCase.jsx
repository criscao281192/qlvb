import React, { useEffect, useState } from "react";
import { Form, Row, Input, Col, Select, DatePicker, Button } from "antd";
import { getConfigs } from "../api";
import { useHistory } from "react-router-dom";

const SearchCase = ({ onSearch, onDownload, onDownload1 }) => {
  const [form] = Form.useForm();
  let history = useHistory();

  const onFinish = (values) => {
    onSearch({
      ...values,
      ngay_ban_hanh_1:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][0] &&
        values["ngay_ban_hanh"][0].format("yyyy-MM-DD"),
      ngay_ban_hanh_2:
        values["ngay_ban_hanh"] &&
        values["ngay_ban_hanh"][1] &&
        values["ngay_ban_hanh"][1].format("yyyy-MM-DD"),
      ngay_tiep_nhan_1:
        values["ngay_tiep_nhan"] &&
        values["ngay_tiep_nhan"][0] &&
        values["ngay_tiep_nhan"][0].format("yyyy-MM-DD"),
      ngay_tiep_nhan_2:
        values["ngay_tiep_nhan"] &&
        values["ngay_tiep_nhan"][1] &&
        values["ngay_tiep_nhan"][1].format("yyyy-MM-DD"),
      ngay_het_han_1:
        values["ngay_het_han"] &&
        values["ngay_het_han"][0] &&
        values["ngay_het_han"][0].format("yyyy-MM-DD"),
      ngay_het_han_2:
        values["ngay_het_han"] &&
        values["ngay_het_han"][1] &&
        values["ngay_het_han"][1].format("yyyy-MM-DD"),
      ngay_van_ban_tra_loi_1:
        values["ngay_van_ban_tra_loi"] &&
        values["ngay_van_ban_tra_loi"][0] &&
        values["ngay_van_ban_tra_loi"][0].format("yyyy-MM-DD"),
      ngay_van_ban_tra_loi_2:
        values["ngay_van_ban_tra_loi"] &&
        values["ngay_van_ban_tra_loi"][1] &&
        values["ngay_van_ban_tra_loi"][1].format("yyyy-MM-DD"),
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
      name: "so_tai_lieu",
      label: "SỐ TÀI LIỆU TẠI PC09",
      render: () => {
        return <Input placeholder="123" />;
      },
    },
    {
      name: "co_quan_ban_hanh_id",
      label: "CƠ QUAN BAN HÀNH VĂN BẢN",
      render: () => {
        return (
          <Select>
            {config &&
              config["co_quan_ban_hanh"] &&
              config["co_quan_ban_hanh"].map((item) => {
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
        return <Input placeholder="123" />;
      },
    },
    {
      name: "ngay_ban_hanh",
      label: "NGÀY BAN HÀNH VĂN BẢN",
      render: () => {
        return (
          <DatePicker.RangePicker
            placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]}
            format={"yyyy-MM-DD"}
          />
        );
      },
    },
    {
      name: "ngay_tiep_nhan",
      label: "NGÀY TIẾP NHẬN",
      render: () => {
        return <DatePicker.RangePicker placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]} />;
      },
    },
    {
      name: "do_mat",
      label: "ĐỘ MẬT",
      render: () => {
        return <Input placeholder="THƯỜNG / MẬT / TỐI MẬT / TUYỆT MẬT" />;
      },
    },
    {
      name: "do_khan",
      label: "ĐỘ KHẨN",
      render: () => {
        return <Input placeholder="THƯỜNG / KHẨN / THƯỢNG KHẨN / HOẢ TỐC" />;
      },
    },
    {
      name: "noi_dung_van_ban",
      label: "NỘI DUNG VĂN BẢN",
      render: () => {
        return <Input placeholder="ABC" />;
      },
    },
    {
      name: "ngay_het_han",
      label: "NGÀY HẾT HẠN",
      render: () => {
        return <DatePicker.RangePicker placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]} />;
      },
    },
    {
      name: "phu_trach_id",
      label: "CÁN BỘ - ĐỘI PHỤ TRÁCH",
      render: () => {
        return (
          <Select>
            {config &&
              config["phu_trach"] &&
              config["phu_trach"].map((item) => {
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
      name: "doi_bao_cao",
      label: "ĐỘI THỰC HIỆN BÁO CÁO",
      render: () => {
        return <Input placeholder="ĐỘI..." />;
      },
    },
    {
      name: "so_van_ban_tra_loi",
      label: "SỐ BC/KH TRẢ LỜI",
      render: () => {
        return <Input placeholder="ABC-PC09" />;
      },
    },
    {
      name: "ngay_van_ban_tra_loi",
      label: "NGÀY BC/KH TRẢ LỜI",
      render: () => {
        return <DatePicker.RangePicker placeholder={["TỪ NGÀY", "ĐẾN NGÀY"]} />;
      },
    },
    {
      name: "trang_thai_van_ban",
      label: "TRẠNG THÁI VĂN BẢN",
      render: () => {
        return <Input placeholder="ĐANG XỬ LÝ/ĐÚNG HẠN/QUÁ HẠN/LƯU" />;
      },
    },
    {
      name: "trang_thai_d2",
      label: "BÁO CÁO ĐỘI 2",
      render: () => {
        return <Input placeholder="ĐANG XỬ LÝ/ĐÚNG HẠN/QUÁ HẠN" />;
      },
    },
    {
      name: "trang_thai_d3",
      label: "BÁO CÁO ĐỘI 3",
      render: () => {
        return <Input placeholder="ĐANG XỬ LÝ/ĐÚNG HẠN/QUÁ HẠN" />;
      },
    },
    {
      name: "trang_thai_d4",
      label: "BÁO CÁO ĐỘI 4",
      render: () => {
        return <Input placeholder="ĐANG XỬ LÝ/ĐÚNG HẠN/QUÁ HẠN" />;
      },
    },
    {
      name: "trang_thai_d5",
      label: "BÁO CÁO ĐỘI 5",
      render: () => {
        return <Input placeholder="ĐANG XỬ LÝ/ĐÚNG HẠN/QUÁ HẠN" />;
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
                history.push("/quan-ly-van-ban/new");
              }}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              VĂN BẢN ĐẾN
            </Button>
            <Button
              onClick={() => {
                history.push("/quan-ly-van-ban/new2");
              }}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              VĂN BẢN ĐI
            </Button>
            <Button
              onClick={onDownload}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              FILE PHỤC VỤ BÁO CÁO
            </Button>
            <Button
              onClick={onDownload1}
              type="primary"
              style={{ marginBottom: 16, marginLeft: 8 }}
            >
              GIAO NHẬN CÔNG VĂN
            </Button>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <div>
              <Button type="primary" htmlType="submit">
                TÌM KIẾM
              </Button>
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => {
                  form.resetFields();
                }}
              >
                XÓA
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchCase;
