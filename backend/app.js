var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1; 
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

// Connect to Neo4j with uri neo4j+s scheme
const driver = neo4j.driver('http://f6664da5.databases.neo4j.io', neo4j.auth.basic(neo4j_user, neo4j_pass));
const session = driver.session()

app.get('/', function(req, res) {

    session.run('MATCH (n:Person) RETURN n LIMIT 25');


    res.send('Hi Mom!');
});

app.listen(3000); // Start server
console.log("Server started on port 3000");

module.exports = app;