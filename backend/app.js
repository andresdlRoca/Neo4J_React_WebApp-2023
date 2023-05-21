var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver'); 
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

var app = express(); // App initialization

// View engine setup
app.set('views', path.join(__dirname, 'views')); // Set views folder
app.set('view engine', 'ejs'); // Set view engine to ejs

// Middleware
app.use(logger('dev')); // Log requests to console
app.use(bodyParser.json()); // Parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Set public folder

const neo4j_user = process.env.NEO4J_USER;
const neo4j_pass = process.env.NEO4J_PASS;



const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic(neo4j_user, neo4j_pass));
const session = driver.session()


app.get('/', function(req, res) {

    session
        .run('MATCH (n:Person) RETURN n LIMIT 25')
        .then(function(result) {
            var personArr = [];
            result.records.forEach(function(record) {
                personArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name
                });
            });
            console.log(personArr);
        })
        .catch(function(err) {
            console.log(err);
        });
        
    res.send('Hi Mom!');

});

// Add Person (Testeando las requests con esta onda)
app.post('/person/add', function(req, res) {
    var name = req.body.name;
    session
        .run('CREATE (n:Person {name: $nameParam}) RETURN n.name', {nameParam: name})
        .then(function(result) {
            res.redirect('/');
            session.close();
        })

        .catch(function(err) {
            console.log(err);
        });
});

app.listen(3000); // Start server
console.log("Server started on port 3000");

module.exports = app;