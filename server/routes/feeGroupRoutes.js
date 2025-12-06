import express from 'express';
import { auth } from '../middleware/auth.js';
import { createFeeGroup, listFeeGroups, getFeeGroup, markInstallmentPaid, markInstallmentUnpaid, dashboard, listStudentFees, installmentsSummary, paidStudentsForInstallment, recordPayment } from '../controllers/feeGroupController.js';

import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/receipts",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });


const router = express.Router();

router.post('/', auth, createFeeGroup);
router.get('/', auth, listFeeGroups);
router.get('/students', auth, listStudentFees);
router.get('/dashboard', dashboard);
router.put('/:id/students/:studentId/installments/:index/pay', auth,upload.single("receipt"), markInstallmentPaid);
router.put('/:id/students/:studentId/installments/:index/unpay', auth, markInstallmentUnpaid);
router.post('/:id/students/:studentId/payment', auth, upload.single("receipt"), recordPayment);
router.get('/installments/summary', auth, installmentsSummary);
router.get('/installments/:index/paid', auth, paidStudentsForInstallment);
router.post("/:id/pay", auth, upload.single("receipt"),
recordPayment);

router.get('/:id', auth, getFeeGroup);

export default router;
