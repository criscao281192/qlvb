import express, { Request, Response } from "express";
import { ThanNhanCanBo } from "../models/person";
import Sequelize, { Op, where } from "sequelize";
import fs from "fs";
import moment from "moment";

const router = express.Router();

const buildQuery = (req: Request) => {
  const query = req.query;
  let whereCon = {};

  // ho_ten
  if (query.ho_ten) {
    whereCon = {
      ...whereCon,
      ho_ten: {
        [Op.like]: `%${query.ho_ten}%`,
      },
    };
  }

  // gioi_tinh
  if (query.gioi_tinh) {
    whereCon = {
      ...whereCon,
      gioi_tinh: {
        [Op.like]: `%${query.gioi_tinh}%`,
      },
    };
  }

  // ngay_sinh
  if (query.ngay_sinh_1 && query.ngay_sinh_2) {
    whereCon = {
      ...whereCon,
      ngay_sinh: {
        [Op.gt]: query.ngay_sinh_1,
        [Op.lt]: query.ngay_sinh_2,
      },
    };
  }

  // que_quan
  if (query.que_quan) {
    whereCon = {
      ...whereCon,
      que_quan: {
        [Op.like]: `%${query.que_quan}%`,
      },
    };
  }

  // can_bo
  if (query.can_bo) {
    whereCon = {
      ...whereCon,
      can_bo: {
        [Op.like]: `%${query.can_bo}%`,
      },
    };
  }

  // don_vi_cong_tac
  if (query.don_vi_cong_tac) {
    whereCon = {
      ...whereCon,
      don_vi_cong_tac: {
        [Op.like]: `%${query.don_vi_cong_tac}%`,
      },
    };
  }

  // ma_so_the
  if (query.ma_so_the) {
    whereCon = {
      ...whereCon,
      ma_so_the: {
        [Op.like]: `%${query.ma_so_the}%`,
      },
    };
  }
  return whereCon;
};

/**
 * TÌM KIẾM
 */
router.get("/timThongTinThanNhanCanBo", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);
  ThanNhanCanBo.findAll({
    where: whereCon,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      res.json({ error: 200 });
    });
});

// *
// // BẢNG THÔNG BÁO THỜI HẠN THẺ BHYT
// *
router.get("/bangThongBaoThoiHanThe", async (req: Request, res: Response) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    const startDate = new Date(currentYear - 18, 0, 1);
    const endDate = new Date(currentYear - 18, 11, 32);

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    const whereCon = {
      ngay_sinh: {
        [Op.gt]: startDate,
        [Op.lt]: endDate,
      },
      trang_thai: 1,
    };

    const thannhancanbos = await ThanNhanCanBo.findAll({
      where: whereCon,
    });

    console.log("Query Result:", thannhancanbos);

    return res.json({ result: thannhancanbos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// * TẠO MỚI
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const record = {
      ho_ten: body.ho_ten,
      gioi_tinh: body.gioi_tinh,
      ngay_sinh: body.ngay_sinh,
      noi_sinh: body.noi_sinh,
      que_quan: body.que_quan,
      noi_o_hien_nay: body.noi_o_hien_nay,
      noi_dang_ky_kham_benh: body.noi_dang_ky_kham_benh,
      can_bo: body.can_bo,
      don_vi_cong_tac: body.don_vi_cong_tac,
      ma_so_the: body.ma_so_the,
      trang_thai: body.trang_thai,
    };

    if (body.id) {
      await ThanNhanCanBo.update(record, { where: { id: body.id } });
      console.log("CẬP NHẬT THÀNH CÔNG");
    } else {
      await ThanNhanCanBo.create(record);
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

/**
 * GET ALL PERSONNEL ID
 */
router.get("", async (req: Request, res: Response) => {
  let whereCon = {};

  try {
    const thannhancanbos = await ThanNhanCanBo.findAll();
    return res.json({ result: thannhancanbos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

/**
 * GET PERSONNEL BY ID
 */
router.get("/:personId", (req: Request, res: Response) => {
  const personId = req.params.personId;

  ThanNhanCanBo.findByPk(Number(personId))
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      return res.json({ a: "Lỗi" });
    });
});

export { router as personRouter };
