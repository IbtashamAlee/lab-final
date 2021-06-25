var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require("mongoose");
require('dotenv').config();
var passport = require("passport");

const db = process.env.TEST_DB;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected");
}).catch(err => {
    console.log("Error is ", err.message);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchRouter = require('./routes/matches')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client-app/build")));
    app.use(express.static("public"));
    /*app.get('/!*', function(req, res) {
        res.sendFile(path.join(__dirname, '/client-app/build/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        })
    })*/
   /* app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client-app/build/index.html"))
    })*/

} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./stratgies/jwt-strategy")(passport);

app.use('/', indexRouter);
app.use('/', matchRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, ".", "client-app/build", "index.html"));
});

module.exports = app;
