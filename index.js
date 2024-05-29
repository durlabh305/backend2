const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const route  = require('./Routes/route');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

mongoose.connect('mongodb+srv://admin:admin123@cluster0.qallvfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => { console.log('DB connected Successfully') })
    .catch((error) => { console.log("Something went wrong", error) })

app.use('/', route)
app.listen(port, function(){
    console.log(`Express is running `);
})