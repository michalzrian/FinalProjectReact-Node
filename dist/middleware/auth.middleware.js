"use strict";
// // import { Request, Response, NextFunction } from 'express';
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
// const authenticateToken = (req: any, res: any, next: any) => {
//     const token = req.header('Authorization')?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Access denied' });
//     jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });
//         req.user = user;
//         next();
//     });
// };
// const authorizeRole = (roles: any) => {
//     return (req: any, res: any, next: any) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: 'Forbidden' });
//         };
//         next();
//     };
// };
// export { authenticateToken, authorizeRole };
// // // import dotenv, { configDotenv } from 'dotenv';
// // dotenv.config();
// // const SECRET_KEY = process.env.SECRET_KEY as string;
// // console.log("SECRET_KEY", SECRET_KEY)
// // export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
// //     const authHeader = req.header('Authorization');
// //     console.log("Token:", authHeader);
// //     if (!authHeader) {
// //         return res.status(401).send('Access Denied');
// //     }
// //     const token = authHeader && authHeader.split(' ')[1]; // Split 'Bearer' from token
// //     try {
// //         const verified = jwt.verify(token, SECRET_KEY);
// //         console.log(verified);
// //         (req as any).user = verified;
// //         next();
// //     } catch (err) {
// //         console.log("hello token" + err);
// //         res.status(400).send('Invalid Token');
// //     }
// // };
// auth.middleware.ts
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // טעינת המשתנים מקובץ הקונפיגורציה
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Access denied' });
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
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
//# sourceMappingURL=auth.middleware.js.map