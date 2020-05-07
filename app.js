const express  = require('express');
const app= express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

app.use(cors());
app.use(express.json());
Genre = require('./modules/genre');
Book = require('./modules/book');
//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req,res){
    res.send('PLease use /api/books');
});

app.get('/api/genres',(req,res)=>{
    Genre.getGenres((err,genres)=>{
        if (err){
            throw err;

        }
        res.json(genres);
    });
});
app.post('/api/genres',(req,res)=>{
    var genre = req.body;
    Genre.addGenre(genre, (err,genre)=>{
        if (err){
            throw err;

        }
        res.json(genre);
    });
});
app.put('/api/genres/:_id',(req,res)=>{
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, (err,genre)=>{
        if (err){
            throw err;

        }
        res.json(genre);
    });
});
app.delete('/api/genres/:_id',(req,res)=>{
    var id = req.params._id;
    Genre.removeGenre(id,(err,genre)=>{
        if (err){
            throw err;

        }
        res.json(genre);
    });
});
app.get('/api/books',(req,res)=>{
    Book.getBooks((err,books)=>{
        if (err){
            throw err;

        }
        res.json(books);
    });
});
app.post('/api/books',(req,res)=>{
    var book = req.body;
    Book.addBook(book, (err,book)=>{
        if (err){
            throw err;

        }
        res.json(book);
    });
});
app.put('/api/books/:_id',(req,res)=>{
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, (err,book)=>{
        if (err){
            throw err;

        }
        res.json(book);
    });
});
// app.delete('/api/books/:_id',(req,res)=>{
//     var id = req.params.id;
//     console.log(id);
//     Book.removeBook(id,(err,book)=>{
//         if (err){
//             throw err;
//         }
//         res.json(book);
//     });
// });

app.delete('/api/books/:title',(req,res)=>{
    var title = req.params.title;
    console.log(title);
    Book.removeBook(title,(err,book)=>{
        if (err){
            throw err;
        }
        res.json(book);
    });
});


app.listen(3000);
console.log('Running it on 3000...');
