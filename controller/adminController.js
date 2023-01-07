import RegUser from '../models/userModel.js';
import book from '../models/bookModel.js';


export const getAddBook = async (req, res, next) => {
    res.render("addBook");
}

export const getDashboard = async (req, res, next) => {
    res.render("AdminDashboard");
}

export const postAddBook = async (req, res, next) => {
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
}

export const getUserList = async (req, res, next) => {
    RegUser.find({}, (err, data) => {
        res.render("userList", {users: data});
    });
}

export const getBookList = async (req, res, next) => {
    book.find({}, (err, data) => {
        res.render("booktable", {books: data});
    });
}

export const getBooklistUpdate = async (req, res, next) => {
    book.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.render('updateBook', {books: docs});
        }
    });
}

export const postBooklistUpdate = async (req, res, next) => {
    book.findByIdAndUpdate({_id: req.params.id}, req.body, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/booklists');
        }
    });
}

export const getUserlistUpdate = async (req, res, next) => {
    RegUser.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("updateUser", {user: docs});
        }
    });
}

export const postUserlistUpdate = async (req, res, next) => {
    RegUser.findByIdAndUpdate({_id: req.params.id}, req.body,  (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/userlists');
        }
    });
}

export const getUserlistDelete = async (req, res, next) => {
    RegUser.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/userlists');
        }
    });
}

export const getBooklistDelete = async (req, res, next) => {
    book.findByIdAndDelete({_id: req.params.id}, (err, docs) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/admin/booklists');
        }
    });
}