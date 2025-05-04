import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  TreeSelect,
} from "antd";
import { useHistory, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { XAY_DUNG_VAN_BAN } from "../../shared/constants";
import { getCase, getConfigs, lay_so_van_ban_di, postCase } from "../../api";

const NewCaseVanBanBanHanh = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const { TextArea } = Input;

  const onFinish = (values) => {
    if (typeof values.noi_dung_van_ban === "string") {
      values.noi_dung_van_ban = values.noi_dung_van_ban
        .split("\n")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("\n");
    }

    if (values.ngay_ban_hanh) {
      values.ngay_ban_hanh = moment(values.ngay_ban_hanh).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }

    if (Array.isArray(values.noi_nhan)) {
      values.noi_nhan = values.noi_nhan.map((item) => item.value).join(", ");
    }

    const currentDate = moment();
    values.createdAt = currentDate.format("YYYY-MM-DDT13:00:00.000Z");
    values.createdBy = userFullName;
    postCase(values).then((res) => {
      history.push("/quan-ly-van-ban-ban-hanh");
      window.location.href = "/quan-ly-van-ban-ban-hanh";
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [config, setConfig] = useState();

  const [userFullName, setUserFullName] = useState(null);
  useEffect(() => {
    const userInfo = jwtDecode(localStorage.getItem("accessToken"));
    if (userInfo) {
      setUserFullName(userInfo.fullname);
    }
  }, []);

  useEffect(() => {
    getConfigs().then((data) => {
      setConfig(data);
    });

    if (id) {
      getCase(id).then((res) => {
        form.setFieldsValue({
          id: res.data.id,
          loai_tai_lieu: res.data.loai_tai_lieu_id,
          van_ban_den: res.data.van_ban_den_id,
          van_ban_den_so: res.data.van_ban_den_so,
          ten_don_vi: res.data.ten_don_vi,
          so_van_ban: res.data.so_van_ban,
          ngay_ban_hanh: moment(res.data.ngay_ban_hanh),
          ngay_tiep_nhan: moment(res.data.ngay_tiep_nhan),
          do_mat: res.data.do_mat,
          do_khan: res.data.do_khan,
          noi_dung_van_ban: res.data.noi_dung_van_ban,
          ngay_het_han: moment(res.data.ngay_het_han),
          noi_nhan: res.data.noi_nhan,
          trang_thai_van_ban: res.data.trang_thai_van_ban,
          createdAt: res.data.createdAt,
          createdBy: res.data.createdBy,
          updatedAt: res.data.updatedAt,
          updatedBy: res.data.updatedBy,
        });
      });
    }
  }, [id, form]);

  const { Option } = Select;

  const laysovanbandi = async (loai_tai_lieu_id) => {
    const result = await lay_so_van_ban_di({
      loai_tai_lieu_id: loai_tai_lieu_id,
    });
    if (result.data.result) {
      console.log(result.data.result);
    }

    let tenviettat = "";
    switch (loai_tai_lieu_id) {
      case 1:
        tenviettat = "/BC-PC09";
        break;
      case 2:
        tenviettat = "/CTr-PC09";
        break;
      case 3:
        tenviettat = "/PC09";
        break;
      case 4:
        tenviettat = "/GGT-PC09";
        break;
      case 5:
        tenviettat = "/GM-PC09";
        break;
      case 6:
        tenviettat = "/GXN-PC09";
        break;
      case 7:
        tenviettat = "/HD-PC09";
        break;
      case 8:
        tenviettat = "/KH-PC09";
        break;
      case 9:
        tenviettat = "/PA-PC09";
        break;
      case 10:
        tenviettat = "/QĐ-PC09";
        break;
      case 11:
        tenviettat = "/TB-PC09";
        break;
      case 12:
        tenviettat = "/TTr-PC09";
        break;
      case 13:
        tenviettat = "/TrS-PC09";
        break;
      case 14:
        tenviettat = "/YC-PC09";
        break;
      case 15:
        tenviettat = "/SY-PC09";
        break;
      case 29:
        tenviettat = "/BQHS-PC09";
        break;
      default:
        break;
    }

    form.setFieldsValue({
      so_van_ban: `${result.data.result}${tenviettat}`,
      ten_don_vi: `PC09`,
      ngay_ban_hanh: moment(),
      do_mat: `THƯỜNG`,
      do_khan: `THƯỜNG`,
    });
  };

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
          <Select onChange={laysovanbandi}>
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
      name: "ten_don_vi",
      label: "ĐƠN VỊ",
      render: () => {
        return <Input placeholder="PC09" disabled />;
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
        return <Input placeholder="..." />;
      },
      rules: [],
    },
    {
      name: "ngay_ban_hanh",
      label: "NGÀY BAN HÀNH",
      render: () => {
        return (
          <DatePicker
            format={dateFormatList}
            disabled
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
      name: "do_khan",
      label: "ĐỘ KHẨN",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button defaultChecked value="THƯỜNG">
              THƯỜNG
            </Radio.Button>
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
      label: "ĐỘ MẬT",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="THƯỜNG" defaultChecked>
              THƯỜNG
            </Radio.Button>
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
      label: "TRÍCH YẾU",
      render: () => {
        return (
          <div className="input-with-icon">
            <TextArea
              rows={4}
            />
          </div>
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
      name: "noi_nhan",
      label: "SOẠN THẢO VĂN BẢN",
      render: () => {
        return (
          <TreeSelect
            treeData={XAY_DUNG_VAN_BAN}
            placeholder="SOẠN THẢO VĂN BẢN"
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
    // {
    //   name: "file_van_ban",
    //   label: "VĂN BẢN",
    //   render: () => {
    //     return (
    //       <>
    //         <Upload {...props}>
    //           <Button icon={<UploadOutlined />}>TẢI VĂN BẢN</Button>
    //         </Upload>
    //       </>
    //     );
    //   },
    //   rules: [],
    // },
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

export default NewCaseVanBanBanHanh;
