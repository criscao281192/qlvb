import express from "express";
import { caseRouter } from "./case";
import userRoutes from "./user";
import { personnelRouter } from "./personnel";
import { configRouter } from "./config";
import { configUserRouter } from "./configUser";
import { configPersonnelRouter } from "./configPersonnel";

const router = express.Router();

router.use("/cases", caseRouter);
router.use("/users", userRoutes);
router.use("/personnels", personnelRouter);

router.use("/configs", configRouter);
router.use("/configUser", configUserRouter);
router.use("/configPersonnel", configPersonnelRouter);

export default router;
