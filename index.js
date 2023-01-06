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

app.use(userAuthRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);


app.post('/admin', (res, req) => {
    admin.findOne({ email: res.body.email }, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            if (data === null) {
                console.log("Invalid Email");
            }
            else if ((data.password === res.body.password) && (data.email === res.body.email)) {
                console.log("Login Success");
                req.redirect('/admin/home');
            }
            else {
                console.log("Invalid password");
            }
        }
    })
    // req.redirect('/');
});



app.get('/user/dashboard', (req, res) => {
    if(req.isAuthenticated()) {
        book.find({}, (err, data) => {
            res.render("bookList", { books: data});
        });
    } else {
        res.redirect('/signup')
    }
});



mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/E-Library")
    .then(app.listen(3000, () => { console.log("Server running on port 3000") }))
    .catch((err) => console.log(err));