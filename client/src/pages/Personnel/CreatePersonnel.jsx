import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Radio, TreeSelect } from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  postPersonnel,
  getConfigPersonnel,
  getCasePersonnel,
} from "../../api/personnel";
import { CHUC_VU, DON_VI, LINH_VUC } from "../../shared/constants";

const NewCasePersonnel = () => {
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
    if (values.ngay_vao_nganh) {
      values.ngay_vao_nganh = moment(values.ngay_vao_nganh).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    if (values.ngay_vao_dang) {
      values.ngay_vao_dang = moment(values.ngay_vao_dang).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    if (values.ngay_bo_nhiem) {
      values.ngay_bo_nhiem = moment(values.ngay_bo_nhiem).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    postPersonnel(values).then((res) => {
      history.push("/quan-ly-can-bo");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigPersonnel().then((data) => {
      setConfig(data);
    });

    if (id) {
      getCasePersonnel(id).then((res) => {
        form.setFieldsValue({
          id: res.data.id,
          ho_ten: res.data.ho_ten,
          que_quan: res.data.que_quan,
          ngay_sinh: moment(res.data.ngay_sinh),
          so_hieu: res.data.so_hieu,
          doi_cong_tac: res.data.doi_cong_tac,
          linh_vuc_cong_tac: res.data.linh_vuc_cong_tac,
          chuc_vu: res.data.chuc_vu,
          ngay_bo_nhiem: moment(res.data.ngay_bo_nhiem),
          ngay_vao_nganh: moment(res.data.ngay_vao_nganh),
          ngay_vao_dang: moment(res.data.ngay_vao_dang),
          trinh_do_ly_luan: res.data.trinh_do_ly_luan,
          trinh_do_dao_tao: res.data.trinh_do_dao_tao,
          trinh_do_cong_an: res.data.trinh_do_cong_an,
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
        return (
          <Input placeholder="xã/phường/thị trấn - huyện/thị xã/quận - tỉnh/Thành phố" />
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
      name: "doi_cong_tac",
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
      name: "so_hieu",
      label: "SỐ HIỆU",
      render: () => {
        return <Input placeholder="123 - 456" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "linh_vuc_cong_tac",
      label: "LĨNH VỰC CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%", textAlign: "left" }}
            treeData={LINH_VUC}
            placeholder="LĨNH VỰC CÔNG TÁC"
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
      name: "ngay_vao_nganh",
      label: "NGÀY VÀO NGÀNH",
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
      name: "chuc_vu",
      label: "CHỨC VỤ",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%", textAlign: "left" }}
            treeData={CHUC_VU}
            placeholder="CHỨC VỤ"
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
      name: "ngay_bo_nhiem",
      label: "NGÀY BỔ NHIỆM",
      render: () => {
        return (
          <DatePicker
            format={dateFormatList}
            showTime={false}
            placeholder={"NGÀY"}
          />
        );
      },
      rules: [],
    },
    {
      name: "ngay_vao_dang",
      label: "NGÀY VÀO ĐẢNG",
      render: () => {
        return (
          <DatePicker
            format={dateFormatList}
            showTime={false}
            placeholder={"NGÀY"}
          />
        );
      },
      rules: [],
    },
    {
      name: "trinh_do_ly_luan",
      label: "TRÌNH ĐỘ LÝ LUẬN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="SƠ CẤP"> SƠ CẤP </Radio.Button>
            <Radio.Button value="TRUNG CẤP">TRUNG CẤP</Radio.Button>
            <Radio.Button value="CAO CẤP">CAO CẤP</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "trinh_do_dao_tao",
      label: "TRÌNH ĐỘ ĐÀO TẠO",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="SƠ CẤP"> SƠ CẤP </Radio.Button>
            <Radio.Button value="TRUNG CẤP"> TRUNG CẤP </Radio.Button>
            <Radio.Button value="CAO ĐẲNG"> CAO ĐẲNG </Radio.Button>
            <Radio.Button value="ĐẠI HỌC"> ĐẠI HỌC </Radio.Button>
            <Radio.Button value="THẠC SĨ"> THẠC SĨ </Radio.Button>
            <Radio.Button value="TIẾN SĨ"> TIẾN SĨ </Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "trinh_do_cong_an",
      label: "NGHIỆP VỤ CÔNG AN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="SƠ CẤP"> SƠ CẤP </Radio.Button>
            <Radio.Button value="TRUNG CẤP"> TRUNG CẤP </Radio.Button>
            <Radio.Button value="CAO ĐẲNG"> CAO ĐẲNG </Radio.Button>
            <Radio.Button value="ĐẠI HỌC"> ĐẠI HỌC </Radio.Button>
            <Radio.Button value="THẠC SĨ"> THẠC SĨ </Radio.Button>
            <Radio.Button value="TIẾN SĨ"> TIẾN SĨ </Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
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

export default NewCasePersonnel;
