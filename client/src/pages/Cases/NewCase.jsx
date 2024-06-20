import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  TreeSelect,
  Upload,
  message,
} from "antd";
import {
  MinusSquareTwoTone,
  PlusSquareTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import "./styles.css";
import { getCase, getConfigs, lay_so_van_ban_den, postCase } from "../../api";
import { NOI_PHAT_HANH } from "../../shared/constants";
import { jwtDecode } from "jwt-decode";

const NewCase = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();

  const [selectedTendonvi, setSelectedTendonvi] = useState([]);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const [isChangedFile, setIsChangeFile] = useState(false);
  const { TextArea } = Input;

  const onFinish = (values) => {
    if (typeof values.noi_dung_van_ban === "string") {
      values.noi_dung_van_ban = values.noi_dung_van_ban
        .split("\n")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("\n");
    }

    if (Array.isArray(values.ten_don_vi)) {
      values.ten_don_vi = values.ten_don_vi
        .map((item) => item.value)
        .join(", ");
    }

    if (values.ngay_ban_hanh) {
      values.ngay_ban_hanh = moment(values.ngay_ban_hanh).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }

    if (values.ngay_tiep_nhan) {
      values.ngay_tiep_nhan = moment(values.ngay_tiep_nhan).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }

    const currentDate = moment();
    values.createdAt = currentDate.format("YYYY-MM-DDT13:00:00.000Z");
    values.createdBy = userFullName;

    values.isChangedFile = isChangedFile;
    if (fileList.length > 0) {
      values.file_van_ban = fileList[0].originFileObj;
      values.file_van_ban_name = fileList[0].name;
    } else {
      values.file_van_ban = null;
    }
    postCase(values).then((res) => {
      history.push("/quan-ly-van-ban");
      window.location.href = "/quan-ly-van-ban";
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
          de_xuat: res.data.de_xuat,
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

  const handleTendonviChange = (values) => {
    setSelectedTendonvi(values);
  };

  const [showCustomInput, setShowCustomInput] = useState(false);
  const [fileList, setFileList] = useState([]);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      return false;
    },
    fileList,
    onChange(info) {
      if (info.file.status !== "uploading") {
        setFileList(info.fileList);
        setIsChangeFile(true);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const laysovanbanden = async (van_ban_den_id) => {
    const result = await lay_so_van_ban_den({
      van_ban_den_id: van_ban_den_id,
    });
    if (result.data.result) {
      console.log(result.data.result);
    }

    let tenviettatvanbanden = "";
    switch (van_ban_den_id) {
      case 1:
        tenviettatvanbanden = "/TLT";
        break;
      case 2:
        tenviettatvanbanden = "/TLM";
        break;
      case 3:
        tenviettatvanbanden = "/BCĐK";
        break;
      default:
        break;
    }

    let domatvanban = "";
    switch (van_ban_den_id) {
      case 1:
        domatvanban = "THƯỜNG";
        break;
      case 2:
        domatvanban = "MẬT";
        break;
      default:
        break;
    }

    let dokhanvanban = "";
    switch (van_ban_den_id) {
      case 1:
        dokhanvanban = "THƯỜNG";
        break;
      case 2:
        dokhanvanban = "THƯỜNG";
        break;
      default:
        break;
    }

    let trangthaivanban = "";
    switch (van_ban_den_id) {
      case 1:
        trangthaivanban = "ĐANG XỬ LÝ";
        break;
      case 2:
        trangthaivanban = "ĐANG XỬ LÝ";
        break;
      default:
        break;
    }

    form.setFieldsValue({
      van_ban_den_so: `${result.data.result}${tenviettatvanbanden}`,
      do_mat: `${domatvanban}`,
      do_khan: `${dokhanvanban}`,
      trang_thai_van_ban: `${trangthaivanban}`,
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
      name: "van_ban_den",
      label: "TÀI LIỆU",
      render: () => {
        return (
          <Select onChange={laysovanbanden}>
            {config &&
              config["van_ban_den"] &&
              config["van_ban_den"].map((item) => {
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
      name: "van_ban_den_so",
      label: "SỐ ĐẾN",
      render: () => {
        return <Input placeholder="SỐ THỨ TỰ VĂN BẢN PC09 TIẾP NHẬN" />;
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
      label: "NGÀY NHẬN",
      render: () => {
        return <DatePicker format={dateFormatList} placeholder={"NGÀY"} />;
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
        return (
          <TreeSelect
            treeData={NOI_PHAT_HANH}
            placeholder="TÊN ĐƠN VỊ"
            treeCheckable={true}
            treeCheckStrictly={true}
            onChange={handleTendonviChange}
            value={selectedTendonvi}
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
      name: "ten_don_vi",
      label: "ĐƠN VỊ KHÁC",
      render: () => {
        return (
          <div>
            {showCustomInput ? (
              <Input placeholder="BỔ SUNG THÊM NƠI PHÁT HÀNH KHI KHÔNG CÓ DỮ LIỆU MẶC ĐỊNH" />
            ) : (
              <span
                onClick={() => setShowCustomInput(true)}
                style={{ cursor: "pointer" }}
              >
                <i className="icon">
                  <PlusSquareTwoTone />
                </i>
              </span>
            )}
            {showCustomInput && (
              <span
                onClick={() => setShowCustomInput(false)}
                style={{ cursor: "pointer" }}
              >
                <i className="icon">
                  <MinusSquareTwoTone />
                </i>
              </span>
            )}
          </div>
        );
      },
      rules: [],
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
      label: "NGÀY KÝ",
      render: () => {
        return <DatePicker format={dateFormatList} placeholder={"NGÀY"} />;
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
      label: "ĐỘ MẬT",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
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
      name: "trang_thai_van_ban",
      label: "TRẠNG THÁI",
      render: () => {
        return (
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="LƯU">LƯU</Radio.Button>
            <Radio.Button value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</Radio.Button>
            <Radio.Button value="XONG">XONG</Radio.Button>
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
      name: "file_van_ban",
      label: "PDF",
      render: () => {
        return (
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>TẢI VĂN BẢN</Button>
          </Upload>
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
        span: 5,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        marginTop: 0,
      }}
    >
      {getFields()}
      <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
        <Button type="primary" htmlType="submit">
          HOÀN THÀNH
        </Button>
        <Button
          type="default"
          style={{ margin: "0 16px" }}
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
