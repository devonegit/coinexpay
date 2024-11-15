import { Router } from 'express';
import { getCoinList, editCoin, coinDelete} from '../controllers/coinController.js';
const router = Router();

router.get('/get-list', getCoinList);
router.patch('/edit-coin/:id', editCoin);
router.delete("/delete-coin/:id", coinDelete);



export default router;