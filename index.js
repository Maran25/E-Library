const { urlencoded } = require('express');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { Alert } = require('bootstrap');

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

const adminSchema = {
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true }
};

const bookSchema = {
    name: { type: String, requried: true, unique: true },
    bookid: { type: String, requried: true, unique: true },
    author: { type: String, requried: true },
    genre: { type: String, requried: true },
    // img: { data: Buffer, contentType: String }
};

const book = mongoose.model('BookAdd', bookSchema, 'Books');
const admin = mongoose.model('Admin', adminSchema, 'Admin');
const RegUser = mongoose.model('E-Library', registerSchema, 'RegisterUser');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (res, req) => {
    RegUser.create({
        userName: res.body.userName,
        email: res.body.email,
        password: res.body.password,
        cPassword: res.body.cPassword
    }, function (err, data) {
        if (err) throw err;
        console.log(data);
    });
    req.redirect('/');
});

// User Login and Register page

app.post('/signup', (res, req) => {
    RegUser.findOne({ email: res.body.email }, (err, data) => {
        if (err) {
            throw err;
        }
        else {
            if (data === null) {
                console.log("Invalid Email");
            }
            else if ((data.password === res.body.password) && (data.email === res.body.email)) {
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

// Admin Login Verification
app.get('/admin', (req, res) => {
    res.sendFile(`${__dirname}/public/adminLogin.html`);
})

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

app.get('/admin/addbook', (req, res) => {
    res.sendFile(`${__dirname}/public/addBook.html`);
})

app.post('/admin/addbook', (req, res) => {
    const Book = new book({
        name: req.body.name,
        author: req.body.author,
        bookid: req.body.bookid,
        genre: req.body.genre
    });
    Book.save();
    res.redirect('/admin/home');
});



app.get('/user/dashboard', (req, res) => {
    res.sendFile(`${__dirname}/public/bookList.html`);
});

app.get('/admin/home', (req, res) => {
    res.sendFile(`${__dirname}/public/dashboard.html`);
});



app.listen(4000, () => { console.log("Server running on port 4000") });