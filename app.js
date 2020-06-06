const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');
const fs = require('fs');
const app = express();

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 2000;
var dir = './public/assets/img';

// create connection to database
const db = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'socka',
    password : 'qwe123',
    port : 5432,
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');

});

global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/search', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

// make file storage
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
