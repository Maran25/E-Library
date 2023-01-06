import express from 'express';
import { userRegister, userLogin, getUserRegisterPage, getUserLoginPage, postAdminRegister, postAdminLogin } from '../controller/userController.js';
const userAuthRoute = express.Router();

userAuthRoute.get('/register', getUserRegisterPage);
userAuthRoute.get('/', getUserLoginPage);
userAuthRoute.post('/register', userRegister);
userAuthRoute.post('/login', userLogin);

adminRoute.post('/adminregister', postAdminRegister);
adminRoute.post('/adminlogin', postAdminLogin);

export default userAuthRoute;