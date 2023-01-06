import mongoose from 'mongoose';


const bookSchema = new mongoose.Schema({
    name: { type: String, requried: true, unique: true },
    bookid: { type: String, requried: true, unique: true },
    author: { type: String, requried: true },
    genre: { type: String, requried: true },
    // img: { data: Buffer, contentType: String }
});


const book = mongoose.model('BookAdd', bookSchema, 'Books');
export default book;