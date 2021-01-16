const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const publicDir = path.join(__dirname,'../public');
const viewsDir = path.join(__dirname,'../frontEnd/views');
const layoutsDir = path.join(__dirname,'../frontEnd/layouts');
const getNews = require('./utils/getNewsData');

app.use(express.static(publicDir));
app.set('view engine','hbs');
app.set('views',viewsDir);
hbs.registerPartials(layoutsDir);

app.get('',(req,res)=>{

    getNews.getData((err,response)=>{
        if(err){
            pageData = [];
            errFlag = true;
        }
        else{
            pageData = response;
            errFlag = false;
        }
        res.render('general',{pageData})
    })
})

app.get('/:category',(req,res)=>{

    getNews.getCategory(req.params.category,(err,response)=>{
        if(err){
            pageData = [];
            errFlag = true;
        }
        else{
            pageData = response;
            errFlag = false;
        }
        res.render('general',{pageData})
    })
})


app.listen(3000);