const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:')); 

connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const productRouter = require('./routes/product');
const productCategoryRouter = require('./routes/productCategory');
const historyRouter = require('./routes/history');

app.use('/product',productRouter);
app.use('/productCategory',productCategoryRouter);
app.use('/history',historyRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});