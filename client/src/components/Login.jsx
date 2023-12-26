import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import styled from "styled-components";
import { loginAPI, getCaseUser } from "../api";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/LOGOKTHS.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  font-family: Arial, sans-serif;
  position: relative;
`;

const LoginForm = styled.div`
  background: rgba(0, 0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  height: 50vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const LoginTitle = styled.h2`
  margin-bottom: 20px;
  color: red;
  font-weight: bold;
  font-size: 54px;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Icon = styled.span`
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  left: 10px;
  color: rgba(0, 0, 0, 1);
`;

const PasswordIcon = styled.span`
  position: absolute;
  top: 35%;
  transform: translateY(-50%);
  right: 10px;
  color: rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 10px 30px 10px 40px;
  margin-bottom: 25px;
  box-sizing: border-box;
  color: black;
  border: ${(props) => (props.error ? "1px solid red" : "none")};
`;

const LoginButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;
  width: ${(props) => (props.register ? "calc(50% - 5px)" : "50%")};
  &:hover {
    background-color: #45a049;
  }
`;

const RegisterButton = styled.button`
  background-color: #2196f3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
  display: inline-block;
  width: calc(50% - 5px);
  &:hover {
    background-color: #0b7dda;
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      message.error("HÃY ĐIỀN ĐẦY ĐỦ TÀI KHOẢN VÀ MẬT KHẨU");
      return;
    }

    try {
      const response = await loginAPI(username, password);

      if (response.status === 200) {
        const userData = response.data;
        console.log("userData", userData);

        const caseUserResponse = await getCaseUser();

        const userExists = caseUserResponse.data.result.some(
          (user) => user.username === username && user.phan_quyen
        );

        if (userExists) {
          localStorage.setItem("accessToken", userData.token);
          onLogin(username, userData);
          window.location.href = "/";
        } else {
          message.error("BẠN CHƯA ĐƯỢC CẤP QUYỀN TRUY CẬP");
        }
      } else {
        message.error("ĐĂNG NHẬP KHÔNG THÀNH CÔNG!");
      }
    } catch (error) {
      message.error("TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG ĐÚNG!");
    }
  };

  const handleRegister = () => {
    window.location.href = "/userName";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>QUẢN LÝ VĂN BẢN</LoginTitle>
        <InputContainer>
          <Icon>
            <UserOutlined />
          </Icon>
          <LoginInput
            type="text"
            placeholder="TÊN ĐĂNG NHẬP"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputContainer>
        <InputContainer>
          <Icon>
            <LockOutlined />
          </Icon>
          <LoginInput
            type={showPassword ? "text" : "password"}
            placeholder="MẬT KHẨU"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </PasswordIcon>
        </InputContainer>
        <LoginButton onClick={handleLogin}>ĐĂNG NHẬP</LoginButton>
        <br />
        <NavLink to="/userName">
          <RegisterButton register onClick={handleRegister}>
            ĐĂNG KÝ
          </RegisterButton>
        </NavLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
