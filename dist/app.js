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
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const meeting_routes_1 = __importDefault(require("./routes/meeting.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const mailgun_1 = __importDefault(require("./routes/mailgun"));
const dotenv = require('dotenv');
const path_1 = __importDefault(require("path"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const pathToUploads = path_1.default.join(__dirname, '../dist/routes');
console.log("Serving static files from:", pathToUploads);
app.use('/uploads', express_1.default.static(pathToUploads));
app.use('/api/users', user_routes_1.default);
app.use('/api/meetings', meeting_routes_1.default);
app.use('/api', mailgun_1.default);
// app.use(authenticateToken);
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost:27017/DictionaryMeetingF', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
});
connectDB();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=app.js.map