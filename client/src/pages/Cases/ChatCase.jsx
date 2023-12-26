import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import "./stylesChatRoom.css";
import { getCaseUser } from "../../api/index";

const ChatCase = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("Đội Tham mưu");
  const [userFullName, setUserFullName] = useState(null);

  const sendMessage = () => {
    if (messageInput && socket) {
      socket.emit("message", { room, name, message: messageInput });
      setMessageInput("");
    }
  };

  useEffect(() => {
    const newSocket = io.connect("http://192.168.1.28:3000");
    console.log("Socket", newSocket);

    setSocket(newSocket);

    newSocket.on("message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));

      getCaseUser(decodedToken.userId)
        .then((response) => {
          const matchingUser = response.data.result.find(
            (user) => user.id === decodedToken.userId
          );

          if (matchingUser) {
            setUserFullName(matchingUser.fullname);
            setName(matchingUser.fullname);
          } else {
            console.error("No user data found in the response.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const history = useHistory();

  const joinRoom = () => {
    if (name && (room || selectedRoom) && socket) {
      const roomToJoin = room || selectedRoom;
      socket.emit("join", roomToJoin);
      setRoom(roomToJoin);
      history.push(`/ChatCase/${roomToJoin}`);
    } else {
      message.error("HÃY NHẬP TÊN HOẶC LỰA CHỌN PHÒNG!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="chat-case-container">
      <div className="info-container">
        <h2>PHÒNG: {room}</h2>
        <Form>
          <Form.Item label="Room">
            <Input
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              placeholder="NHẬP TÊN PHÒNG"
              onPressEnter={joinRoom}
            />
          </Form.Item>
          <Form.Item label="Name">
            <Input value={name} onKeyPress={handleNameKeyPress} readOnly />
          </Form.Item>
        </Form>
      </div>
      <div className="messages-container">
        <div className="messages-display">
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.name}:</strong> {msg.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="messages-input">
          <Form>
            <Form.Item label="Message">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatCase;
