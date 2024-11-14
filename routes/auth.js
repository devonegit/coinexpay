import { Router } from 'express';
import { register, verifyEmail, login, logout } from '../controllers/authController.js';
import {confirmEmail} from '../controllers/userController.js';
const router = Router();
import {validateRegisterInput, validateLoginInput} from '../middleware/validation.js'


import rateLimiter from 'express-rate-limit';
import { googleReCaptcha } from '../controllers/captchaController.js';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
});


router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/register/auth/verify/:token', verifyEmail);
router.post('/register/verify-recaptcha', googleReCaptcha);

router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

//verify usermail
router.post('/user/mail-confirmation/:token/:id', confirmEmail);



export default router;