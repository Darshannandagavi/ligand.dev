import express from 'express';
import { auth } from '../middleware/auth.js';
import { createFeeGroup, listFeeGroups, getFeeGroup, markInstallmentPaid, markInstallmentUnpaid, dashboard, listStudentFees, installmentsSummary, paidStudentsForInstallment, recordPayment } from '../controllers/feeGroupController.js';

const router = express.Router();

router.post('/', auth, createFeeGroup);
router.get('/', auth, listFeeGroups);
router.get('/students', auth, listStudentFees);
router.get('/dashboard', auth, dashboard);
router.put('/:id/students/:studentId/installments/:index/pay', auth, markInstallmentPaid);
router.put('/:id/students/:studentId/installments/:index/unpay', auth, markInstallmentUnpaid);
router.post('/:id/students/:studentId/payment', auth, recordPayment);
router.get('/installments/summary', auth, installmentsSummary);
router.get('/installments/:index/paid', auth, paidStudentsForInstallment);
router.post("/:id/pay", auth, recordPayment);

router.get('/:id', auth, getFeeGroup);

export default router;
