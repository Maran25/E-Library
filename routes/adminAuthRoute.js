const express = require('express');
const { adminLogin } = require('../controller/adminController');
const route = express.Router();

route.get('/login', adminLogin);