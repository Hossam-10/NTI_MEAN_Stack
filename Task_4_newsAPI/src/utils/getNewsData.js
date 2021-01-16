const { response } = require('express');
const request = require('request');

const getData = (cb)=>{

    const url = `http://newsapi.org/v2/top-headlines?country=eg&apiKey=71973bad2aae41bd889fe188b68d9446`;
    request({url,json:true},(err,response)=>{
        if(err)
            cb('Server error',undefined)
        else
            cb(undefined,(response.body).articles);
    })
}

const getCategory = (category,cb)=>{

    const url = `http://newsapi.org/v2/top-headlines?country=eg&category=${category}&apiKey=71973bad2aae41bd889fe188b68d9446`;

    request({url,json:true},(err,response)=>{
        if(err)
            cb('Server error',undefined)
        else
            cb(undefined,(response.body).articles);
    })
}

module.exports = {getData,getCategory};