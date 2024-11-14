import { Router } from "express";
const router = Router();
import {
  getCurrentUser,
  addCoin,
  addLoyaltyBonus,
  updateBonus,
  getBonus,
  getReferredUserList,
  getUserData_userId,
  updateUserData_userId,
  resetPassword,
  updateProfile,
  getEmail,
  updateProfileAndPassword_byAdmin,
  getUsersList_Admin,
  registerUser_Admin
} from "../controllers/userController.js";
validateRegisterInput


import rateLimiter from 'express-rate-limit';
import { validateRegisterInput } from "../middleware/validation.js";
const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
  });

const apiLimiter_profile = rateLimiter({
    windowMs: 60 * 60 * 1000 * 24, // 15 minutes
    max: 2,
    message: { msg: 'IP rate limit exceeded, retry in 24 hours.' },
  });
  




  router.get("/current-user", getCurrentUser);
  router.post("/bonus-update/:bonus", updateBonus);
  router.patch("/add-coin", apiLimiter, addCoin);
  router.get("/get-bonus/:bonus", getBonus);
  router.get("/get-email", getEmail);
  router.get("/get-referred-user-list", getReferredUserList);
  router.get('/admin/get-user-data/:id', getUserData_userId);
  router.post('/admin/update-user-data/:id', updateUserData_userId);
  router.post("/reset-password",apiLimiter_profile, resetPassword);
  router.post("/update-profile",apiLimiter_profile, updateProfile);
  router.post("/admin/update-profile-password/:id",apiLimiter_profile, updateProfileAndPassword_byAdmin);
  router.get("/admin/get-user-list", getUsersList_Admin);
  router.post("/admin/register-user",apiLimiter_profile, validateRegisterInput, registerUser_Admin);
  











  export default router;