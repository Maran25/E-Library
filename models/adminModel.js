import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema({
    username: { type: String, requried: true, unique: true },
    password: { type: String, requried: true }
});


const admin = mongoose.model('Admin', adminSchema, 'Admin');
// module.exports
export default admin;