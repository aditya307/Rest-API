var mongoose = require('mongoose');

//Genre Schema
var bookSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    page:{
        type:String
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit){
    Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id, callback){
    Book.findById(id,callback);
}
// add
module.exports.addBook =(book, callback)=>{
    Book.create(book,callback);
}
//update
module.exports.updateBook =(id, book, options, callback)=>{
    var query={_id:id};
    var update={
        title:book.title,
        genre:book.genre,
        description:book.description,
        author:book.author,
        publisher:book.publisher,
        page:book.page
    }
    Book.findByIdAndUpdate(query,update,options,callback);
}

//Delete Genre
module.exports.removeBook =(title,callback)=>{
    var query={title};
    Book.deleteOne(query,callback);

// }

// module.exports.removeBook =(id,callback)=>{
//     var query={id};
//     // console.log(query)
//     Book.deleteOne(query,callback);

}