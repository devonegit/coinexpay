import { Router } from 'express';
import {createTicket, getTicketList_User} from '../controllers/supportController.js';
const router = Router();

router.post('/create-ticket',createTicket );
router.get('/get-list-user', getTicketList_User);
// router.delete("/delete-ticket/:id", coinDelete);



export default router;