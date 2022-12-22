const { urlencoded } = require('express');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/E-Library");
const app = express();
app.set('view engine', 'ejs');

const registerSchema = {
    userName: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    cPassword: { type: String, requried: true }
};

const RegUser = mongoose.model('E-Library', registerSchema, 'RegisterUser');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
});

app.post('/register', (res,req) => {
    RegUser.create({
        userName : res.body.userName,
        email : res.body.email,
        password : res.body.password,
        cPassword : res.body.cPassword
    }, function(err, data) {
        if(err) throw err;
        console.log(data);
    });
    req.redirect('/');
});

app.post('/signup', (res, req) => {
    RegUser.findOne({email : res.body.email}, (err, data) => {
        if(err) { 
            throw err;
         }
        else {
            if(data === null) {
                console.log("Invalid Email");
            }
            else if((data.password === res.body.password) && (data.email === res.body.email)) {
                console.log("Login Success");
                req.redirect('/user/dashboard');
            }
            else {
                console.log("Invalid password");
            }
        }
    })
    // req.redirect('/');
});

app.get('/user/dashboard', (req, res) => {
    // res.sendFile(`${__dirname}/public/bookList.html`);
    res.sendFile(`${__dirname}/public/dashboardAdmin.html`);
});

app.get('admin/home', (req, res) => {
});

app.listen(4000, () => { console.log("Server running on port 4000")});