// app.js
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
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

/**
 * =========================
 * ROOT (health check)
 * =========================
 */
app.get('/', (req, res) => {
    res.send('Password Reset API is running');
});

export default app;
