import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

/**
 * =========================
 * MIDDLEWARES
 * =========================
 */

// Parse JSON FIRST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration (STRICT & SAFE)
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // NO fallback in production
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

/**
 * =========================
 * ROUTES
 * =========================
 */
app.use('/api/auth', authRoutes);

export default app;
