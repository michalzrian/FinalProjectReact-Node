"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// test/user.routes.test.ts
const request = require('supertest');
const express = require('express');
const userRouter = require('../routes/user.routes');
const mongoose_1 = __importDefault(require("mongoose"));
const app = express();
app.use(express.json());
app.use('/api/users', userRouter);
describe('User Routes', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const url = `mongodb://127.0.0.1/DictionaryMeetingF_test`;
        yield mongoose_1.default.connect(url, {});
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    test('GET /api/users should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }));
    test('POST /api/users/login should return a token for valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/users/login')
            .send({ email: 'admin@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    }));
    test('POST /api/users should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request(app)
            .post('/api/users')
            .field('name', 'Test User')
            .field('email', 'testuser@example.com')
            .field('password', 'password')
            .attach('profileImage', 'path/to/test/image.jpg');
        expect(response.status).toBe(201);
        expect(response.body.email).toBe('testuser@example.com');
    }));
});
//# sourceMappingURL=user.test.js.map