const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/E-Library");
const app = express();

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
    // password = res.body.password;
    RegUser.findOne({email : res.body.email}, (err, data) => {
        if(err) { 
            throw err;
         }
        else {
            if(data === null) {
                console.log("Invalid Username");
            }
            else if(data.password === res.body.password) {
                console.log("Login Success");
            }
            else {
                console.log("Invalid password");
            }
        }
    })
    req.redirect('/');
});

app.listen(3000, () => { console.log("Server running on port 3000")});