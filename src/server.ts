// src/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/errorHandler';
import { initialize } from './_helpers/db';
import usersController from './users/users.controller';
import authController from './auth/auth.controller';
import departmentsController from './departments/departments.controller';
import employeesController from './employees/employees.controller';
import requestsController from './requests/requests.controller';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));
app.use(express.static('public'));

// API ROUTES
app.use('/users', usersController);
app.use('/auth', authController);
app.use('/departments', departmentsController);
app.use('/employees', employeesController);
app.use('/requests', requestsController);

//Global Error Handler (must be last)
app.use(errorHandler);


// Start Server + Initialize Database
const PORT = process.env.PORT || 4000;

initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
            console.log(`🔐 Test with: POST /users with { email, password, ... }`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to initialize database:', err);
        process.exit(1);
    });