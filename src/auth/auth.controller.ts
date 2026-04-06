// src/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../_helpers/db';

const router = Router();

// ROUTES
router.post('/login', login);

export default router;

// Route Handlers
async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
        const user = await db.User.scope('withHash').findOne({ where: { email } });

        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        next(err);
    }
}