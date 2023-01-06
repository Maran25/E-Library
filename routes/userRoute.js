import express from 'express';
import { getUserDashboard, getUserProfile, getChangePassword } from '../controller/userController.js';
const userRoute = express.Router();

userRoute.get('/dashboard', getUserDashboard);
userRoute.get('/profile', getUserProfile);
userRoute.get('/changepass', getChangePassword);

export default userRoute;