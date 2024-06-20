import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const userInfo = jwtDecode(accessToken);
      if (userInfo && userInfo.fullname) {
        const initials = userInfo.fullname
          .split(" ")
          .map((word) => word[0])
          .join("");
        setUserProfile({ fullname: userInfo.fullname, initials: initials });
      }
    }
  }, []);

  return (
    <div >
      <div style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", color: "#006d75" }}>
        THÔNG TIN TÀI KHOẢN
      </div>
      <br />
      {userProfile && (
        <div>
          <p><strong>Người dùng:</strong> {userProfile.fullname}</p>
          <p><strong>Chữ cái viết tắt:</strong> {userProfile.initials}</p>
        </div>
      )}
      {!userProfile && <p>User information not found.</p>}
    </div>
  );
};

export default Profile;
