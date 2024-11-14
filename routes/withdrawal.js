import { Router } from 'express';
import {getCoinList, createWithdrawal, getWithdrawList, getWithdrawList_Admin, rejectWithdraw_Admin, confirmWithdrawSingle_Admin} from '../controllers/withdrawalController.js';
const router = Router();

router.get('/get-list', getCoinList);
router.post("/create-withdrawal", createWithdrawal);
router.get('/user/list', getWithdrawList);
router.get('/admin/get-withdraw-list', getWithdrawList_Admin);
router.post('/admin/reject-withdrawal/:id', rejectWithdraw_Admin);
router.post('/admin/confirm-withdrawal-single/:id', confirmWithdrawSingle_Admin);





export default router;