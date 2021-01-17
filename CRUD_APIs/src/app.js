//write npm i in terminal to install required packages

const express = require('express');
require('./db/mongooose');
const booksRoutes = require('./routes/books');

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(booksRoutes);


app.listen(port);