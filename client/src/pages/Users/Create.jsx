import React, { useState } from "react";
import { Form, Input, Button, message, TreeSelect } from "antd";
import { checkUser, registerUser } from "../../api";
import { useHistory, Redirect } from "react-router-dom";
import { CHUC_VU, DON_VI } from "../../shared/constants";
import "./styles.css";

const NewUserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [redirectHome, setRedirectHome] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      message.success("ĐÃ GỬI YÊU CẦU TẠO TÀI KHOẢN!");
      form.resetFields();
      history.push("/quan-ly-tai-khoan");
    } catch (error) {
      console.error("LỖI KHI TẠO TÀI KHOẢN:", error);
      message.error(
        error.response?.data?.message || "ĐÃ XẢY RA LỖI KHI TẠO TÀI KHOẢN."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (redirectHome) {
    return <Redirect to="/" />;
  }

  const userControls = [
    {
      name: "id",
      render: () => {
        return <Input style={{ display: "none" }} />;
      },
    },
    {
      name: "username",
      render: () => {
        return <Input placeholder="TÊN ĐĂNG NHẬP" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
        ({ getFieldValue }) => ({
          async validator(_, value) {
            if (!/^[a-z]{4,}$/.test(value)) {
              return Promise.reject(new Error("TÊN ĐĂNG NHẬP KHÔNG HỢP LỆ!"));
            }

            const result = await checkUser({
              username_id: value,
              id: getFieldValue("id"),
            });
            if (result.data.result) {
              return Promise.reject(new Error("TÀI KHOẢN ĐÃ ĐĂNG KÝ RỒI!"));
            }
            return Promise.resolve();
          },
        }),
      ],
    },
    {
      name: "password",
      render: () => {
        return <Input.Password placeholder="MẬT KHẨU" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
      ],
    },
    {
      name: "fullname",
      render: () => {
        return <Input placeholder="HỌ VÀ TÊN" />;
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
      name: "don_vi",
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
      name: "phoneuser",
      render: () => {
        return <Input placeholder="SỐ ĐIỆN THOẠI" />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
        {
          pattern: /^0\d{9}$/,
          message: "SỐ ĐIỆN THOẠI PHẢI CÓ 9 SỐ",
        },
      ],
    },
  ];
  const getFields = () => {
    return userControls.map((control, i) => {
      return (
        <Form.Item
          name={control.name}
          label={control.label}
          rules={control.rules}
          validateTrigger="onBlur"
        >
          {control.render()}
        </Form.Item>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          background: "url('./LOGOKTHS.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#006d75",
            margin: "0",
          }}
        >
          ĐĂNG KÝ TÀI KHOẢN
        </div>

        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{ maxWidth: "500px", margin: "0 auto" }}
        >
          {getFields()}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            style={{ marginRight: 60 }}
          >
            TẠO TÀI KHOẢN MỚI
          </Button>
          <Button
            type="primary"
            onClick={() => setRedirectHome(true)}
            loading={loading}
            disabled={loading}
            style={{ margin: 0 }}
            class="button-userName"
          >
            TRANG CHỦ
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewUserForm;
