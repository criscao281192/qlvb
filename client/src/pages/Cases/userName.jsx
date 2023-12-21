import React, { useState } from "react";
import { Form, Input, Button, message, TreeSelect } from "antd";
import { postCaseUser } from "../../api";
import { useHistory } from "react-router-dom";

const NewUserForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await postCaseUser(values);
      message.success("Tạo tài khoản thành công!");
      form.resetFields();
      history.push("/indexUserName");
    } catch (error) {
      console.error("Lỗi khi tạo tài khoản:", error);
      message.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi tạo tài khoản."
      );
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      name="newUserForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 12,
      }}
    >
      <Form.Item
        name="username"
        label="TÊN ĐĂNG NHẬP"
        rules={[
          {
            required: true,
            message: "HÃY TẠO TÀI KHOẢN!",
          },
        ]}
        style={{ marginTop: 10 }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="MẬT KHẨU"
        rules={[
          {
            required: true,
            message: "THIẾU MẬT KHẨU!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="fullname"
        label="HỌ VÀ TÊN"
        rules={[
          {
            required: true,
            message: "THIẾU HỌ VÀ TÊN!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="don_vi"
        label="ĐƠN VỊ CÔNG TÁC"
        rules={[
          {
            required: true,
            message: "THIẾU ĐƠN VỊ CÔNG TÁC!",
          },
        ]}
      >
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
      </Form.Item>

      <Form.Item
        name="phan_quyen"
        label="CẤP QUYỀN"
        rules={[]}
      >
        <TreeSelect
          style={{ width: "100%" }}
          treeData={[
            {
              title: "ADMIN",
              value: "1",
            },
            {
              title: "USER",
              value: "2",
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 12,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
        >
          TẠO TÀI KHOẢN MỚI
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
