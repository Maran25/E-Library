import express from 'express';
import { getAddBook, postAddBook, getDashboard, getUserList, getBookList, getBooklistUpdate, postBooklistUpdate, getUserlistUpdate, postUserlistUpdate, getUserlistDelete, getBooklistDelete } from '../controller/adminController.js';
const adminRoute = express.Router();

adminRoute.get('/addbook', getAddBook);
adminRoute.post('/addbook', postAddBook);
adminRoute.get('/dashboard', getDashboard);
adminRoute.get('/userlists', getUserList);
adminRoute.get('/booklists', getBookList);
adminRoute.get('/booklists/update/:id', getBooklistUpdate);
adminRoute.post('/booklists/update/:id', postBooklistUpdate);
adminRoute.get('/userlists/update/:id', getUserlistUpdate);
adminRoute.post('/userlists/update/:id', postUserlistUpdate);
adminRoute.get('/userlists/delete/:id', getUserlistDelete);
adminRoute.get('/booklists/delete/:id', getBooklistDelete);

export default adminRoute;