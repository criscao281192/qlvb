import express, { Request, Response } from "express";
import { LoaiTaiLieu, CoQuanBanHanh, PhuTrach, TaiLieu } from "../models";
import Sequelize, { Op, where } from "sequelize";
import moment from "moment";

const router = express.Router();


const buildQuery = (req: Request) => {
  const query = req.query;
  let whereCon = {};
  // - Bước 1: Tính thời gian còn lại dựa trên cột Ngày hết hạn
  // - Bước 2: Sắp xếp 

  // loai_tai_lieu_id
  if (query.loai_tai_lieu_id) {
    whereCon = {
      ...whereCon,
      loai_tai_lieu_id: query.loai_tai_lieu_id,
    };
  }

  // so_tai_lieu
  if (query.so_tai_lieu) {
    whereCon = {
      ...whereCon,
      so_tai_lieu: query.so_tai_lieu,
      };
  }

  // co_quan_ban_hanh_id
  if (query.co_quan_ban_hanh_id) {
    whereCon = {
      ...whereCon,
      co_quan_ban_hanh_id: query.co_quan_ban_hanh_id,
    };
  }

  // ten_don_vi
  if (query.ten_don_vi) {
    whereCon = {
      ...whereCon,
      ten_don_vi: {
        [Op.like]: `%${query.ten_don_vi}%`,
      },
    };
  }

  // so_van_ban
  if (query.so_van_ban) {
    whereCon = {
      ...whereCon,
      so_van_ban: {
        [Op.like]: `%${query.so_van_ban}%`,
      },
    };
  }

  // ngay_ban_hanh
  if (query.ngay_ban_hanh_1 && query.ngay_ban_hanh_2) {
    whereCon = {
      ...whereCon,
      ngay_ban_hanh: {
        [Op.gt]: query.ngay_ban_hanh_1,
        [Op.lt]: query.ngay_ban_hanh_2,
      },
    };
  }

  // ngay tiep nhan
  if (query.ngay_tiep_nhan_1 && query.ngay_tiep_nhan_2) {
    whereCon = {
      ...whereCon,
      ngay_tiep_nhan: {
        [Op.gt]: query.ngay_tiep_nhan_1,
        [Op.lt]: query.ngay_tiep_nhan_2,
      },
    };
  }

  // do_mat
  if (query.do_mat) {
    whereCon = {
      ...whereCon,
      do_mat: {
        [Op.like]: `%${query.do_mat}%`,
      },
    };
  }

  // do_khan
  if (query.do_khan) {
    whereCon = {
      ...whereCon,
      do_khan: {
        [Op.like]: `%${query.do_khan}%`,
      },
    };
  }

  // noi_dung_van_ban
  if (query.noi_dung_van_ban) {
    whereCon = {
      ...whereCon,
      noi_dung_van_ban: {
        [Op.like]: `%${query.noi_dung_van_ban}%`,
      },
    };
  }

  // yeu_cau
  if (query.yeu_cau) {
    whereCon = {
      ...whereCon,
      yeu_cau: {
        [Op.like]: `%${query.yeu_cau}%`,
      },
    };
  }

  // ngay_het_han
  if (query.ngay_het_han_1 && query.ngay_het_han_2) {
    whereCon = {
      ...whereCon,
      ngay_het_han: {
        [Op.gt]: query.ngay_het_han_1,
        [Op.lt]: query.ngay_het_han_2,
      },
    };
  }

  // nguoi_ki
  if (query.nguoi_ki) {
    whereCon = {
      ...whereCon,
      nguoi_ki: {
        [Op.like]: `%${query.nguoi_ki}%`,
      },
    };
  }


  // doi_bao_cao
  if (query.doi_bao_cao) {
    whereCon = {
      ...whereCon,
      doi_bao_cao: {
        [Op.like]: `%${query.doi_bao_cao}%`,
      },
    };
  }


  // so_van_ban_tra_loi
  if (query.so_van_ban_tra_loi) {
    whereCon = {
      ...whereCon,
      so_van_ban_tra_loi: {
        [Op.like]: `%${query.so_van_ban_tra_loi}%`,
      },
    };
  }

  // ngay_van_ban_tra_loi
  if (query.ngay_van_ban_tra_loi_1 && query.ngay_van_ban_tra_loi_2) {
    whereCon = {
      ...whereCon,
      ngay_van_ban_tra_loi: {
        [Op.gt]: query.ngay_van_ban_tra_loi_1,
        [Op.lt]: query.ngay_van_ban_tra_loi_2,
      },
    };
  }

  // trang_thai_van_ban
  if (query.trang_thai_van_ban) {
    whereCon = {
      ...whereCon,
      trang_thai_van_ban: {
        [Op.like]: `%${query.trang_thai_van_ban}%`,
      },
    };
  }

  // doi_bao_cao
  if (query.doi_bao_cao) {
    whereCon = {
      ...whereCon,
      doi_bao_cao: {
        [Op.like]: `%${query.doi_bao_cao}%`,
      },
    };
  }

  // trang_thai_d2
  if (query.trang_thai_d2) {
    whereCon = {
      ...whereCon,
      trang_thai_d2: {
        [Op.like]: `%${query.trang_thai_d2}%`
      }
    }
  }
  // trang_thai_d3
  if (query.trang_thai_d3) {
    whereCon = {
      ...whereCon,
      trang_thai_d3: {
        [Op.like]: `%${query.trang_thai_d3}%`
      }
    }
  }
  // trang_thai_d4
  if (query.trang_thai_d4) {
    whereCon = {
      ...whereCon,
      trang_thai_d4: {
        [Op.like]: `%${query.trang_thai_d4}%`
      }
    }
  }
  // trang_thai_d5
  if (query.trang_thai_d5) {
    whereCon = {
      ...whereCon,
      trang_thai_d5: {
        [Op.like]: `%${query.trang_thai_d5}%`
      }
    }
  }  

  // phu_trach_id
  if (query.phu_trach_id) {
    whereCon = {
      ...whereCon,
      phu_trach_id: query.phu_trach_id,
    };
  }

  // lanh_dao_phu_trach
  if (query.lanh_dao_phu_trach) {
    whereCon = {
      ...whereCon,
      lanh_dao_phu_trach: {
        [Op.like]: `%${query.lanh_dao_phu_trach}%`
      }
    }
  }  

  return whereCon;
};

/**
 * Search case by condition
 */
router.get("/", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);

  TaiLieu.findAll({
    include: [
      {
        model: LoaiTaiLieu,
      },
      {
        model: CoQuanBanHanh,
      },
      {
        model: PhuTrach,
      },
    ],
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

/**
 * Download file excel by condition
 */
router.get("/download", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);

  TaiLieu.findAll({
    include: [
      {
        model: LoaiTaiLieu,
      },
      {
        model: CoQuanBanHanh,
      },
      {
        model: PhuTrach,
      },
    ],
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

interface CountResponse {
  [key: string]: string | number;
}

/**
 * Count case by creator
 */
router.get("/countByCreator", async (req: Request, res: Response) => {
  const queryBy = req.query.by;
  const currentYear = new Date().getFullYear();
  let whereCon = {};
  const listPhutrach = await PhuTrach.findAll();

  // ngay_tiep_nhan
  if (req.query.startDate && req.query.endDate) {
    whereCon = {
      ngay_tiep_nhan: {
        [Op.gt]: req.query.startDate,
        [Op.lt]: req.query.endDate,
      },
      trang_thai_van_ban: {
        [Op.like]: `%${req.query.trang_thai_van_ban}%`,
      },
    };
  } else {
    whereCon = {
      ngay_tiep_nhan: {
        ngay_tiep_nhan: {
          [Op.gt]: new Date(currentYear, new Date().getMonth(), 1),
          [Op.lt]: new Date(currentYear, new Date().getMonth() + 1, 1),
        },
      },
    };
  }

  const response = await Promise.all(
    listPhutrach.map(async (phutrach) => {
      const tailieu = await TaiLieu.findAll({
        attributes: [
          [
            Sequelize.fn("CONCAT", "type_", Sequelize.col("loai_tai_lieu_id")),
            "loai",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("loai_tai_lieu_id")),
            "no_tai_lieu",
          ],
        ],
        group: ["loai_tai_lieu_id"],
        where: {
          ...whereCon,
          phu_trach_id: phutrach.getDataValue("id"),
        },
      });

      let res = {
        phu_trach: phutrach.getDataValue("name"),
      };
      const tai_lieu = tailieu.forEach((vv) => {
        res = {
          ...res,
          [vv.getDataValue("loai")]: vv.getDataValue("no_tai_lieu"),
        };
      });

      return res;
    })
  );

  res.json(response);
});

/**
 * Count case by district
 */
router.get("/countByDistrict", async (req: Request, res: Response) => {
  const queryBy = req.query.by;
  const currentYear = new Date().getFullYear();
  let whereCon = {};
  const listCoquan = await CoQuanBanHanh.findAll();

  // ngay_tiep_nhan
  if (req.query.startDate && req.query.endDate) {
    whereCon = {
      ngay_tiep_nhan: {
        [Op.gt]: req.query.startDate,
        [Op.lt]: req.query.endDate,
      },
      noi_dung_van_ban: {
        [Op.like]: `%${req.query.noi_dung_van_ban}%`,
      },
    };
  } else {
    whereCon = {
      ngay_tiep_nhan: {
        ngay_tiep_nhan: {
          [Op.gt]: new Date(currentYear, new Date().getMonth(), 1),
          [Op.lt]: new Date(currentYear, new Date().getMonth() + 1, 1),
        },
      },
    };
  }

  const response = await Promise.all(
    listCoquan.map(async (coquan) => {
      const tailieu = await TaiLieu.findAll({
        attributes: [
          [
            Sequelize.fn("CONCAT", "type_", Sequelize.col("loai_tai_lieu_id")),
            "loai",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("loai_tai_lieu_id")),
            "no_tai_lieu",
          ],
        ],
        group: ["loai_tai_lieu_id"],
        where: {
          ...whereCon,
          co_quan_ban_hanh_id: coquan.getDataValue("id"),
        },
      });

      let res = {
        co_quan_ban_hanh: coquan.getDataValue("name"),
      };
      const tai_lieu = tailieu.forEach((vv) => {
        res = {
          ...res,
          [vv.getDataValue("loai")]: vv.getDataValue("no_tai_lieu"),
        };
      });

      return res;
    })
  );

  res.json(response);
});

/**
 * Count case by month
 */
router.get("/countByMonth", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};
  // ngay tiep nhan
  if (req.query.startDate && req.query.endDate) {
    whereCon = {
      ngay_tiep_nhan: {
        [Op.gt]: req.query.startDate,
        [Op.lt]: req.query.endDate,
      },
      noi_dung_van_ban: {
        [Op.like]: `%${req.query.noi_dung_van_ban}%`,
      },
      trang_thai_van_ban: {
        [Op.like]: `%${req.query.trang_thai_van_ban}%`,
      },
    };
  } else {
    whereCon = {
      ngay_tiep_nhan: {
        ngay_tiep_nhan: {
          [Op.gt]: new Date(currentYear, new Date().getMonth(), 1),
          [Op.lt]: new Date(currentYear, new Date().getMonth() + 1, 1),
        },
      },
    };
  }

  const tailieus = await TaiLieu.findAll({
    attributes: [
      [Sequelize.col("loai_tai_lieu.name"), "ten_tai_lieu"],
      [Sequelize.fn("COUNT", Sequelize.col("loai_tai_lieu_id")), "no_tai_lieu"],
    ],
    include: [
      {
        model: LoaiTaiLieu,
      },
    ],
    group: ["loai_tai_lieu_id"],
    where: {
      ...whereCon,
    },
  });
  res.json(tailieus);
});

// *
// // KIỂM TRA TÀI LIỆU
// *
router.get("/kiemTraSoTaiLieu", async (req: Request, res: Response) => {
  let whereCon = {};

  whereCon = {
    so_tai_lieu: Number(req.query.so_tai_lieu_id),
    loai_tai_lieu_id: Number(req.query.loai_tai_lieu_id),
  };

  if (req.query.id) {
    whereCon = {
      ...whereCon,
      id: {
        [Op.ne]: Number(req.query.id),
      },
    };
  }
  const tailieus = await TaiLieu.findAll({
    include: [
      {
        model: LoaiTaiLieu,
      },
      {
        model: PhuTrach,
      },
      {
        model: CoQuanBanHanh,
      },
    ],
    where: {
      ...whereCon,
    },
  });

  return res.json({ result: tailieus.length > 0 });
});


/**
 * Get case by case id
 */
 router.get("/:caseId", (req: Request, res: Response) => {
  const caseId = req.params.caseId;

  TaiLieu.findByPk(Number(caseId))
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      return res.json({ a: "loi" });
    });
});

/**
 * Create new case
 */
router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  const record = {
    loai_tai_lieu_id: body.loai_tai_lieu,
    so_tai_lieu: body.so_tai_lieu,
    co_quan_ban_hanh_id: body.co_quan_ban_hanh,
    ten_don_vi: body.ten_don_vi,
    so_van_ban: body.so_van_ban,
    so_cong_van: body.so_cong_van,
    ngay_ban_hanh: body.ngay_ban_hanh,
    ngay_tiep_nhan: body.ngay_tiep_nhan,
    do_mat: body.do_mat,
    do_khan: body.do_khan,
    noi_dung_van_ban: body.noi_dung_van_ban,
    yeu_cau: body.yeu_cau,
    ngay_het_han: body.ngay_het_han,
    nguoi_ki: body.nguoi_ki,
    doi_bao_cao: body.doi_bao_cao,
    phu_trach_id: body.phu_trach,
    so_van_ban_tra_loi: body.so_van_ban_tra_loi,
    ngay_van_ban_tra_loi: body.ngay_van_ban_tra_loi,
    trang_thai_van_ban: body.trang_thai_van_ban,
    trang_thai_d2: body.trang_thai_d2,
    trang_thai_d3: body.trang_thai_d3,
    trang_thai_d4: body.trang_thai_d4,
    trang_thai_d5: body.trang_thai_d5,
    lanh_dao_phu_trach: body.lanh_dao_phu_trach,
  };

  if (body.id) {
    TaiLieu.update(record, { where: { id: body.id } })
      .then((a) => {
        console.log(a);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    TaiLieu.create(record)
      .then((a) => {
        console.log(a);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return res.json({ a: 1 });
});

/**
 * Get case by case id
 */
router.delete("/:caseId", (req: Request, res: Response) => {
  const caseId = req.params.caseId;

  TaiLieu.destroy({ where: { id: caseId } })
    .then((data) => {
      return res.json(data);
    })
    .catch(() => {
      return res.json({ a: "da xoa" });
    });
});


export { router as caseRouter };
