import express from 'express';
import { userRegister, userLogin, getUserRegisterPage, getUserLoginPage, postAdminRegister, postAdminLogin, getAdminLogin, getAdminRegister } from '../controller/userController.js';
const userAuthRoute = express.Router();

userAuthRoute.get('/register', getUserRegisterPage);
userAuthRoute.get('/', getUserLoginPage);
userAuthRoute.post('/register', userRegister);
userAuthRoute.post('/login', userLogin);

userAuthRoute.get('/adminlogin', getAdminLogin);
userAuthRoute.get('/adminregister', getAdminRegister);
userAuthRoute.post('/adminregister', postAdminRegister);
userAuthRoute.post('/adminlogin', postAdminLogin);

export default userAuthRoute;