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
const meeting_model_1 = __importDefault(require("../models/meeting.model"));
const routerM = express_1.default.Router();
console.log('inside server meeting router');
routerM.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meeting = yield meeting_model_1.default.find();
        res.json(meeting);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
routerM.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, name, phone, type } = req.body;
    const meeting = new meeting_model_1.default({ date, name, phone, type });
    try {
        const newMeeting = yield meeting.save();
        console.log(newMeeting);
        res.status(200).json(newMeeting);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
routerM.put('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params._id);
        const updateMeeting = yield meeting_model_1.default.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        console.log("updateMeeting ", updateMeeting);
        if (!updateMeeting)
            res.status(400).json({ message: 'the meeting for update not found!' });
        else
            res.status(200).json(updateMeeting);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
routerM.delete('/:_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params._id);
        const deleteMeeting = yield meeting_model_1.default.findOneAndDelete({ _id: req.params._id });
        console.log(deleteMeeting);
        if (!deleteMeeting)
            res.status(404).json({ message: 'the meeting for delete not found:(' });
        else
            res.json({ message: 'Meeting deleted successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = routerM;
//# sourceMappingURL=meeting.routes.js.map