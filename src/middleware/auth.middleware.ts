
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';

dotenv.config(); // טעינת המשתנים מקובץ הקונפיגורציה

export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};
// פונקציה זו בודקת אם המשתמש מורשה לפי תפקידו
// export const authorizeRole = (roles: string[]) => {
//     return (req: any, res: any, next: any) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Forbidden' });
//         };
//         next();
//     };
// };

// // פונקציה זו בודקת תקינות של טוקן הגישה
// export const authenticateToken = (req: any, res: any, next: any) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Access denied' });
//     jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });
//         req.user = user;
//         next();
//     });
// };

