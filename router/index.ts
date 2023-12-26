import express from "express";
import { caseRouter } from "./case";
import { caseUser } from "./user";
import { configRouter } from "./config";
import { configUserRouter } from "./configUser";


const router = express.Router();

router.use("/cases", caseRouter);
router.use("/user", caseUser);
router.use("/configs", configRouter);
router.use("/configUser", configUserRouter);


export default router;
