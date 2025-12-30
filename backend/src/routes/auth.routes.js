import { Router } from 'express';
import {
    register,
    login,
    forgotPassword,
    resetPassword
} from '../controllers/auth.controller.js';

const router = Router();

//  AUTH FLOW (REQUIRED BY GUVI)
router.post('/register', register);
router.post('/login', login);

// PASSWORD RESET FLOW
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
