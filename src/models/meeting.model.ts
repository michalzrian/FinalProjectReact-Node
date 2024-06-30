import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, required: true },
});
const Meeting = mongoose.model('Meeting', meetingSchema, 'meetings');


export default Meeting;