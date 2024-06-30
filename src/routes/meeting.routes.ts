import express from 'express';
import Meeting from '../models/meeting.model';

const routerM = express.Router();
console.log('inside server meeting router');
routerM.get('/', async (req, res) => {
    try {
        const meeting = await Meeting.find();
        res.json(meeting);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

routerM.post('/', async (req, res) => {
    const { date, name, phone, type } = req.body;
    const meeting = new Meeting({ date, name, phone, type });
    try {
        const newMeeting = await meeting.save();
        console.log(newMeeting);
        res.status(200).json(newMeeting);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
});

routerM.put('/:_id', async (req, res) => {
    try {
        console.log(req.params._id)
        const updateMeeting = await Meeting.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
        console.log("updateMeeting ", updateMeeting);

        if (!updateMeeting)
            res.status(400).json({ message: 'the meeting for update not found!' });
        else
        res.status(200).json(updateMeeting);
    }
    catch (error: any) {
        res.status(400).json({ message: error.message })
    }
});

routerM.delete('/:_id', async (req, res) => {
    try {
        console.log(req.params._id)
        const deleteMeeting = await Meeting.findOneAndDelete({ _id: req.params._id });
        console.log(deleteMeeting);

        if (!deleteMeeting)
            res.status(404).json({ message: 'the meeting for delete not found:(' });
        else
            res.json({ message: 'Meeting deleted successfully!' });
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});
export default routerM;
