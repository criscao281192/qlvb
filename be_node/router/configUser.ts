import express, { Request, Response } from "express";
import { UserLogin } from "../models/user";

const router = express.Router();

/**
 * HÀM TÌM KIẾM
 */
router.get("/", async (req: Request, res: Response) => {
  const userlogins = await UserLogin.findAll();

  return res.json({
    user_login: userlogins,
  });
});

export { router as configUserRouter };
