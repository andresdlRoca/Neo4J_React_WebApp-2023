var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver'); 
const dotenv = require('dotenv');
const { type } = require('os');
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
    res.send('Hi Mom!');
});

/*
Adding Nodes Section
*/
app.post('/person/add_user', function(req, res) {
    var name = req.body.name;
    var type_user = req.body.type_user; //VOLUNTEER, USER, VET
    var age = parseInt(req.body.age);
    var allergic = Boolean(req.body.allergic);
    var has_family = Boolean(req.body.has_family);
    var has_pets = Boolean(req.body.has_pets);
    var email = req.body.email;
    var sedentary = Boolean(req.body.sedentary);

    

    session
    .run('CREATE (:PERSON:'+ type_user +'{name: $nameBody, age: $ageBody, email: $emailBody, has_family: $has_familyBody, has_pets: $has_petsBody, sedentary: $sedentaryBody, allergic: $allergicBody})', {nameBody: name, ageBody: age, emailBody: email, has_familyBody: has_family, has_petsBody: has_pets, sedentaryBody: sedentary, allergicBody: allergic})
    .then(function(result) {
        res.json({message: 'Person added successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });

});

app.post('/dog/add', function(req, res) {
    var name = req.body.name;
    var adopted = req.body.adopted;
    var age = req.body.age;
    var neutered = req.body.neutered;
    var rescue_date = req.body.rescue_date;
    var vaccines = req.body.vaccines;

    session
    .run('CREATE (:DOG {name: $nameBody, age: $ageBody, rescue_date: $rescue_dateBody, vaccines: $vaccinesBody, adopted: $adoptedBody, neutered: $neuteredBody})', {nameBody: name, adoptedBody: adopted, ageBody: age, neuteredBody: neutered, rescue_dateBody: rescue_date, vaccinesBody: vaccines})
    .then(function(result) {
        res.json({message: 'Dog added successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });
});

app.post('/race/add', function(req, res) {
    var race_name = res.body.race_name;
    var avg_lifespan = res.body.avg_lifespan;
    var energetic = res.body.energetic;
    var family_friendly = res.body.family_friendly;
    var hypoallergenic = res.body.hypoallergenic;
    var sheds = res.body.sheds;
    var size = res.body.size;

    session
    .run('CREATE (:RACE {race_name: $race_nameBody, sheds: $shedsBody, energetic: $energeticBody, hypoallergenic: $hypoallergenicBody, family_friendly: $family_friendlyBody, size: $sizeBody, avg_lifespan: $avg_lifespanBody})', {race_nameBody: race_name, avg_lifespanBody: avg_lifespan, energeticBody: energetic, family_friendlyBody: family_friendly, hypoallergenicBody: hypoallergenic, shedsBody: sheds, sizeBody: size})
    .then(function(result) {
        res.json({message: 'Race added successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });
});

app.post('/shelter/add', function(req, res) {
    var name = req.body.name;
    var location = req.body.location;
    var foundation_data = req.body.foundation_data;
    var volunteers = req.body.volunteers;

    session
    .run('CREATE (:SHELTER {name: $nameBody, location: $locationBody, volunteers: $volunteerBody, foundation_date: $foundation_dateBody})', {nameBody: name, locationBody: location, volunteersBody: volunteers, foundation_dataBody: foundation_data})
    .then(function(result) {
        res.json({message: 'Shelter added successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });
});


/*
Creating Relationships Section
*/

//Person -> Dog
app.post('/person/:nameParam/dog/:dogParam', function(req, res) {
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name
    var type_relationship = req.body.type_relationship; //ADOPTED, HAS_VISITED, LIKES, DISLIKES, ATTENDING, ASSIGNED_TO
    var since = req.body.since;
    var picked_up = req.body.picked_up;
    var adopted_in = req.body.adopted_in;


    if (type_relationship == 'ADOPTED') {
        session
        .run('MATCH (a:PERSON {name: $nameParam}), (b:DOG {name: $dogParam}) MERGE (a)-[r:ADOPTED {since: $sinceBody, picked_up: $picked_upBody, adopted_in: $adopted_inBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since, picked_upBody: picked_up, adopted_inBody: adopted_in})
        .then(function(result) {
            res.json({message: 'Relationship (ADOPTED) created successfully'});
            // res.redirect('/');
            // session.close();
        })
    
        .catch(function(err) {
            console.log(err);
        });
    } else {
        session
        .run('MATCH (a:PERSON {name: $nameParam}), (b:DOG {name: $dogParam}) MERGE (a)-[r:' + type_relationship + ']->(b)', {nameParam: nameParam, dogParam: dogParam, type_relationshipBody: type_relationship})
        .then(function(result) {
            res.json({message: 'Relationship created successfully'});
            // res.redirect('/');
            // session.close();
        })
    
        .catch(function(err) {
            console.log(err);
        });
    }
});

// Dog -> Volunteer (RESCUED_BY)
app.post('/dog/:dogParam/rescued_by/person/:nameParam', function(req, res) {
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:PERSON:VOLUNTEER {name: $nameParam}) MERGE (a)-[r:RESCUED_BY]->(b)', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        res.json({message: 'Relationship (RESCUED_BY) created successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });

});

// Dog -> Vet (ASSIGNED_TO)
app.post('/dog/:dogParam/assigned_to/person/:nameParam', function(req, res) {
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:PERSON:VET {name: $nameParam}) MERGE (a)-[r:ASSIGNED_TO]->(b)', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        res.json({message: 'Relationship (ASSIGNED_TO) created successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });

});


//Dog -> Shelter (IS_IN, TRANSFERRED_FROM)
app.post('/dog/:dogParam/shelter/:nameParam', function(req, res) {
    var nameParam = req.params.nameParam; // Shelter's name
    var dogParam = req.params.dogParam; //Dog's name
    var type_relationship = req.body.type_relationship; //IS_IN, TRANSFERRED_FROM
    var since = req.body.since;
    var origin = req.body.origin;
    var staff_ratio = req.body.staff_ratio;

    if (type_relationship == 'IS_IN') {
        session
        .run('MATCH (a:DOG {name: $dogParam}), (b:SHELTER {name: $nameParam}) MERGE (a)-[r:IS_IN {since: $sinceBody, origin: $originBody, staff_ratio: $staff_ratioBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since, originBody: origin, staff_ratioBody: staff_ratio})
        .then(function(result) {
            res.json({message: 'Relationship (IS_IN) created successfully'});
            // res.redirect('/');
            // session.close();
        })
    
        .catch(function(err) {
            console.log(err);
        });
    } else if (type_relationship == 'TRANSFERRED_FROM') {
        session
        .run('MATCH (a:DOG {name: $dogParam}), (b:SHELTER {name: $nameParam}) MERGE (a)-[r:TRANSFERRED_FROM {since: $sinceBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since})
        .then(function(result) {
            res.json({message: 'Relationship (IS_IN) created successfully'});
            // res.redirect('/');
            // session.close();
        })
    
        .catch(function(err) {
            console.log(err);
        });
    }
});

//Dog -> Race (IS_A)
app.post('/dog/:dogParam/race/:race_nameParam', function(req, res) {
    var race_nameParam = req.params.race_nameParam
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:RACE {race_name: $race_nameParam}) MERGE (a)-[r:IS_A]->(b)', {race_nameParam: race_nameParam, dogParam: dogParam})
    .then(function(result) {
        res.json({message: 'Relationship (IS_IN) created successfully'});
        // res.redirect('/');
        // session.close();
    })

    .catch(function(err) {
        console.log(err);
    });

});


/*
Updating Nodes Section
*/

/*
Updating Relationships Section
*/


/*
Deleting Nodes Section
*/

/*
Deleting Relationships Section
*/

/* 
Get Data Section
*/

//Gets Dog by name
app.get('/dog/:dogParam', function(req, res) {
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (n:DOG {name: $dogParam}) RETURN n', {dogParam: dogParam})
    .then(function(result) {
        var dog = [];
        result.records.forEach(function(record) {
            dog.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,
            });
        });

        res.json(dog);
    })

    .catch(function(err) {
        console.log(err);
    });
});

//Get available dogs
app.get('/available_dogs', function(req, res) {
    session
    .run('MATCH (n:DOG) WHERE NOT (:PERSON)-[:ADOPTED]->(n) RETURN n')
    .then(function(result) {
        var available_dogs = [];
        result.records.forEach(function(record) {
            available_dogs.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,
            });
        });

        res.json(available_dogs);
    })
    
    .catch(function(err) {
        console.log(err);
    });
});

//Gets Other Users
app.get('/other_users', function(req, res) {
    session
    .run('MATCH (n:PERSON) RETURN n')
    .then(function(result) {
        var other_users = [];
        result.records.forEach(function(record) {
            other_users.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                email: record._fields[0].properties.email,
                allergic: record._fields[0].properties.allergic,
                has_family: record._fields[0].properties.has_family,
                has_pets: record._fields[0].properties.has_pets,
                sedentary: record._fields[0].properties.sedentary,

            });
        });

        res.json(other_users);
    })

    .catch(function(err) {
        console.log(err);
    });
});



app.listen(3000); // Start server
console.log("Server started on port 3000");

module.exports = app;