import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Radio, TreeSelect } from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { postPerson, getConfigPerson, getCasePerson } from "../../api/person";
import { DON_VI } from "../../shared/constants";

const NewCasePerson = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const onFinish = (values) => {
    if (values.ngay_sinh) {
      values.ngay_sinh = moment(values.ngay_sinh).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    postPerson(values).then((res) => {
      history.push("/quan-ly-than-nhan-can-bo");
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigPerson().then((data) => {
      setConfig(data);
    });

    if (id) {
      getCasePerson(id).then((res) => {
        form.setFieldsValue({
          id: res.data.id,
          ho_ten: res.data.ho_ten,
          gioi_tinh: res.data.gioi_tinh,
          ngay_sinh: moment(res.data.ngay_sinh),
          que_quan: res.data.que_quan,
          can_bo: res.data.can_bo,
          ma_so_the: res.data.ma_so_the,
          don_vi_cong_tac: res.data.don_vi_cong_tac,
          trang_thai: res.data.trang_thai,
        });
      });
    }
  }, [id, form]);

  const searchControls = [
    {
      name: "id",
      render: () => {
        return <Input style={{ display: "none" }} />;
      },
    },
    {
      name: "ho_ten",
      label: "HỌ VÀ TÊN",
      render: () => {
        return <Input placeholder="NGUYỄN VĂN A" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "gioi_tinh",
      label: "GIỚI TÍNH",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Nam"> NAM </Radio.Button>
            <Radio.Button value="Nữ"> NỮ </Radio.Button>
          </Radio.Group>
        );
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "ngay_sinh",
      label: "NGÀY SINH",
      render: () => {
        return (
          <DatePicker
            format={dateFormatList}
            showTime={false}
            placeholder={"NGÀY"}
          />
        );
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "que_quan",
      label: "QUÊ QUÁN",
      render: () => {
        return <Input placeholder="XÃ - HUYỆN - TỈNH" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "can_bo",
      label: "THÂN NHÂN CÁN BỘ",
      render: () => {
        return <Input placeholder="Nguyễn Văn A" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "don_vi_cong_tac",
      label: "ĐƠN VỊ CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%", textAlign: "left" }}
            treeData={DON_VI}
            placeholder="ĐƠN VỊ CÔNG TÁC"
          />
        );
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "ma_so_the",
      label: "MÃ SỐ THẺ",
      render: () => {
        return <Input placeholder="ABC 123456789" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "trang_thai",
      label: "TRẠNG THÁI",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="1"> ĐANG SỬ DỤNG </Radio.Button>
            <Radio.Button value="0"> HẾT HẠN </Radio.Button>
          </Radio.Group>
        );
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
  ];

  const getFields = () => {
    return searchControls.map((control, i) => {
      return (
        <Form.Item
          name={control.name}
          label={control.label}
          wrapperCol={{
            offset: 3,
            span: 10,
          }}
          rules={control.rules}
          validateTrigger="onBlur"
        >
          {control.render()}
        </Form.Item>
      );
    });
  };

  return (
    <Form
      form={form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        marginTop: 24,
      }}
    >
      {getFields()}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          NHẬP
        </Button>
        <Button
          type="default"
          style={{ margin: "0 8px" }}
          onClick={() => {
            form.resetFields();
          }}
        >
          RESET
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCasePerson;
