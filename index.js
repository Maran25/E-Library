const { urlencoded } = require('express');
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({                        //Passport
    secret: "Hello This is Library",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());     //Passport

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/E-Library");

const registerSchema = new mongoose.Schema({
    username: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    phone: { type: Number, requried: true, unique: true },
    password: { type: String, requried: true }
    // cPassword: { type: String, requried: true }
});

const adminSchema = new mongoose.Schema({
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true }
});

const bookSchema = new mongoose.Schema({
    name: { type: String, requried: true, unique: true },
    bookid: { type: String, requried: true, unique: true },
    author: { type: String, requried: true },
    genre: { type: String, requried: true },
    // img: { data: Buffer, contentType: String }
});

registerSchema.plugin(passportLocalMongoose);      //Passport


const book = mongoose.model('BookAdd', bookSchema, 'Books');
const admin = mongoose.model('Admin', adminSchema, 'Admin');
const RegUser = mongoose.model('E-Library', registerSchema, 'UserRegistered');

passport.use(RegUser.createStrategy());
passport.serializeUser(RegUser.serializeUser());          //Passport
passport.deserializeUser(RegUser.deserializeUser());   //Passport


app.get('/', (req, res) => {
    res.render("index");
})

app.get('/signup', (req, res) => {
    res.render("index");
});

app.get('/register', (req, res) => {
    res.render("registerUser");
});

app.post('/register', (req, res) => {

    RegUser.register(new RegUser({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
    }), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/user/dashboard");
            });
        }
    });
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
    // res.sendFile(`${__dirname}/public/addBook.html`);
    res.render("addBook");
})

app.post('/admin/addbook', (req, res) => {
    const Book = new book({
        name: req.body.name,
        author: req.body.author,
        bookid: req.body.bookid,
        genre: req.body.genre
    });
    Book.save();
    setInterval(() => {
        res.redirect('/admin/home');
    }, 2000)
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

app.get('/admin/home', (req, res) => {
    res.render("AdminDashboard");
});

app.get('/admin/userlists', (req, res) => {
    RegUser.find({}, (err, data) => {
        res.render("userList", {users: data});
    });
});

app.get('/admin/booklists', (req, res) => {
    book.find({}, (err, data) => {
        res.render("booktable", {books: data});
    });
});

app.get('/admin/booklists/update/:id', (req, res) => {
    book.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.render('updateBook', {books: docs});
        }
    });
});

app.post('/admin/booklists/update/:id', (req, res) => {
    book.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/booklists');
        }
    });
});

app.get('/admin/userlists/update/:id', (req, res) => {
    RegUser.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("updateUser", {user: docs});
        }
    });
});

app.post('/admin/userlists/update/:id', (req, res) => {
    RegUser.findByIdAndUpdate({_id: req.params.id}, req.body,  (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/userlists');
        }
    });
});

app.get('/admin/userlists/delete/:id', (req, res) => {
    RegUser.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/userlists');
        }
    });
});

app.get('/admin/booklists/delete/:id', (req, res) => {
    book.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/booklists');
        }
    });
});

app.get("/user/profile", (req, res) => {
    res.render("viewUser");
});

app.get('/user/changepass', (req, res) => {
    res.render("updatePass");
});

app.post('/user/changepass', (req, res) => {
    
})

app.listen(3000, () => { console.log("Server running on port 3000") });