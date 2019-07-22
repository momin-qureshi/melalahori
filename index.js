var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
var path = require('path');

var app = express();

app.use(cors());
app.use(bodyparser.json());

const port = 3000;
const route = require('./routes/route');

mongoose.connect('mongodb://localhost:27017/locations',{useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

mongoose.connection.on('connected', ()=>{
    console.log('mongodb @ 27017');
});

app.use('/api', route);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.send('foobar');
});

app.listen(port, ()=>{
    console.log('server started at ' + port);
});