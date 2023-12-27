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

export default userRoutes;
