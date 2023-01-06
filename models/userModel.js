import mongoose from 'mongoose';
// const passportLocalMongoose = require('passport-local-mongoose');
import passportLocalMongoose from 'passport-local-mongoose';

const registerSchema = new mongoose.Schema({
    username: { type: String, requried: true, unique: true },
    name: { type: String, requried: true },
    phone: { type: Number, requried: true, unique: true },
    password: { type: String, requried: true },
    role: { type: String, default: "user"}
    // cPassword: { type: String, requried: true }
});

registerSchema.plugin(passportLocalMongoose); 

const RegUser = mongoose.model('E-Library', registerSchema, 'UserRegistered');

export default RegUser;