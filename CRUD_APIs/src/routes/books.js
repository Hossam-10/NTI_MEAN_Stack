const express = require('express');
const books = require('../models/books')
const router = express.Router();

router.post('/register', async(req,res)=>{
    const book = new books(req.body);
    try{
        await book.save();
        res.send({
            status: 1,
            message:'data inserted successfuly',
            data: book
        })
    }
    catch(e){
        res.send({
            status:0,
            message: 'data inserting error',
            data: e
        })
    }
})

router.get('/getBooks', async(req,res)=>{
    try{
        allBooks = await books.find({});
        if(!allBooks){
            return res.send({
                status:2,
                message:"There are no books",
                data:{}
            })
        }
        res.send({
            status:1,
            message: 'all data retriverd',
            data: allBooks
        })
    }catch(e){
        res.send({
            status:0,
            message:'error',
            data:''
        })
    }
})

router.get('/getBook/:bookID', async(req,res)=>{
    try{
        const book = await books.findById(req.params.bookID);
        if(!book)
        {
            return res.send({
                status:2,
                message:"No book found",
                data:{}
            })
        }
        res.send({
            status:1,
            message:"Book is found",
            data:book
        })

    }catch(e){
        res.send({
            status:0,
            message:"Book not found",
            data:{}
        })
    }
})

router.patch('/editBook/:bookID', async(req,res)=>{
    avlUpdates = ["name", "author"]
    const keys = Object.keys(req.body) // [name]
    const flag = keys.every((k)=> avlUpdates.includes(k))  //name true 
    if(!flag) return res.send({
        status:0,
        message:"invalid update keys",
        data:""
    })
    try{
        console.log('hi')
        const bookk = await books.findByIdAndUpdate(
            req.params.bookID,
            req.body,
            {runValidators:true}
        )
        if(!book){
            return res.send({
                status:2,
                message: 'book not found',
                data:''
            })
        }
        res.send({
            status:1,
            message:"updated",
            data: bookk
        })
    }
    catch(e){
        res.send({
            status:0,
            message: 'error in edit',
            data: ''
        })
    }
})

router.delete('/deleteBook/:bookID' , async(req,res)=>{
    try{
        const book = await books.findByIdAndDelete(req.params.bookID);
        if(!book){
            return res.send({
                status:2,
                message:"Book is not found to be deleted"
            })
        }
        res.send({
            status:1,
            message:"Book is deleted succefully"
        })
    }
    catch(e){
        res.send({
            status:0,
            message:"Error found"
        })
    }
})
module.exports = router;