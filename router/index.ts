import express from "express";
import { caseRouter } from "./case";
import { configRouter } from "./config";

const router = express.Router();

router.use("/cases", caseRouter);

router.use("/configs", configRouter);

export default router;
