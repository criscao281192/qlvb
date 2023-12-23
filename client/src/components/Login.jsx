import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { loginAPI } from "../api";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url("/Llogo.jpg");
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
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  display: inline-block;
  width: ${(props) => (props.register ? "calc(50% - 5px)" : "100%")};
  &:hover {
    background-color: #45a049;
  }
`;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("HÃY ĐIỀN ĐẦY ĐỦ TÀI KHOẢN VÀ MẬT KHẨU.\nNẾU CHƯA CÓ TÀI KHOẢN, VUI LÒNG LIÊN HỆ:\nĐ/c Cao Ngọc Tuyền\nSĐT: 0936342326");
      return;
    }

    try {
      const response = await loginAPI(username, password);

      if (response.status === 200) {
        const userData = response.data;
        console.log("userData", userData);
        localStorage.setItem("accessToken", userData.token);
        onLogin(username, userData);
        window.location.href = "/";
      } else {
        alert("ĐĂNG NHẬP KHÔNG THÀNH CÔNG!");
      }
    } catch (error) {
      alert("TÀI KHOẢN HOẶC MẬT KHẨU KHÔNG ĐÚNG!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      setUserData(decodedToken);
    }
  }, []);

  return (
    <LoginContainer>
      <LoginForm>
        <LoginTitle>ĐĂNG NHẬP</LoginTitle>
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
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
