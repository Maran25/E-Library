import { urlencoded } from 'express';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import RegUser from './models/userModel.js';
import adminRoute from './routes/adminRoute.js';
import userRoute from './routes/userRoute.js';
import userAuthRoute from './routes/userAuthRoute.js';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "Hello This is Library",
    resave: false,
    saveUninitialized: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(RegUser.createStrategy());
passport.serializeUser(RegUser.serializeUser());
passport.deserializeUser(RegUser.deserializeUser());

const isAdmin = function (req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    } else {
        res.send('only admin');
    }
}
const isLogged = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

app.use(userAuthRoute);
app.use('/admin', isLogged, isAdmin, adminRoute);
app.use('/user', isLogged, userRoute);


mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/E-Library")
    .then(app.listen(3000, () => { console.log("Server running on port 3000") }))
    .catch((err) => console.log(err));