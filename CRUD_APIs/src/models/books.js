const mongoose = require('mongoose');
const validator = require('validator');
const Books = mongoose.model('books',{

    name:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
        maxLength:50
    },
    author:{
        type:String,
        required:true,
        trim:true,
        minLength:4,
        maxLength:30
    },
    date:{
        type:Date,
        required:true
    }

})

module.exports = Books;