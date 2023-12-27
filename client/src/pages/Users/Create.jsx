import React, { useState } from "react";
import { Form, Input, Button, message, TreeSelect } from "antd";
import { checkUser, registerUser } from "../../api";
import { useHistory, Redirect } from "react-router-dom";
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
      label: "TÊN ĐĂNG NHẬP",
      render: () => {
        return <Input placeholder=" " />;
      },
      rules: [
        {
          required: true,
          message: "HÃY CHỌN TRƯỜNG DỮ LIỆU",
        },
        ({ getFieldValue }) => ({
          async validator(_, value) {
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
      label: "MẬT KHẨU",
      render: () => {
        return <Input.Password />;
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
      label: "HỌ VÀ TÊN",
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
      name: "don_vi",
      label: "ĐƠN VỊ CÔNG TÁC",
      render: () => {
        return (
          <TreeSelect
            style={{ width: "100%" }}
            treeData={[
              {
                title: "Đội Tham mưu",
                value: "1",
              },
              {
                title: "Đội Khám nghiệm hiện trường",
                value: "2",
              },
              {
                title: "Đội Giám định KTHS truyền thống và tài liệu",
                value: "3",
              },
              {
                title: "Đội Giám định hoá, KTPL và pháp y, sinh vật",
                value: "4",
              },
              {
                title: "Đội Kỹ thuật phòng, chống tội phạm",
                value: "5",
              },
            ]}
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
      label: "SỐ ĐIỆN THOẠI",
      render: () => {
        return <Input placeholder="0936342326" />;
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
