import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import meetingRouter from './routes/meeting.routes';
import userRouter from './routes/user.routes';
import mailGun from './routes/mailgun';
const dotenv = require('dotenv');
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT
app.use(cors());
app.use(express.json());

const pathToUploads = path.join(__dirname, '../dist/routes');
console.log("Serving static files from:", pathToUploads);
app.use('/uploads', express.static(pathToUploads));

app.use('/api/users', userRouter);
app.use('/api/meetings', meetingRouter);
app.use('/api' , mailGun);

// app.use(authenticateToken);

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/DictionaryMeetingF', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
