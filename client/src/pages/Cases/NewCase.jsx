import React, { useState, useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, Space, Radio, Checkbox  } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import { useHistory, useParams } from "react-router-dom";
import moment from "moment";

import { getCase, getConfigs, kiem_tra_so_tai_lieu, postCase } from "../../api";
import { getByPlaceholderText } from "@testing-library/react";


const NewCase = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();

  const onFinish = (values) => {
    postCase(values).then((res) => {
      history.push("/quan-ly-van-ban");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [config, setConfig] = useState();

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });
    
    if (id) {
      getCase(id).then((res) => {
        form.setFieldsValue({
          id: res.data.id,
          loai_tai_lieu: res.data.loai_tai_lieu_id,
          so_tai_lieu: res.data.so_tai_lieu,
          co_quan_ban_hanh: res.data.co_quan_ban_hanh_id,
          ten_don_vi: res.data.ten_don_vi,
          so_van_ban: res.data.so_van_ban,
          ngay_ban_hanh: moment(res.data.ngay_ban_hanh),
          ngay_tiep_nhan: moment(res.data.ngay_tiep_nhan),
          do_mat: res.data.do_mat,
          do_khan: res.data.do_khan,
          noi_dung_van_ban: res.data.noi_dung_van_ban,
          yeu_cau: res.data.yeu_cau,
          ngay_het_han: moment(res.data.ngay_het_han),
          nguoi_ki: res.data.nguoi_ki,
          doi_bao_cao: res.data.doi_bao_cao,
          trang_thai_d2: res.data.trang_thai_d2,
          trang_thai_d3: res.data.trang_thai_d3,
          trang_thai_d4: res.data.trang_thai_d4,
          trang_thai_d5: res.data.trang_thai_d5,
          so_van_ban_tra_loi: res.data.so_van_ban_tra_loi,
          ngay_van_ban_tra_loi: moment(res.data.ngay_van_ban_tra_loi),
          trang_thai_van_ban: res.data.trang_thai_van_ban,
          phu_trach: res.data.phu_trach_id,
          lanh_dao_phu_trach: res.data.lanh_dao_phu_trach,
        });
      });
    }
  }, [id, form]);

  const { Option } = Select;

  const searchControls = [
    {
      name: "id",
      render: () => {
        return <Input style={{ display: "none" }} />;
      },
    },
    {
      name: "loai_tai_lieu",
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
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "so_tai_lieu",
      label: "SỐ TẠI PC09",
      render: () => {
        return <Input placeholder="SỐ THỨ TỰ TÀI LIỆU TẠI PC09/SỐ VĂN BẢN PC09 BAN HÀNH" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
        ({ getFieldValue }) => ({
          async validator(_, value) {
            const result = await kiem_tra_so_tai_lieu({
              so_tai_lieu_id: value,
              loai_tai_lieu_id: getFieldValue("loai_tai_lieu"),
              id: getFieldValue("id"),
            });
            if (result.data.result) {
              return Promise.reject(new Error("TRÙNG SỐ TÀI LIỆU TẠI PC09!"));
            }
            return Promise.resolve();
          },
        }),
      ],
    },
    {
      name: "co_quan_ban_hanh",
      label: "CƠ QUAN",
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
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "ten_don_vi",
      label: "ĐƠN VỊ BAN HÀNH VĂN BẢN",
      render: () => {
        return <Input placeholder="VÍ DỤ: PC01; PC02; PX01; PX02 " />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "so_van_ban",
      label: "SỐ VĂN BẢN",
      render: () => {
        return <Input placeholder="SỐ VĂN BẢN" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "ngay_ban_hanh",
      label: "NGÀY BAN HÀNH",
      render: () => {
        return <DatePicker placeholder={"NGÀY"} />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "ngay_tiep_nhan",
      label: "NGÀY TIẾP NHẬN",
      render: () => {
        return <DatePicker placeholder={"NGÀY"} />;
      },
      rules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("ngay_ban_hanh") < value) {
              return Promise.resolve();
            }

            return Promise.reject(
              new Error("LƯU Ý: NGÀY TIẾP NHẬN")
            );
          },
        }),
      ],
    },
    {
      name: "do_khan",
      label: "ĐỘ KHẨN CỦA VĂN BẢN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid" defaultValue="THƯỜNG">
          <Radio.Button value="THƯỜNG">THƯỜNG</Radio.Button>
          <Radio.Button value="KHẨN">KHẨN</Radio.Button>
          <Radio.Button value="THƯỢNG KHẨN">THƯỢNG KHẨN</Radio.Button>
          <Radio.Button value="HOẢ TỐC">HOẢ TỐC</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "do_mat",
      label: "ĐỘ MẬT CỦA VĂN BẢN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid" defaultValue="THƯỜNG">
          <Radio.Button value="THƯỜNG">THƯỜNG</Radio.Button>
          <Radio.Button value="MẬT">MẬT</Radio.Button>
          <Radio.Button value="TỐI MẬT">TỐI MẬT</Radio.Button>
          <Radio.Button value="TUYỆT MẬT">TUYỆT MẬT</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "noi_dung_van_ban",
      label: "NỘI DUNG VĂN BẢN",
      render: () => {
        return <Input placeholder="NỘI DUNG VĂN BẢN" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "yeu_cau",
      label: "YÊU CẦU",
      render: () => {
        return <Input placeholder="YÊU CẦU CỤ THỂ/BÁO CÁO ĐỊNH KỲ" />;
      },
      rules: [],
    },
    {
      name: "ngay_het_han",
      label: "NGÀY HẾT HẠN",
      render: () => {
        return <DatePicker placeholder={"NGÀY"} />;
      },
      rules: [],
    },
    {
      name: "nguoi_ki",
      label: "LÃNH ĐẠO KÍ VĂN BẢN",
      render: () => {
        return <Input placeholder="Đ/c Nguyễn Văn A" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "doi_bao_cao",
      label: "ĐỘI THỰC HIỆN BÁO CÁO",
      render: () => {
        return <Input placeholder="ĐỘI.../NGÀY" />;
      },
      rules: [],
    },
    {
      name: "trang_thai_d2",
      label: "KẾT QUẢ BÁO CÁO ĐỘI 2",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
          <Radio.Button value="ĐÚNG HẠN">ĐÚNG HẠN</Radio.Button>
          <Radio.Button value="QUÁ HẠN">QUÁ HẠN</Radio.Button>
          <Radio.Button value="CHẬM MUỘN">CHẬM MUỘN</Radio.Button>
          <Radio.Button value="KHÔNG BÁO CÁO">KHÔNG BÁO CÁO</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "trang_thai_d3",
      label: "KẾT QUẢ BÁO CÁO ĐỘI 3",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid" >
          <Radio.Button value="ĐÚNG HẠN">ĐÚNG HẠN</Radio.Button>
          <Radio.Button value="QUÁ HẠN">QUÁ HẠN</Radio.Button>
          <Radio.Button value="CHẬM MUỘN">CHẬM MUỘN</Radio.Button>
          <Radio.Button value="KHÔNG BÁO CÁO">KHÔNG BÁO CÁO</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "trang_thai_d4",
      label: "KẾT QUẢ BÁO CÁO ĐỘI 4",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
          <Radio.Button value="ĐÚNG HẠN">ĐÚNG HẠN</Radio.Button>
          <Radio.Button value="QUÁ HẠN">QUÁ HẠN</Radio.Button>
          <Radio.Button value="CHẬM MUỘN">CHẬM MUỘN</Radio.Button>
          <Radio.Button value="KHÔNG BÁO CÁO">KHÔNG BÁO CÁO</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "trang_thai_d5",
      label: "KẾT QUẢ BÁO CÁO ĐỘI 5",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid" >
          <Radio.Button value="ĐÚNG HẠN">ĐÚNG HẠN</Radio.Button>
          <Radio.Button value="QUÁ HẠN">QUÁ HẠN</Radio.Button>
          <Radio.Button value="CHẬM MUỘN">CHẬM MUỘN</Radio.Button>
          <Radio.Button value="KHÔNG BÁO CÁO">KHÔNG BÁO CÁO</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "so_van_ban_tra_loi",
      label: "SỐ BC/KH TRẢ LỜI",
      render: () => {
        return <Input placeholder="123/BC-KH-PC09" />;
      },
      rules: [],
    },
    {
      name: "ngay_van_ban_tra_loi",
      label: "NGÀY BC/KH TRẢ LỜI",
      render: () => {
        return <DatePicker placeholder={"NGÀY"} />;
      },
      rules: [
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("ngay_tiep_nhan") < value) {
              return Promise.resolve();
            }

            return Promise.reject(
              new Error("LƯU Ý: NGÀY TRÊN VĂN BẢN TRẢ LỜI")
            );
          },
        }),
      ],
    },
    {
      name: "trang_thai_van_ban",
      label: "TRẠNG THÁI BC/KH",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
          <Radio.Button value="LƯU">LƯU</Radio.Button>
          <Radio.Button value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</Radio.Button>
          <Radio.Button value="ĐÚNG HẠN">ĐÚNG HẠN</Radio.Button>
          <Radio.Button value="QUÁ HẠN">QUÁ HẠN</Radio.Button>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "lanh_dao_phu_trach",
      label: "LÃNH ĐẠO PHỤ TRÁCH",
      render: () => {
        return (
          <Radio.Group >
          <Space direction="vertical">
          <Radio value="Đ/c Dũng -TP">Thượng tá Lê Việt Dũng</Radio>
          <Radio value="Đ/c Tuyến -PTP">Trung tá Nguyễn Văn Tuyến</Radio>
          <Radio value="Đ/c Tiến -PTP">Thượng tá Lê Minh Tiến</Radio>
          <Radio value="Đ/c Quyết -PTP">Thượng tá Đinh Gia Quyết</Radio>
          </Space>
          </Radio.Group>
        );
      },
      rules: [],
    },
    {
      name: "phu_trach",
      label: "CÁN BỘ THEO DÕI",
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

export default NewCase;
