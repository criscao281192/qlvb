import express, { Request, Response } from "express";
import { LoaiTaiLieu, CoQuanBanHanh, PhuTrach } from "../models";

const router = express.Router();

/**
 * Search case by condition
 */
router.get("/", async (req: Request, res: Response) => {
  const loaitailieus = await LoaiTaiLieu.findAll();

  const coquanbanhanhs = await CoQuanBanHanh.findAll();

  const phutraches = await PhuTrach.findAll();

  return res.json({
    loai_tai_lieu: loaitailieus,
    phu_trach: phutraches,
    co_quan_ban_hanh: coquanbanhanhs,
  });
  
});

export { router as configRouter };
