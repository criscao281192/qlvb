import express, { Request, Response } from "express";
import { UserLogin } from "../models/user";

const router = express.Router();

/*
TẠO TÀI KHOẢN MỚI 
*/
router.post("/userName", async (req, res) => {
  try {
    const body = req.body;
    const bcrypt = require("bcrypt");
    const record = {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      fullname: body.fullname,
      don_vi: body.don_vi,
      phan_quyen: body.phan_quyen,
    };

    if (body.id) {
      await UserLogin.update(record, { where: { id: body.id } });
      console.log("CẬP NHẬT THÀNH CÔNG");
    } else {
      await UserLogin.create(record);
      console.log("TẠO MỚI THÀNH CÔNG");
    }

    return res.json({ success: true });
  } catch (error) {
    console.error("XẢY RA LỖI:", error);
    return res
      .status(500)
      .json({ success: false, error: "Xảy ra lỗi không xác định" });
  }
});

/*
CHỨC NĂNG LOGIN 
*/
router.post("/login", async (req: Request, res: Response) => {
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
        const token = jwt.sign({ userId: user.id }, "caongoctuyen", {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({ success: true, message: "Đăng nhập thành công", token });
      } else {
        res.status(401).json({
          success: false,
          message:
            "Mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.",
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message:
          "Tài khoản không tồn tại. Vui lòng kiểm tra lại thông tin đăng nhập.",
      });
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra đăng nhập:", error);
    res
      .status(500)
      .json({ success: false, message: "Đã xảy ra lỗi khi đăng nhập." });
  }
});

// BẢNG USER
router.get("/getCaseUser", async (req: Request, res: Response) => {
  let whereCon = {};

  try {
    const userlogins = await UserLogin.findAll({
      where: whereCon,
    });
    return res.json({ result: userlogins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

export { router as caseUser };
