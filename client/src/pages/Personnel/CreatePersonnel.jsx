import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Button, Radio, TreeSelect } from "antd";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  postPersonnel,
  getConfigPersonnel,
  getCasePersonnel,
} from "../../api/personnel";
import { CHUC_VU, DON_VI, DOAN_THE, CHUC_VU_DANG, CHUC_DANH, CAP_BAC } from "../../shared/constants";

const NewCasePersonnel = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const { TextArea } = Input;

  const onFinish = (values) => {
    if (Array.isArray(values.doan_the)) {
      values.doan_the = values.doan_the.map((item) => item.value).join(", ");
    }
    if (Array.isArray(values.chuc_vu_dang)) {
      values.chuc_vu_dang = values.chuc_vu_dang.map((item) => item.value).join(", ");
    }
    if (Array.isArray(values.chuc_danh)) {
      values.chuc_danh = values.chuc_danh.map((item) => item.value).join(", ");
    }
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
          gioi_tinh: res.data.gioi_tinh,
          ngay_sinh: moment(res.data.ngay_sinh),
          que_quan: res.data.que_quan,
          noi_o_hien_nay: res.data.noi_o_hien_nay,
          don_vi_cong_tac: res.data.don_vi_cong_tac,
          so_hieu: res.data.so_hieu,
          cap_bac: res.data.cap_bac,
          doan_the: res.data.doan_the,
          chuc_vu: res.data.chuc_vu,
          ngay_bo_nhiem: moment(res.data.ngay_bo_nhiem),
          chuc_vu_dang: res.data.chuc_vu_dang,
          dan_toc: res.data.dan_toc,
          ngay_vao_nganh: moment(res.data.ngay_vao_nganh),
          ngay_vao_dang: moment(res.data.ngay_vao_dang),
          ngay_vao_dang_chinh_thuc: moment(res.data.ngay_vao_dang_chinh_thuc),
          trinh_do_ly_luan: res.data.trinh_do_ly_luan,
          trinh_do_dao_tao: res.data.trinh_do_dao_tao,
          trinh_do_cong_an: res.data.trinh_do_cong_an,
          chuc_danh: res.data.chuc_danh,
          qua_trinh_cong_tac: res.data.qua_trinh_cong_tac,
          qua_trinh_len_luong: res.data.qua_trinh_len_luong,
          xep_loai_can_bo: res.data.xep_loai_can_bo,
          khen_thuong: res.data.khen_thuong,
          ky_luat: res.data.ky_luat,

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
        return (
          <Input placeholder="XÃ/PHƯỜNG/THỊ TRẤN - QUẬN/HUYỆN/THỊ XÃ/THÀNH PHỐ - TỈNH/THÀNH PHỐ" />
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
      name: "noi_o_hien_nay",
      label: "NƠI Ở HIỆN NAY",
      render: () => {
        return (
          <Input placeholder="XÃ/PHƯỜNG/THỊ TRẤN - QUẬN/HUYỆN/THỊ XÃ/THÀNH PHỐ - TỈNH/THÀNH PHỐ" />
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
      name: "so_hieu",
      label: "SỐ HIỆU",
      render: () => {
        return <Input placeholder="123 - 456" />;
      },
      rules: [],
    },
    {
      name: "cap_bac",
      label: "CẤP BẬC",
      render: () => {
        return (
          <TreeSelect
            treeData={CAP_BAC}
            placeholder="CẤP BẬC HÀM"
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
      name: "doan_the",
      label: "ĐẢNG - ĐOÀN THỂ",
      render: () => {
        return (
          <TreeSelect
            treeData={DOAN_THE}
            placeholder="ĐẢNG VIÊN - ĐOÀN VIÊN - HỘI VIÊN HỘI PHỤ NỮ"
            treeCheckable={true}
            treeCheckStrictly={true}
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
      rules: [],
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
      name: "chuc_vu_dang",
      label: "CHỨC VỤ ĐẢNG/ĐOÀN THỂ",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%", textAlign: "left" }}
            treeData={CHUC_VU_DANG}
            placeholder="CHỨC VỤ ĐẢNG/ĐOÀN THỂ"
            treeCheckable={true}
            treeCheckStrictly={true}
          />
        );
      },
      rules: [],
    },
    {
      name: "dan_toc",
      label: "DÂN TỘC",
      render: () => {
        return (
          <Input placeholder="Kinh, Tày, Nùng, Mường, Ê-đê ..." />
        );
      },
      rules: [],
    },
    {
      name: "ngay_vao_nganh",
      label: "NGÀY TUYỂN DỤNG",
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
      name: "ngay_vao_dang_chinh_thuc",
      label: "NGÀY CHUYỂN ĐẢNG CHÍNH THỨC",
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
      name: "trinh_do_dao_tao",
      label: "TRÌNH ĐỘ ĐÀO TẠO",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="Sơ cấp"> SƠ CẤP </Radio.Button>
            <Radio.Button value="Trung cấp"> TRUNG CẤP </Radio.Button>
            <Radio.Button value="Cao đẳng"> CAO ĐẲNG </Radio.Button>
            <Radio.Button value="Đại học"> ĐẠI HỌC </Radio.Button>
            <Radio.Button value="Thạc sĩ"> THẠC SĨ </Radio.Button>
            <Radio.Button value="Tiến sĩ"> TIẾN SĨ </Radio.Button>
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
            <Radio.Button value="Sơ cấp"> SƠ CẤP </Radio.Button>
            <Radio.Button value="Trung cấp"> TRUNG CẤP </Radio.Button>
            <Radio.Button value="Cao đẳng"> CAO ĐẲNG </Radio.Button>
            <Radio.Button value="Đại học"> ĐẠI HỌC </Radio.Button>
            <Radio.Button value="Thạc sĩ"> THẠC SĨ </Radio.Button>
            <Radio.Button value="Tiến sĩ"> TIẾN SĨ </Radio.Button>
          </Radio.Group>
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
            <Radio.Button value="Không"> KHÔNG </Radio.Button>
            <Radio.Button value="Sơ cấp"> SƠ CẤP </Radio.Button>
            <Radio.Button value="Trung cấp">TRUNG CẤP</Radio.Button>
            <Radio.Button value="Cao cấp">CAO CẤP</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {

      name: "chuc_danh",
      label: "CHỨC DANH",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%", textAlign: "left" }}
            treeData={CHUC_DANH}
            placeholder="CHỨC DANH"
            treeCheckable={true}
            treeCheckStrictly={true}
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
      name: "qua_trinh_cong_tac",
      label: "QUÁ TRÌNH CÔNG TÁC",
      render: () => {
        return <TextArea
          rows={6}
          placeholder="- Từ tháng, năm đến tháng năm: .../... - .../...: Chức danh? Chức vụ? Đơn vị công tác: ..." />
      },
      rules: [],
    },
    {
      name: "qua_trinh_len_luong",
      label: "QUÁ TRÌNH LÊN LƯƠNG",
      render: () => {
        return <TextArea
          rows={5}
          placeholder="- Thời gian: .../...; Ngạch/bậc: ...; Hệ số lương: ...?"
          der
        />;
      },
      rules: [],
    },
    {
      name: "xep_loai_can_bo",
      label: "XẾP LOẠI CÁN BỘ",
      render: () => {
        return (
          <TextArea
            rows={6}
            placeholder="- Năm .....: Mức xếp loại?"
            defaultValue={`- Năm 2019:\n- Năm 2020:\n- Năm 2021:\n- Năm 2022:\n- Năm 2023:\n- Năm 2024:`}
          />
        );
      },
      rules: [],
    },
    {
      name: "khen_thuong",
      label: "KHEN THƯỞNG",
      render: () => {
        return <TextArea
          rows={6}
          placeholder="- Năm .....: Hình thức khen thưởng?" />;
      },
      rules: [],
    },
    {
      name: "ky_luat",
      label: "KỶ LUẬT",
      render: () => {
        return <TextArea
          rows={6}
          placeholder="- Năm .....: Hình thức xử lý kỷ luật?" />;
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
