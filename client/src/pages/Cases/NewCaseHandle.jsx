import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  Divider,
  Upload,
  message,
  TreeSelect,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
import "./styles.css";
import { getCase, getConfigs, postCase, lay_so_van_ban_den } from "../../api";
import { NOI_NHAN } from "../../shared/constants";

const NewCaseMember = () => {
  const [form] = Form.useForm();
  let history = useHistory();
  let { id } = useParams();
  const { TextArea } = Input;
  
  const [selectedNoiNhan, setSelectedNoiNhan] = useState([]);

  const [isChangedFile, setIsChangeFile] = useState(false);

  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const onFinish = (values) => {
    if (typeof values.de_xuat === "string") {
      values.de_xuat = values.de_xuat
        .split("\n")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("\n");
    }

    if (Array.isArray(values.noi_nhan)) {
      const selectedNoiNhan = values.noi_nhan
        .map((item) => item.value)
        .join(", ");
      if (selectedNoiNhan.trim()) {
        values.noi_nhan = selectedNoiNhan.replace(/(^\s*,)|(,\s*$)/g, "");
      } else {
        values.noi_nhan = "";
      }
    }
    if (values.ngay_tiep_nhan) {
      values.ngay_tiep_nhan = moment(values.ngay_tiep_nhan).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    if (values.ngay_ban_hanh) {
      values.ngay_ban_hanh = moment(values.ngay_ban_hanh).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }
    if (values.ngay_het_han) {
      values.ngay_het_han = moment(values.ngay_het_han).format(
        "YYYY-MM-DDT13:00:00.000Z"
      );
    }

    values.isChangedFile = isChangedFile;
    if (fileList.length > 0) {
      values.file_van_ban = fileList[0].originFileObj;
    } else {
      values.file_van_ban = null;
    }
    postCase(values).then((res) => {
      history.push("/quan-ly-van-ban");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [showLeverAccount, setShowLeverAccount] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      const userInfo = jwtDecode(accessToken);
      console.log(userInfo);
      if (userInfo) {
        setShowLeverAccount(userInfo.chuc_vu === "5");
      }
    }
  }, []);

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
        });
      });
    }
  }, [id, form]);
  const { Option } = Select;
  const handleNoiNhanChange = (values) => {
    setSelectedNoiNhan(values);
  };
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
      console.log(info);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
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
        return <Input />;
      },
    },
    {
      name: "ten_don_vi",
      label: "ĐƠN VỊ",
      render: () => {
        return <Input />;
      },
    },
    {
      name: "so_van_ban",
      label: "SỐ VĂN BẢN",
      render: () => {
        return <Input />;
      },
    },
    {
      name: "ngay_ban_hanh",
      label: "NGÀY KÝ",
      render: () => {
        return <DatePicker format={dateFormatList} />;
      },
    },
    {
      name: "ngay_tiep_nhan",
      label: "NGÀY NHẬN",
      render: () => {
        return <DatePicker format={dateFormatList} />;
      },
    },
    {
      name: "noi_dung_van_ban",
      label: "NỘI DUNG",
      render: () => {
        return <TextArea rows={2} />;
      },
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
      {showLeverAccount ? (
        <>
          <Divider
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              marginTop: "40px",
            }}
          >
            CÁN BỘ XỬ LÝ VĂN BẢN
          </Divider>
          <Form.Item
            name="ngay_het_han"
            label="NGÀY HẾT HẠN"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <DatePicker format={dateFormatList} placeholder={"NGÀY"} />
          </Form.Item>
          <Form.Item
            name="file_van_ban"
            label="PDF"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>TẢI VĂN BẢN</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="trang_thai_van_ban"
            label="TRẠNG THÁI"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="LƯU">LƯU</Radio.Button>
              <Radio.Button value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</Radio.Button>
              <Radio.Button value="XONG">XONG</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      ) : (
        <>
          <Divider
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              marginTop: "40px",
            }}
          >
            CHỈ HUY ĐỘI XỬ LÝ VĂN BẢN
          </Divider>
          <Form.Item
            name="de_xuat"
            label="ĐỀ XUẤT"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <TextArea rows={3} placeholder="NỘI DUNG ĐỀ XUẤT" />
          </Form.Item>
          <Form.Item
            name="noi_nhan"
            label="NƠI NHẬN"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <TreeSelect
              treeData={NOI_NHAN}
              placeholder="NƠI NHẬN"
              treeCheckable={true}
              treeCheckStrictly={true}
              onChange={handleNoiNhanChange}
              value={selectedNoiNhan}
            />
          </Form.Item>
          <Form.Item
            name="ngay_het_han"
            label="NGÀY HẾT HẠN"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <DatePicker format={dateFormatList} placeholder={"NGÀY"} />
          </Form.Item>
          <Form.Item
            name="trang_thai_van_ban"
            label="TRẠNG THÁI"
            wrapperCol={{
              offset: 3,
              span: 10,
            }}
            rules={[]}
            validateTrigger="onBlur"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="LƯU">LƯU</Radio.Button>
              <Radio.Button value="ĐANG XỬ LÝ">ĐANG XỬ LÝ</Radio.Button>
              <Radio.Button value="XONG">XONG</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      <Form.Item
        wrapperCol={{
          offset: 11,
          span: 24,
        }}
      >
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

export default NewCaseMember;
