import express from 'express';
import adminRoutes from './admin.router.js';
import personalRoutes from './personal.router.js';
// import notFoundRoutes from './notFound.router.js';

const router = express.Router();

router.use('/login', login).use('/personal', personalRoutes).use('/admin', adminRoutes);
// .use('*', notFoundRoutes);
// .use('*', auth, notFoundRoutes);

export default router;
