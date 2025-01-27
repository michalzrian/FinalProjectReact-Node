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
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = require("../config");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express_1.default.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');
const multer = require('multer');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'dist/routes/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
const app = (0, express_1.default)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (email === config_1.ADMIN.email && password === config_1.ADMIN.password) {
            console.log("admin");
            const token = jwt.sign({ id: config_1.ADMIN.id, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', user: { role: 'admin' }, token });
        }
        const user = yield user_model_1.default.findOne({ email });
        // console.log(user?.password);
        if (!user) {
            return res.json({ message: 'User not found', user: null });
        }
        const passwordMatch = yield bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (!passwordMatch) {
            console.log("The password is incorrect");
            return res.json({ message: 'The password is incorrect!', user: null });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user: { role: 'user' }, token });
    }
    catch (error) {
        res.status(500).json({ message: error.message, user: null });
    }
}));
router.post('/', upload.single('profileImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, profileImage } = req.body;
        const saltRounds = 10;
        const salt = yield bcrypt.genSalt(saltRounds);
        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            profileImage,
        });
        console.log(newUser.profileImage);
        console.log(newUser.email);
        const saveUser = yield newUser.save();
        console.log(saveUser.email);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.post('/upload', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log(req.file);
    res.json({ filePath: `/uploads/${req.file.filename}` });
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map