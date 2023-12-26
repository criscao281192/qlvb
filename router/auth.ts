import express, { Request, Response } from "express";
import { UserLogin } from "../models/user";
import { SECRET_KEY } from "../utils/constants";
const router = express.Router();

/**
 * POST /auth/whoami
 */
router.post("/whoami", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const bcrypt = require("bcrypt");
    const jwt = require("jsonwebtoken");

    const user: any = await UserLogin.findOne({
      where: { username: username },
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        if (user.phan_quyen) {
          const token = jwt.sign(
            {
              userId: user.id,
              phan_quyen: user.phan_quyen,
              fullname: user.fullname,
            },
            SECRET_KEY,
            { expiresIn: "1h", algorithm: "HS256" }
          );
          console.log(token);
          res.status(200).json({
            success: true,
            message: "XIN CHÀO! BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG",
            token,
          });
        } else {
          res.status(401).json({
            success: false,
            message: "BẠN CHƯA ĐƯỢC CẤP QUYỀN ĐĂNG NHẬP",
          });
        }
      } else {
        res.status(401).json({
          success: false,
          message: "MẬT KHẨU KHÔNG ĐÚNG.",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "TÀI KHOẢN KHÔNG TỒN TẠI.",
      });
    }
  } catch (error) {
    console.error("LỖI:", error);
    res.status(500).json({ success: false, message: "ĐÃ XẢY RA LỖI." });
  }
});

export default router;
