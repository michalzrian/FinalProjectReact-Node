import express from 'express';
import User from '../models/user.model';
import { ADMIN } from '../config';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const dotenv = require('dotenv');
const multer = require('multer');

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, 'dist/routes/uploads');
    },
    filename: function (req: any, file: any, cb: any) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const app = express();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === ADMIN.email && password === ADMIN.password) {
            console.log("admin");
            const token = jwt.sign({ id: ADMIN.id, role: 'admin' }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.json({ message: 'Login successful', user: { role: 'admin' }, token });
        }

        const user = await User.findOne({ email });
        // console.log(user?.password);

        if (!user) {
            return res.json({ message: 'User not found', user: null });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);

        if (!passwordMatch) {
            console.log("The password is incorrect")
            return res.json({ message: 'The password is incorrect!', user: null });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user: { role: 'user' }, token });
    } catch (error: any) {
        res.status(500).json({ message: error.message, user: null });
    }
});

router.post('/', upload.single('profileImage'), async (req: any, res) => {
    try {
        const { name, email, password, profileImage } = req.body;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profileImage,
        });
        console.log(newUser.profileImage);
        console.log(newUser.email);

        const saveUser = await newUser.save();
        console.log(saveUser.email)
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/upload', upload.single('profileImage'), (req: any, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    console.log(req.file);
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
