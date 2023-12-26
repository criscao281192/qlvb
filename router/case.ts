import express, { Request, Response } from "express";
import { LoaiTaiLieu, VanBanDen, TaiLieu } from "../models";
import Sequelize, { Op, where } from "sequelize";
import fs from "fs";
import moment from "moment";

const router = express.Router();

const buildQuery = (req: Request) => {
  const query = req.query;
  let whereCon = {};

  // QUẢN LÝ VĂN BẢN
  //

  // loai_tai_lieu_id
  if (query.loai_tai_lieu_id) {
    whereCon = {
      ...whereCon,
      loai_tai_lieu_id: query.loai_tai_lieu_id,
    };
  }

  // van_ban_den_id
  if (query.van_ban_den_id) {
    whereCon = {
      ...whereCon,
      van_ban_den_id: query.van_ban_den_id,
    };
  }

  // van_ban_den_so
  if (query.van_ban_den_so) {
    whereCon = {
      ...whereCon,
      van_ban_den_so: {
        [Op.like]: `%${query.van_ban_den_so}%`,
      },
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

  // noi_nhan
  if (query.noi_nhan) {
    whereCon = {
      ...whereCon,
      noi_nhan: {
        [Op.like]: `%${query.noi_nhan}%`,
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

  return whereCon;
};

/**
 * TÌM KIẾM
 */
router.get("/", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);

  TaiLieu.findAll({
    include: [
      {
        model: LoaiTaiLieu,
      },
      {
        model: VanBanDen,
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
 * DOWLOAD
 */
router.get("/download", (req: Request, res: Response) => {
  const whereCon = buildQuery(req);

  TaiLieu.findAll({
    include: [
      {
        model: LoaiTaiLieu,
      },
      {
        model: VanBanDen,
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
 * THỐNG KÊ VĂN BẢN ĐẾN
 */
router.get("/countVanBanDen", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 1);

  const whereCon = {
    ngay_tiep_nhan: {
      [Op.gte]: firstDayOfMonth,
      [Op.lte]: lastDayOfMonth,
    },
  };

  try {
    const tailieus = await TaiLieu.findAll({
      attributes: [
        [Sequelize.col("van_ban_den.name"), "ten_van_ban_den"],
        [
          Sequelize.fn("COUNT", Sequelize.col("van_ban_den_id")),
          "no_van_ban_den",
        ],
      ],
      include: [
        {
          model: VanBanDen,
        },
      ],
      group: ["van_ban_den_id"],
      where: whereCon,
    });

    res.json(tailieus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

// THỐNG KÊ TỔNG VĂN BẢN ĐẾN THEO 12 THÁNG
router.get(
  "/countVanBanDenFor12Months",
  async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();
    const results = [];

    for (let i = 1; i <= 12; i++) {
      const firstDay = new Date(currentYear, i - 1, 1);
      const lastDay = new Date(currentYear, i, 1);

      const whereCon = {
        ngay_tiep_nhan: {
          [Op.between]: [firstDay, lastDay],
        },
      };

      const count = await TaiLieu.count({
        where: whereCon,
      });

      results.push({ month: i - 1, count });
    }

    res.json(results);
  }
);

// SO SÁNH VĂN BẢN ĐẾN SO VỚI CÙNG KỲ
router.get(
  "/countVanBanDenForComparison",
  async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const results = [];

    for (let i = 1; i <= 12; i++) {
      const firstDayCurrentYear = new Date(currentYear, i - 1, 1);
      const lastDayCurrentYear = new Date(currentYear, i, 1);
      const firstDayLastYear = new Date(lastYear, i - 1, 1);
      const lastDayLastYear = new Date(lastYear, i, 1);

      const whereConCurrentYear = {
        ngay_tiep_nhan: {
          [Op.between]: [firstDayCurrentYear, lastDayCurrentYear],
        },
      };

      const whereConLastYear = {
        ngay_tiep_nhan: {
          [Op.between]: [firstDayLastYear, lastDayLastYear],
        },
      };

      const countCurrentYear = await TaiLieu.count({
        where: whereConCurrentYear,
      });

      const countLastYear = await TaiLieu.count({
        where: whereConLastYear,
      });

      results.push({
        month: i,
        year: currentYear,
        countCurrentYear,
        yearLastYear: lastYear,
        countLastYear,
      });
    }

    res.json(results);
  }
);

// THỐNG KÊ THEO NGÀY
router.get(
  "/countVanBanDenForRecentDays",
  async (req: Request, res: Response) => {
    const numberOfDaysToCheck = 30;
    const currentDate = new Date();
    let totalCount = 0;
    for (let i = 0; i < numberOfDaysToCheck; i++) {
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - i);
      targetDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(targetDate);
      nextDay.setDate(targetDate.getDate() + 1);

      const whereCon = {
        ngay_tiep_nhan: {
          [Op.between]: [targetDate, nextDay],
        },
      };

      const count = await TaiLieu.count({
        where: whereCon,
      });

      totalCount += count;

      if (count > 0) {
        break;
      }
    }

    res.json(totalCount);
  }
);

/**
 * THỐNG KÊ VĂN BẢN PC09 BAN HÀNH
 */
router.get("/countVanBanDi", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};

  if (req.query.startDate && req.query.endDate) {
    whereCon = {
      ngay_ban_hanh: {
        [Op.gt]: req.query.startDate,
        [Op.lt]: req.query.endDate,
      },
      noi_nhan: {
        [Op.like]: `%${req.query.noi_nhan}%`,
      },
    };
  } else {
    whereCon = {
      ngay_ban_hanh: {
        [Op.gt]: new Date(currentYear, new Date().getMonth(), 1),
        [Op.lt]: new Date(currentYear, new Date().getMonth() + 1, 1),
      },
    };
  }

  const tailieus = await TaiLieu.findAll({
    attributes: [
      [Sequelize.col("loai_tai_lieu.name"), "ten_loai_tai_lieu"],
      [
        Sequelize.fn("COUNT", Sequelize.col("loai_tai_lieu_id")),
        "no_loai_tai_lieu",
      ],
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

// THỐNG KÊ TỔNG SỐ VĂN BẢN BAN HÀNH THEO 12 THÁNG
router.get("/countVanBanDiFor12Months", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  const results = [];

  for (let i = 1; i <= 12; i++) {
    const firstDay = new Date(currentYear, i - 1, 1);
    const nextMonth = new Date(currentYear, i, 1);

    const whereCon = {
      [Op.and]: [
        {
          ngay_ban_hanh: {
            [Op.between]: [firstDay, nextMonth],
          },
        },
        {
          so_van_ban: {
            [Op.like]: `%PC09%`,
          },
        },
      ],
    };
    const count = await TaiLieu.count({
      where: whereCon,
    });
    results.push({ month: i - 1, count });
  }

  res.json(results);
});

// SO SÁNH VĂN BẢN ĐI SO VỚI CÙNG KỲ
router.get(
  "/countVanBanDiForComparison",
  async (req: Request, res: Response) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    const results = [];

    for (let i = 1; i <= 12; i++) {
      const firstDayCurrentYear = new Date(currentYear, i - 1, 1);
      const lastDayCurrentYear = new Date(currentYear, i, 1);
      const firstDayLastYear = new Date(lastYear, i - 1, 1);
      const lastDayLastYear = new Date(lastYear, i, 1);

      const whereConCurrentYear = {
        [Op.and]: [
          {
            ngay_ban_hanh: {
              [Op.between]: [firstDayCurrentYear, lastDayCurrentYear],
            },
          },
          {
            so_van_ban: {
              [Op.like]: `%PC09%`,
            },
          },
        ],
      };

      const whereConLastYear = {
        [Op.and]: [
          {
            ngay_ban_hanh: {
              [Op.between]: [firstDayLastYear, lastDayLastYear],
            },
          },
          {
            so_van_ban: {
              [Op.like]: `%PC09%`,
            },
          },
        ],
      };

      const countCurrentYear = await TaiLieu.count({
        where: whereConCurrentYear,
      });

      const countLastYear = await TaiLieu.count({
        where: whereConLastYear,
      });

      results.push({
        month: i,
        year: currentYear,
        countCurrentYear,
        yearLastYear: lastYear,
        countLastYear,
      });
    }

    res.json(results);
  }
);

// *
// // LẤY SỐ TÀI LIỆU ĐẾN
// *
router.get("/laysoVanBanDen", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};

  whereCon = {
    van_ban_den_id: Number(req.query.van_ban_den_id),
    ngay_tiep_nhan: {
      [Op.gt]: `${currentYear}/01/01`,
      [Op.lt]: `${currentYear}/12/31`,
    },
  };

  whereCon = {
    ...whereCon,
  };
  const tailieus = await TaiLieu.findAll({
    where: {
      ...whereCon,
    },
  });

  console.log(tailieus);

  return res.json({ result: tailieus.length + 1 });
});

// *
// // LẤY SỐ CÔNG VĂN MỚI
// *
router.get("/laysoVanBanDi", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};

  whereCon = {
    loai_tai_lieu_id: Number(req.query.loai_tai_lieu_id),
    ngay_ban_hanh: {
      [Op.gt]: `${currentYear}/01/01`,
      [Op.lt]: `${currentYear}/12/31`,
    },
  };

  whereCon = {
    ...whereCon,
  };
  const tailieus = await TaiLieu.findAll({
    where: {
      ...whereCon,
    },
  });

  console.log(tailieus);

  return res.json({ result: tailieus.length + 1 });
});

// *
// // BẢNG THÔNG BÁO VĂN BẢN ĐẾN HẠN
// *
router.get("/bangVanBanDenHan", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {};

  whereCon = {
    ngay_het_han: {
      [Op.gt]: new Date(
        currentYear,
        new Date().getMonth(),
        new Date().getDate() - 5
      ),
      [Op.lt]: new Date(
        currentYear,
        new Date().getMonth(),
        new Date().getDate() + 5
      ),
    },
    trang_thai_van_ban: {
      [Op.like]: `ĐANG XỬ LÝ`,
    },
  };

  whereCon = {
    ...whereCon,
  };
  const tailieus = await TaiLieu.findAll({
    where: {
      ...whereCon,
    },
  });

  console.log(tailieus);

  return res.json({ result: tailieus });
});

// *
// // BẢNG VĂN BẢN ĐẾN
// *
router.get("/bangVanBanDen", async (req, res) => {
  const trangThaiOptions = ["ĐANG XỬ LÝ", "LƯU", "XONG"];
  let results = null;
  const numberOfDaysToCheck = 30;
  const currentDate = new Date();

  for (let i = 0; i < numberOfDaysToCheck; i++) {
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() - i);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(targetDate.getDate() + 1);

    const whereCon = {
      trang_thai_van_ban: {
        [Op.in]: trangThaiOptions,
      },
      ngay_tiep_nhan: {
        [Op.between]: [targetDate, nextDay],
      },
    };

    const tailieus = await TaiLieu.findAll({
      where: whereCon,
      attributes: {
        exclude: ["file_van_ban"],
      },
    });

    if (tailieus.length > 0) {
      results = tailieus;
      break;
    }
  }

  if (results) {
    return res.json({ result: results });
  } else {
    return res.status(404).json({ error: "KHÔNG TÌM THẤY DỮ LIỆU" });
  }
});

// *
// // BẢNG VĂN BẢN BAN HÀNH
// *
router.get("/bangVanBanBanHanh", async (req: Request, res: Response) => {
  const currentYear = new Date().getFullYear();
  let whereCon = {
    ten_don_vi: {
      [Op.like]: `PC09`,
    },
    ngay_ban_hanh: {
      [Op.gt]: `${currentYear}/01/01`,
      [Op.lt]: `${currentYear}/12/31`,
    },
  };

  try {
    const tailieus = await TaiLieu.findAll({
      where: whereCon,
      attributes: {
        exclude: ["file_van_ban"],
      },
    });
    return res.json({ result: tailieus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "LỖI TRUY VẤN CƠ SỞ DỮ LIỆU" });
  }
});

/**
 * GET CASE BY CASE ID
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
 * TẠO MỚI
 */
router.post("/", (req: Request, res: Response) => {
  const body = req.body;

  if (body.isChangedFile) {
    if (body.file_van_ban) {
      fs.readFile(body.file_van_ban.path, function (err, data) {
        if (err) {
          console.error("LỖI KHI ĐỌC FILE PDF:", err);
        } else {
          const record = {
            loai_tai_lieu_id: body.loai_tai_lieu,
            van_ban_den_id: body.van_ban_den,
            van_ban_den_so: body.van_ban_den_so,
            ten_don_vi: body.ten_don_vi,
            so_van_ban: body.so_van_ban,
            ngay_ban_hanh: body.ngay_ban_hanh,
            ngay_tiep_nhan: body.ngay_tiep_nhan,
            do_mat: body.do_mat,
            do_khan: body.do_khan,
            noi_dung_van_ban: body.noi_dung_van_ban,
            ngay_het_han: body.ngay_het_han,
            noi_nhan: body.noi_nhan,
            trang_thai_van_ban: body.trang_thai_van_ban,
            de_xuat: body.de_xuat,
            file_van_ban: data,
          };
          if (body.id) {
            TaiLieu.update(record, { where: { id: body.id } })
              .then((a) => {})
              .catch((e) => {
                console.error("LỖI KHI CẬP NHẬT:", e);
              });
          } else {
            TaiLieu.create(record)
              .then((a) => {})
              .catch((e) => {
                console.error("LỖI KHI TẠO MỚI:", e);
              });
          }
        }
      });
    } else {
      const record = {
        loai_tai_lieu_id: body.loai_tai_lieu,
        van_ban_den_id: body.van_ban_den,
        van_ban_den_so: body.van_ban_den_so,
        ten_don_vi: body.ten_don_vi,
        so_van_ban: body.so_van_ban,
        ngay_ban_hanh: body.ngay_ban_hanh,
        ngay_tiep_nhan: body.ngay_tiep_nhan,
        do_mat: body.do_mat,
        do_khan: body.do_khan,
        noi_dung_van_ban: body.noi_dung_van_ban,
        ngay_het_han: body.ngay_het_han,
        noi_nhan: body.noi_nhan,
        trang_thai_van_ban: body.trang_thai_van_ban,
        de_xuat: body.de_xuat,
      };
      if (body.id) {
        TaiLieu.update(record, { where: { id: body.id } })
          .then((a) => {})
          .catch((e) => {
            console.error("LỖI KHI CẬP NHẬT:", e);
          });
      } else {
        TaiLieu.create(record)
          .then((a) => {})
          .catch((e) => {
            console.error("LỖI KHI TẠO MỚI:", e);
          });
      }
    }
  } else {
    const record = {
      loai_tai_lieu_id: body.loai_tai_lieu,
      van_ban_den_id: body.van_ban_den,
      van_ban_den_so: body.van_ban_den_so,
      ten_don_vi: body.ten_don_vi,
      so_van_ban: body.so_van_ban,
      ngay_ban_hanh: body.ngay_ban_hanh,
      ngay_tiep_nhan: body.ngay_tiep_nhan,
      do_mat: body.do_mat,
      do_khan: body.do_khan,
      noi_dung_van_ban: body.noi_dung_van_ban,
      ngay_het_han: body.ngay_het_han,
      noi_nhan: body.noi_nhan,
      trang_thai_van_ban: body.trang_thai_van_ban,
      de_xuat: body.de_xuat,
    };
    if (body.id) {
      TaiLieu.update(record, { where: { id: body.id } })
        .then((a) => {})
        .catch((e) => {
          console.error("LỖI KHI CẬP NHẬT:", e);
        });
    } else {
      TaiLieu.create(record)
        .then((a) => {})
        .catch((e) => {
          console.error("LỖI KHI TẠO MỚI:", e);
        });
    }
  }
  return res.json({ a: 1 });
});

//

/**
 * GET CASE BY CASE ID
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
