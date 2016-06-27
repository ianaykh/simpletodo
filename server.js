var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

mongoose.connect("mongodb://localhost:27017/tododb");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.on('open', function () {
    console.log("Connected to database");
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/js'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'aplication/vnd.api+json' }));
app.use(methodOverride());

var date = new Date();
currentDate = date.getDate();     // Get current date
month = date.getMonth() + 1; // current month
year = date.getFullYear();


var Todos = mongoose.model('todo', {
    text: String,
    done: Boolean,
    date: { type: String },
    time: { type: String }
});

app.get("/", function (req, res, next) {
    res.sendFile(path.join(___dirname, './public', 'index.html'));
});

app.get('/gettodos', function (req, res, next) {
    Todos.find(function (err, todos) {
        if (err)
            res.send(err);

        res.json(todos);
    });
});

app.post('/create', function (req, res, next) {

    Todos.create({
        text: req.body.text,
        done: false
    }, function (err, newtodo) {
        if (err)
            res.send(err)

        Todos.find(function (err, todos) {

            if (err)
                res.send(err);

            res.json(todos);

        });
    });

});


app.delete('/delete/:todo_id', function (req, res, next) {

    Todos.remove({
        _id: req.params.todo_id
    }, function (err, todo) {

        if (err)
            res.send(err);

        Todos.find(function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

});

app.put('/update/', function (req, res, next) {

    query = { _id: req.body.ID };
    update = { text: req.body.text }
    options = { multi: false }
    Todos.update(query, update, options, function (err, todos) {
        if (err)
            res.send(err);

        Todos.find(function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });

    });
});



app.listen(3000);
console.log("app listening at  port 3000");