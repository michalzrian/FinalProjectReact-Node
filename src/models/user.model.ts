import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, },
    role: { type: String, default: 'user' }
});

// Define the collection name as 'users' instead of 'Users'
const Users = mongoose.model('User', userSchema, 'users');

export default Users;
