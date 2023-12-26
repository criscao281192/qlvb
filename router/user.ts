import express, { Request, Response } from "express";
import { UserLogin } from "../models/user";
import { Op } from "sequelize";
const userRoutes = express.Router();

/**
 * GET all users
 */
userRoutes.get("", async (req: Request, res: Response) => {
  let whereCon = {};

  try {
    const userlogins = await UserLogin.findAll();
    return res.json({ result: userlogins });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});


/**
 * GET user by id
 */
userRoutes.get("/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;

  UserLogin.findByPk(Number(userId))
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      return res.json({ a: "loi" });
    });
});


/*
TẠO TÀI KHOẢN MỚI 
*/
userRoutes.post("", async (req, res) => {
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
      .json({ success: false, error: "LỖI KHÔNG XÁC ĐỊNH" });
  }
});

// KIỂM TRA USER
userRoutes.get("/checkUser", async (req, res) => {
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

export default userRoutes;
