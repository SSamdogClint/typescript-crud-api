import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import Joi from 'joi';
import { authService } from './auth.service';
import { LoginRequest, RegisterRequest } from './auth.types';

const router = Router();

router.post('/login', loginSchema, login);
router.post('/register', registerSchema, register);

export default router;

// ================
// LOGIN
// ================
function loginSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object<LoginRequest>({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email'
        }),
        password: Joi.string().min(1).required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    });

    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };

    const { error, value } = schema.validate(req.body || {}, options);

    if (error) {
        next(`Validation error: ${error.details.map((d) => d.message).join(', ')}`);
        return;
    }

    req.body = value;
    next();
}

async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result = await authService.login(req.body as LoginRequest);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

// ================
// REGISTER
// ================
function registerSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object<RegisterRequest>({
        title: Joi.string().required().messages({
            'string.empty': 'Title is required',
            'any.required': 'Title is required'
        }),
        firstName: Joi.string().required().messages({
            'string.empty': 'First name is required',
            'any.required': 'First name is required'
        }),
        lastName: Joi.string().required().messages({
            'string.empty': 'Last name is required',
            'any.required': 'Last name is required'
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'any.required': 'Email is required',
            'string.email': 'Email must be a valid email'
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required',
            'string.min': 'Password must be at least 6 characters'
        }),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'string.empty': 'Confirm password is required',
            'any.required': 'Confirm password is required',
            'any.only': 'Passwords do not match'
        }),
        role: Joi.string().valid('Admin', 'User').default('User').messages({
            'any.only': 'Role must be Admin or User'
        })
    });

    const options = {
        abortEarly: false,
        allowUnknown: false,
        stripUnknown: false
    };

    const { error, value } = schema.validate(req.body || {}, options);

    if (error) {
        next(`Validation error: ${error.details.map((d) => d.message).join(', ')}`);
        return;
    }

    req.body = value;
    next();
}

async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result = await authService.register(req.body as RegisterRequest);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
}