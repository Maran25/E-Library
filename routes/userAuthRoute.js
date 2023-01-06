import express from 'express';
import { userRegister, userLogin, getUserRegisterPage, getUserLoginPage } from '../controller/userController.js';
const userAuthRoute = express.Router();

userAuthRoute.get('/register', getUserRegisterPage);
userAuthRoute.get('/', getUserLoginPage);
userAuthRoute.post('/register', userRegister);
userAuthRoute.post('/login', userLogin);

export default userAuthRoute;