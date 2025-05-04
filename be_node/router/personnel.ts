import express, { Request, Response } from "express";
import { CanBo } from "../models/personnel";
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

  // doan_the
  if (query.doan_the) {
    whereCon = {
      ...whereCon,
      doan_the: {
        [Op.like]: `%${query.doan_the}%`,
      },
    };
  }

  // cap_bac
  if (query.cap_bac) {
    whereCon = {
      ...whereCon,
      cap_bac: {
        [Op.like]: `%${query.cap_bac}%`,
      },
    };
  }

  // chuc_vu
  if (query.chuc_vu) {
    whereCon = {
      ...whereCon,
      chuc_vu: {
        [Op.like]: `%${query.chuc_vu}%`,
      },
    };
  }

  // chuc_vu_dang
  if (query.chuc_vu_dang) {
    whereCon = {
      ...whereCon,
      chuc_vu_dang: {
        [Op.like]: `%${query.chuc_vu_dang}%`,
      },
    };
  }

  // ngay_bo_nhiem
  if (query.ngay_bo_nhiem_1 && query.ngay_bo_nhiem_2) {
    whereCon = {
      ...whereCon,
      ngay_bo_nhiem: {
        [Op.gt]: query.ngay_bo_nhiem_1,
        [Op.lt]: query.ngay_bo_nhiem_2,
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

  // noi_o_hien_nay
  if (query.noi_o_hien_nay) {
    whereCon = {
      ...whereCon,
      noi_o_hien_nay: {
        [Op.like]: `%${query.noi_o_hien_nay}%`,
      },
    };
  }

  // dan_toc
  if (query.dan_toc) {
    whereCon = {
      ...whereCon,
      dan_toc: {
        [Op.like]: `%${query.dan_toc}%`,
      },
    };
  }

  // ngay_vao_nganh
  if (query.ngay_vao_nganh_1 && query.ngay_vao_nganh_2) {
    whereCon = {
      ...whereCon,
      ngay_vao_nganh: {
        [Op.gt]: query.ngay_vao_nganh_1,
        [Op.lt]: query.ngay_vao_nganh_2,
      },
    };
  }

  // ngay_vao_dang
  if (query.ngay_vao_dang_1 && query.ngay_vao_dang_2) {
    whereCon = {
      ...whereCon,
      ngay_vao_dang: {
        [Op.gt]: query.ngay_vao_dang_1,
        [Op.lt]: query.ngay_vao_dang_2,
      },
    };
  }

  // ngay_vao_dang_chinh_thuc
  if (query.ngay_vao_dang_chinh_thuc_1 && query.ngay_vao_dang_chinh_thuc_2) {
    whereCon = {
      ...whereCon,
      ngay_vao_dang_chinh_thuc: {
        [Op.gt]: query.ngay_vao_dang_chinh_thuc_1,
        [Op.lt]: query.ngay_vao_dang_chinh_thuc_2,
      },
    };
  }

  // trinh_do_ly_luan
  if (query.trinh_do_ly_luan) {
    whereCon = {
      ...whereCon,
      trinh_do_ly_luan: {
        [Op.like]: `%${query.trinh_do_ly_luan}%`,
      },
    };
  }

  // trinh_do_dao_tao
  if (query.trinh_do_dao_tao) {
    whereCon = {
      ...whereCon,
      trinh_do_dao_tao: {
        [Op.like]: `%${query.trinh_do_dao_tao}%`,
      },
    };
  }

  // trinh_do_cong_an
  if (query.trinh_do_cong_an) {
    whereCon = {
      ...whereCon,
      trinh_do_cong_an: {
        [Op.like]: `%${query.trinh_do_cong_an}%`,
      },
    };
  }

  // chuc_danh
  if (query.chuc_danh) {
    whereCon = {
      ...whereCon,
      chuc_danh: {
        [Op.like]: `%${query.chuc_danh}%`,
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

  // so_hieu
  if (query.so_hieu) {
    whereCon = {
      ...whereCon,
      so_hieu: {
        [Op.like]: `%${query.so_hieu}%`,
      },
    };
  }

  return whereCon;
};

/**
 * TÌM KIẾM
 */
router.get("/timThongTinCanBo", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);
  CanBo.findAll({
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

// 
/**
 * THỐNG KÊ CÁN BỘ
 */
router.get("/countCanBo", async (req: Request, res: Response) => {
  try {
    let whereCon: any = {};

    whereCon = {
      trinh_do_ly_luan: {
        [Op.like]: `%${req.query.trinh_do_ly_luan}%`,
      },
      trinh_do_dao_tao: {
        [Op.like]: `%${req.query.trinh_do_dao_tao}%`,
      },
      trinh_do_cong_an: {
        [Op.like]: `%${req.query.trinh_do_cong_an}%`,
      },
      doan_the: {
        [Op.like]: `%${req.query.doan_the}%`,
      },
      chuc_danh: {
        [Op.like]: `%${req.query.chuc_danh}%`,
      },
      gioi_tinh: {
        [Op.like]: `%${req.query.gioi_tinh}%`,
      },
      cap_bac: {
        [Op.like]: `%${req.query.cap_bac}%`,
      },
    };

    const canbos = await CanBo.findAll({
      attributes: [
        [Sequelize.col("don_vi_cong_tac"), "don_vi_cong_tac"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "so_luong_can_bo"],
      ],
      group: ["don_vi_cong_tac"],
      where: whereCon,
    });

    res.json(canbos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

// *
// // BẢNG THÔNG BÁO BỔ NHIỆM LẠI
// *
router.get("/bangBoNhiemLai", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};

  whereCon = {
    ngay_bo_nhiem: {
      [Op.gt]: new Date(
        currentYear - 5,
        new Date().getMonth() + 3,
        new Date().getDate() - 30
      ),
      [Op.lt]: new Date(
        currentYear - 5,
        new Date().getMonth() + 3,
        new Date().getDate() + 30
      ),
    },
  };

  const canbos = await CanBo.findAll({
    where: {
      ...whereCon,
    },
  });

  console.log(canbos);

  return res.json({ result: canbos });
});

// * TẠO MỚI
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const record = {
      ho_ten: body.ho_ten,
      gioi_tinh: body.gioi_tinh,
      doan_the: body.doan_the,
      chuc_vu: body.chuc_vu,
      chuc_vu_dang: body.chuc_vu_dang,
      ngay_bo_nhiem: body.ngay_bo_nhiem,
      ngay_sinh: body.ngay_sinh,
      que_quan: body.que_quan,
      noi_o_hien_nay: body.noi_o_hien_nay,
      dan_toc: body.dan_toc,
      ngay_vao_nganh: body.ngay_vao_nganh,
      ngay_vao_dang: body.ngay_vao_dang,
      ngay_vao_dang_chinh_thuc: body.ngay_vao_dang_chinh_thuc,
      trinh_do_ly_luan: body.trinh_do_ly_luan,
      trinh_do_dao_tao: body.trinh_do_dao_tao,
      trinh_do_cong_an: body.trinh_do_cong_an,
      chuc_danh: body.chuc_danh,
      don_vi_cong_tac: body.don_vi_cong_tac,
      so_hieu: body.so_hieu,
      qua_trinh_cong_tac: body.qua_trinh_cong_tac,
      qua_trinh_len_luong: body.qua_trinh_len_luong,
      xep_loai_can_bo: body.xep_loai_can_bo,
      khen_thuong: body.khen_thuong,
      ky_luat: body.ky_luat,
      cap_bac: body.cap_bac,
    };

    if (body.id) {
      await CanBo.update(record, { where: { id: body.id } });
      console.log("CẬP NHẬT THÀNH CÔNG");
    } else {
      await CanBo.create(record);
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
    const canbos = await CanBo.findAll();
    return res.json({ result: canbos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

/**
 * GET PERSONNEL BY ID
 */
router.get("/:personnelId", (req: Request, res: Response) => {
  const personnelId = req.params.personnelId;

  CanBo.findByPk(Number(personnelId))
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      return res.json({ a: "Lỗi" });
    });
});

/**
 * GET PERSONNEL ID
 */
router.post(
  "/:personnelId/updatePersonnelRole",
  async (req: Request, res: Response) => {
    const personnelId = req.params.personnelId;

    try {
      let personnel = await CanBo.findByPk(Number(personnelId));
      await CanBo.update(
        { ngay_bo_nhiem: req.body.personnelRoleId },
        {
          where: {
            id: personnelId,
          },
        }
      );
      return res.json({ success: true });
    } catch (error) {
      console.error("XẢY RA LỖI:", error);
      return res
        .status(500)
        .json({ success: false, error: "LỖI KHÔNG XÁC ĐỊNH" });
    }
  }
);

export { router as personnelRouter };
