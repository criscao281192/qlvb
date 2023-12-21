import express, { Request, Response } from "express";
import { LoaiTaiLieu, VanBanDen } from "../models";

const router = express.Router();

/**
 * HÀM TÌM KIẾM
 */
router.get("/", async (req: Request, res: Response) => {

  const loaitailieus = await LoaiTaiLieu.findAll();

  const vanbandens = await VanBanDen.findAll();

  return res.json({
    loai_tai_lieu: loaitailieus,
    van_ban_den: vanbandens,
  });

});

export { router as configRouter };
