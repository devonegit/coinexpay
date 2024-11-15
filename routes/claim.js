import { Router } from 'express';
import { claimManualFaucet, getClaimsHistory, getClaimsHistoryToday, getClaimsList_Admin} from '../controllers/claimController.js';
const router = Router();

router.post("/manual-faucet", claimManualFaucet);
router.get("/claims-history", getClaimsHistory);
router.get("/claims-history-today", getClaimsHistoryToday);


//admin routes

router.get('/admin/claims-list', getClaimsList_Admin);

export default router;