import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import styled from "styled-components";
import { loginAPI } from "../api";
import { useHistory } from "react-router-dom";
import logoImage from "../assets/img/Logo.png";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  font-family: Arial, sans-serif;
  position: relative;
`;

const LogoImage = styled.img`
  width: 96px;
`;

const LoginForm = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 540px;
`;

const LoginTitle = styled.h1`
  margin-bottom: 24px;
  color: #fff;
  font-weight: bold;
  font-size: 48px;
`;

const FormTitle = styled.h2`
  margin-bottom: 16px;
  color: #000;
  font-weight: bold;
  font-size: 32px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const LoginInput = styled(Input)`
  width: 100%;
  margin-bottom: 25px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 25px;

  border-radius: 5px;
  height: 48px;
  font-weight: bold;
  

  &:hover {
    outline: none;
    border: none;
  }

`;


const LoginButton = styled(StyledButton)`
  background-color: #d71920;
  color: white;
  border: none;

  &:hover {
    background-color: #d71920;
    color: white;
  }
`;

const RegisterButton = styled(StyledButton)`
  background-color: white;
  color: black;

  &:hover {
    background-color: #0b7dda;
    color: white;
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      message.error("HÃY ĐIỀN ĐẦY ĐỦ TÀI KHOẢN VÀ MẬT KHẨU");
      return;
    }

    setLoading(true);

    try {
      const response = await loginAPI(username, password);

      if (response.status === 200) {
        const userData = response.data;
        localStorage.setItem("accessToken", userData.token);
        onLogin(username, userData);
        setLoading(false);
        window.location.href = "/";
      } else {
        const errorMessage = response.data && response.data.message;
        setServerError(errorMessage || "ĐĂNG NHẬP KHÔNG THÀNH CÔNG!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Login API Error:", error);

      if (error.response) {
        setServerError(
          error.response.data.message || "ĐĂNG NHẬP KHÔNG THÀNH CÔNG!"
        );
      } else if (error.request) {
        setServerError("KHÔNG THỂ KẾT NỐI SERVER.");
      } else {
        setServerError("ĐÃ XẢY RA LỖI.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const register = () => {
    history.push("/dang-ky-tai-khoan");
  }

  return (
    <LoginContainer>
      <LogoImage src={logoImage} alt="Logo" 
      />

      <LoginTitle>Hệ thống quản lý văn bản</LoginTitle>

      <LoginForm>
        <FormTitle>Đăng nhập hệ thống</FormTitle>
        <InputContainer>
          <LoginInput
            size="large"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="TÊN ĐĂNG NHẬP"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputContainer>
        <InputContainer>
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="MẬT KHẨU"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputContainer>
        {serverError && <div style={{ color: "red" }}>{serverError}</div>}
        <LoginButton onClick={handleLogin} loading={loading}>Đăng nhập</LoginButton>
        <br />
        <RegisterButton onClick={register}>
          Đăng ký tài khoản
        </RegisterButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
