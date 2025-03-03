import express, { Request, Response } from "express";
import { ThanNhanCanBo } from "../models/person";

const router = express.Router();

/**
 * HÀM TÌM KIẾM
 */
router.get("/", async (req: Request, res: Response) => {
  const thannhancanbos = await ThanNhanCanBo.findAll();

  return res.json({
    than_nhan_can_bo: thannhancanbos,
  });
});

export { router as configPersonRouter };
