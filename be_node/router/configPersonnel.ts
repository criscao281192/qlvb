import express, { Request, Response } from "express";
import { CanBo } from "../models/personnel";

const router = express.Router();

/**
 * HÀM TÌM KIẾM
 */
router.get("/", async (req: Request, res: Response) => {
  const canbos = await CanBo.findAll();

  return res.json({
    can_bo: canbos,
  });
});

export { router as configPersonnelRouter };
