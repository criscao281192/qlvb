import express from "express";
import { caseRouter } from "./case";
import userRoutes from "./user";
import { personnelRouter } from "./personnel";
import { personRouter } from "./person";

import { configRouter } from "./config";
import { configUserRouter } from "./configUser";
import { configPersonnelRouter } from "./configPersonnel";
import { configPersonRouter } from "./configPerson";

const router = express.Router();

router.use("/cases", caseRouter);
router.use("/users", userRoutes);
router.use("/personnels", personnelRouter);
router.use("/persons", personRouter);

router.use("/configs", configRouter);
router.use("/configUser", configUserRouter);
router.use("/configPersonnel", configPersonnelRouter);
router.use("/configPerson", configPersonRouter);

export default router;
