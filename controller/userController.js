import RegUser from '../models/userModel.js';
import book from '../models/bookModel.js';


export const userRegister = async (req, res, next) => {

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
};

export const userLogin = async (req, res, next) => {
    const user = new RegUser({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("login successful");
            res.redirect('/user/dashboard');    //check this area /user
        }
    })
};

export const getUserRegisterPage = (req, res, next) => {
    res.render("registerUser");
}

export const getUserLoginPage = (req, res, next) => {
    res.render("index");
}




// Actual contents


export const getUserDashboard = async (req, res, next) => {
    book.find({}, (err, data) => {
        if(err) {
            console.log(err);
        }
        res.render("bookList", { books: data});
    });
}

export const getUserProfile = async (req, res, next) => {
    res.render("viewUser");
}

export const getChangePassword = async (req, res, next) => {
    res.render("updatePass");
}