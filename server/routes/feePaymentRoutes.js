import express from "express";
import { createFeePayments, listFeePayments, updateFeeStatus } from "../controllers/feePaymentController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createFeePayments);
router.get("/", auth, listFeePayments);
router.put("/:id/status", auth, updateFeeStatus);

export default router;
