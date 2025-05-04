import express, { Request, Response } from "express";
import { UserLogin } from "../models/user";
import { SECRET_KEY } from "../utils/constants";
import { Op } from "sequelize";
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
              chuc_vu: user.chuc_vu,
            },
            SECRET_KEY,
            { expiresIn: "30d", algorithm: "HS256" }
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

/*
TẠO TÀI KHOẢN MỚI 
*/
router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const bcrypt = require("bcrypt");
    const record = {
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      fullname: body.fullname,
      chuc_vu: body.chuc_vu,
      don_vi: body.don_vi,
      phan_quyen: body.phan_quyen,
      phoneuser: body.phoneuser,
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
      .json({ success: false, error: "LỖI KHÔNG XÁC ĐỊNH" });
  }
});

// KIỂM TRA USER
router.get("/checkUser", async (req, res) => {
  try {
    const whereCon: {
      username: string;
      id?: {
        [Op.ne]: number;
      };
    } = {
      username: String(req.query.username_id),
    };

    if (req.query.id) {
      whereCon.id = {
        [Op.ne]: Number(req.query.id),
      };
    }

    const userExists = await UserLogin.findOne({
      where: whereCon,
    });

    return res.json({ result: !!userExists });
  } catch (error) {
    console.error("LỖI KHI KIỂM TRA NGƯỜI DÙNG:", error);
    return res.status(500).json({ error: "XẢY RA LỖI." });
  }
});

export default router;
