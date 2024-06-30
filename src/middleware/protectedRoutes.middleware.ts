
// import express from 'express';
// import { authenticateToken, authorizeRole } from '../middleware/auth.middleware';

// const router = express.Router();

// // Only accessible by users with 'admin' role
// router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
//     res.status(200).json({ message: 'Admin resource accessed' });
// });

// // Accessible by any authenticated user
// router.get('/user', authenticateToken, (req, res) => {
//     res.status(200).json({ message: 'User resource accessed' });
// });

// export default router;
