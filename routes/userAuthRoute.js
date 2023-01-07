import express from 'express';
import { userRegister, userLogin, getUserRegisterPage, getUserLoginPage, postAdminRegister, postAdminLogin, getAdminLogin, getAdminRegister, getUserLogout, getAdminLogout } from '../controller/userController.js';
const userAuthRoute = express.Router();

userAuthRoute.get('/register', getUserRegisterPage);
userAuthRoute.get('/', getUserLoginPage);
userAuthRoute.post('/register', userRegister);
userAuthRoute.post('/login', userLogin);

userAuthRoute.get('/adminlogin', getAdminLogin);
userAuthRoute.get('/adminregister', getAdminRegister);
userAuthRoute.post('/adminregister', postAdminRegister);
userAuthRoute.post('/adminlogin', postAdminLogin);

userAuthRoute.get('/logout', getUserLogout);
userAuthRoute.get('/adminlogout', getAdminLogout);
export default userAuthRoute;