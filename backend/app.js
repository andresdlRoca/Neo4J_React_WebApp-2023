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
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*'); // Origin, X-Requested-With, Content-Type, Accept
    next();
});

const neo4j_user = process.env.NEO4J_USER;
const neo4j_pass = process.env.NEO4J_PASS;

const driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic(neo4j_user, neo4j_pass));
var session = driver.session()


app.get('/', function(req, res) {
    res.send('Hi Mom!');
});

/*
Adding Nodes Section
*/
app.post('/person/add_user', function(req, res) {
    session = driver.session();
    var name = req.body.name;
    var type_user = req.body.type_user; //VOLUNTEER, USER, VET
    var age = parseInt(req.body.age);
    var allergic = req.body.allergic;
    allergic = allergic === "true";
    var has_family = req.body.has_family;
    has_family = has_family === "true";
    var has_pets = req.body.has_pets;
    has_pets = has_pets === "true";
    var email = req.body.email;
    var sedentary = req.body.sedentary;
    sedentary = sedentary === "true";

    

    session
    .run('CREATE (:PERSON:'+ type_user +'{name: $nameBody, age: $ageBody, email: $emailBody, has_family: $has_familyBody, has_pets: $has_petsBody, sedentary: $sedentaryBody, allergic: $allergicBody})', {nameBody: name, ageBody: age, emailBody: email, has_familyBody: has_family, has_petsBody: has_pets, sedentaryBody: sedentary, allergicBody: allergic})
    .then(function(result) {
        session.close();
        res.json({message: 'Person added successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });

});

app.post('/dog/add', function(req, res) {
    session = driver.session();
    var name = req.body.name;
    var adopted = req.body.adopted;
    adopted = adopted === "true";
    var age = parseInt(req.body.age);
    var neutered = req.body.neutered;
    neutered = neutered === "true";
    var rescue_date = req.body.rescue_date;
    var vaccines = req.body.vaccines;

    session
    .run('CREATE (:DOG {name: $nameBody, age: $ageBody, rescue_date: '+ rescue_date +', vaccines: '+vaccines+', adopted: $adoptedBody, neutered: $neuteredBody})', {nameBody: name, adoptedBody: adopted, ageBody: age, neuteredBody: neutered, rescue_dateBody: rescue_date, vaccinesBody: vaccines})
    .then(function(result) {
        session.close();
        res.json({message: 'Dog added successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });
});

app.post('/race/add', function(req, res) {
    session = driver.session();
    var race_name = res.body.race_name;
    var avg_lifespan = parseInt(res.body.avg_lifespan);
    var energetic = res.body.energetic;
    energetic = energetic === "true";
    var family_friendly = res.body.family_friendly;
    family_friendly = family_friendly === "true";
    var hypoallergenic = res.body.hypoallergenic;
    hypoallergenic = hypoallergenic === "true";
    var sheds = res.body.sheds;
    sheds = sheds === "true";
    var size = res.body.size;

    session
    .run('CREATE (:RACE {race_name: $race_nameBody, sheds: $shedsBody, energetic: $energeticBody, hypoallergenic: $hypoallergenicBody, family_friendly: $family_friendlyBody, size: $sizeBody, avg_lifespan: $avg_lifespanBody})', {race_nameBody: race_name, avg_lifespanBody: avg_lifespan, energeticBody: energetic, family_friendlyBody: family_friendly, hypoallergenicBody: hypoallergenic, shedsBody: sheds, sizeBody: size})
    .then(function(result) {
        session.close();
        res.json({message: 'Race added successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });
});

app.post('/shelter/add', function(req, res) {
    session = driver.session();
    var name = req.body.name;
    var location = req.body.location;
    var foundation_date = req.body.foundation_data;
    var volunteers = parseInt(req.body.volunteers);

    session
    .run('CREATE (:SHELTER {name: $nameBody, location: $locationBody, volunteers: $volunteerBody, foundation_date: '+foundation_date+'})', {nameBody: name, locationBody: location, volunteersBody: volunteers})
    .then(function(result) {
        session.close();
        res.json({message: 'Shelter added successfully'});
        // res.redirect('/');
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
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name
    var type_relationship = req.body.type_relationship; //ADOPTED, HAS_VISITED, LIKES, DISLIKES, ATTENDING, ASSIGNED_TO
    var since = req.body.since;
    var picked_up = req.body.picked_up;
    picked_up = picked_up === "true";
    var adopted_in = req.body.adopted_in;


    if (type_relationship == 'ADOPTED') {
        session
        .run('MATCH (a:PERSON {name: $nameParam}), (b:DOG {name: $dogParam}) MERGE (a)-[r:ADOPTED {since: $sinceBody, picked_up: $picked_upBody, adopted_in: $adopted_inBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since, picked_upBody: picked_up, adopted_inBody: adopted_in})
        .then(function(result) {
            session.close();
            res.json({message: 'Relationship (ADOPTED) created successfully'});
            // res.redirect('/');
        })
    
        .catch(function(err) {
            console.log(err);
        });
    } else {
        session
        .run('MATCH (a:PERSON {name: $nameParam}), (b:DOG {name: $dogParam}) MERGE (a)-[r:' + type_relationship + ']->(b)', {nameParam: nameParam, dogParam: dogParam, type_relationshipBody: type_relationship})
        .then(function(result) {
            session.close();
            res.json({message: 'Relationship created successfully'});
            // res.redirect('/');
        })
    
        .catch(function(err) {
            console.log(err);
        });
    }
});

// Dog -> Volunteer (RESCUED_BY)
app.post('/dog/:dogParam/rescued_by/person/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:PERSON:VOLUNTEER {name: $nameParam}) MERGE (a)-[r:RESCUED_BY]->(b)', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Relationship (RESCUED_BY) created successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });

});

// Dog -> Vet (ASSIGNED_TO)
app.post('/dog/:dogParam/assigned_to/person/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:PERSON:VET {name: $nameParam}) MERGE (a)-[r:ASSIGNED_TO]->(b)', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Relationship (ASSIGNED_TO) created successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });

});


//Dog -> Shelter (IS_IN, TRANSFERRED_FROM)
app.post('/dog/:dogParam/shelter/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; // Shelter's name
    var dogParam = req.params.dogParam; //Dog's name
    var type_relationship = req.body.type_relationship; //IS_IN, TRANSFERRED_FROM
    var since = req.body.since;
    var origin = req.body.origin;
    var staff_ratio = parseInt(req.body.staff_ratio);

    if (type_relationship == 'IS_IN') {
        session
        .run('MATCH (a:DOG {name: $dogParam}), (b:SHELTER {name: $nameParam}) MERGE (a)-[r:IS_IN {since: '+since+', origin: $originBody, staff_ratio: $staff_ratioBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since, originBody: origin, staff_ratioBody: staff_ratio})
        .then(function(result) {
            session.close();
            res.json({message: 'Relationship (IS_IN) created successfully'});
            // res.redirect('/');
        })
    
        .catch(function(err) {
            console.log(err);
        });
    } else if (type_relationship == 'TRANSFERRED_FROM') {
        session
        .run('MATCH (a:DOG {name: $dogParam}), (b:SHELTER {name: $nameParam}) MERGE (a)-[r:TRANSFERRED_FROM {since: $sinceBody}]->(b)', {nameParam: nameParam, dogParam: dogParam, sinceBody: since})
        .then(function(result) {
            session.close();
            res.json({message: 'Relationship (IS_IN) created successfully'});
            // res.redirect('/');
        })
    
        .catch(function(err) {
            console.log(err);
        });
    }
});

//Dog -> Race (IS_A)
app.post('/dog/:dogParam/race/:race_nameParam', function(req, res) {
    session = driver.session();
    var race_nameParam = req.params.race_nameParam
    var dogParam = req.params.dogParam; //Dog's name

    session
    .run('MATCH (a:DOG {name: $dogParam}), (b:RACE {race_name: $race_nameParam}) MERGE (a)-[r:IS_A]->(b)', {race_nameParam: race_nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Relationship (IS_IN) created successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });

});


/*
Updating Nodes Section
*/

// Update Person information
app.put('/person/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var new_age = parseInt(req.body.new_age);
    var new_email = req.body.new_email;
    
    session
    .run('MATCH (n:PERSON {name: $nameParam}) SET n.age = $new_ageBody, n.email = $new_emailBody', {nameParam: nameParam, new_nameBody: new_name, new_ageBody: new_age, new_emailBody: new_email})
    .then(function(result) {
        session.close();
        res.json({message: 'Person updated successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

//Update Person Labels
app.put('/person/:nameParam/label/:labelParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var labelParam = req.params.labelParam;

    session
    .run('MATCH (n:PERSON {name: $nameParam}) SET n:PERSON'+labelParam, {nameParam: nameParam, labelParam: labelParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Person label updated successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

//Update Dog information
app.put('/dog/:dogParam', function(req, res) {
    session = driver.session();
    var dogParam = req.params.dogParam;
    var new_age = parseInt(req.body.new_age);
    var new_neutered = req.body.new_neutered;

    session
    .run('MATCH (n:DOG {name: $dogParam}) SET n.age = $new_ageBody, n.neutered = $new_neuteredBody', {dogParam: dogParam, new_ageBody: new_age, new_neuteredBody: new_neutered})
    .then(function(result) {
        session.close();
        res.json({message: 'Dog updated successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

//Update Shelter information
app.put('/shelter/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var new_volunteers = parseInt(req.body.new_volunteers);
    var new_location = req.body.new_location;

    session
    .run('MATCH (n:SHELTER {name: $nameParam}) SET n.volunteers = $new_volunteersBody, n.location = $new_locationBody', {nameParam: nameParam, new_volunteersBody: new_volunteers, new_locationBody: new_location})
    .then(function(result) {
        session.close();
        res.json({message: 'Shelter updated successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


/*
Updating Relationships Section
*/

//Update picked_up state 
app.post('/picked_up/person/:nameParam/dog/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name
    var picked_up = req.body.picked_up;
    picked_up = picked_up === "true";

    session
    .run('MATCH (a:PERSON {name: $nameParam})-[r:ADOPTED]->(b:DOG {name: $dogParam}) SET r.picked_up = $picked_upBody', {nameParam: nameParam, dogParam: dogParam, picked_upBody: picked_up})
    .then(function(result) {
        session.close();
        res.json({message: 'Picked_up state on relationship ADOPTED modified successfully'});
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });
});

//Update staff_ratio on relationship IS_IN
app.post('/update/staff_ratio/shelter/:nameParam/dog/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam; //Dog's name
    var staff_ratio = parseInt(req.body.staff_ratio);

    session
    .run('MATCH (a:SHELTER {name: $nameParam})<-[r:IS_IN]-(b:DOG {name: $dogParam}) SET r.staff_ratio = $staff_ratioBody', {nameParam: nameParam, dogParam: dogParam, staff_ratioBody: staff_ratio})
    .then(function(result) {
        res.json({message: 'staff_ratio property on relationship IS_IN modified successfully'});
        session.close();
        // res.redirect('/');
        
    })

    .catch(function(err) {
        console.log(err);
    });
});

//Update relationship direction to shelter to dog
app.post('/update/dog/:dogParam/shelter/:nameParam', function(req, res) {
    session = driver.session();
    var dogParam = req.params.dogParam;
    var nameParam = req.params.nameParam; //Shelter's name

    session
    .run('MATCH (a:DOG {name: $dogParam})-[r:IS_IN]->(b:SHELTER {name: $nameParam}) DELETE r CREATE (a)<-[newR:SHELTERS]-(b)', {dogParam: dogParam, nameParam: nameParam})
    .then(function(result) {
        res.json({message: 'Relationship direction to shelter to dog modified successfully'});
        session.close();
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });
});

//Update relationship direction to dog to shelter
app.post('/update/shelter/:nameParam/dog/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //Shelter's name
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:SHELTER {name: $nameParam})-[r:SHELTERS]->(b:DOG {name: $dogParam}) DELETE r MERGE (b)-[newR:IS_IN]->(a)', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        res.json({message: 'Relationship direction to dog to shelter modified successfully'});
        session.close();
        // res.redirect('/');
    })

    .catch(function(err) {
        console.log(err);
    });
});


/*
Deleting Nodes Section
*/

// Delete Person node
app.delete('/deletePerson/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;

    session
    .run('MATCH (n:PERSON {name: $nameParam}) DETACH DELETE n', {nameParam: nameParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Person deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

// Delete Dog node
app.delete('/deleteDog/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    
    session
    .run('MATCH (n:DOG {name: $nameParam}) DETACH DELETE n', {nameParam: nameParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Dog deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

// Delete Shelter node
app.delete('/deleteShelter/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;

    session
    .run('MATCH (n:SHELTER {name: $nameParam}) DETACH DELETE n', {nameParam: nameParam})
    .then(function(result) {
        session.close();
        res.json({message: 'Shelter deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


/*
Deleting Relationships Section
*/

//Delete ADOPTED relationship
app.delete('/deleteAdopted/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:PERSON {name: $nameParam})-[r:ADOPTED]->(b:DOG {name: $dogParam}) DELETE r', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'ADOPTED relationship deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


//Delete IS_IN relationship
app.delete('/deleteIsIn/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:SHELTER {name: $nameParam})-[r:IS_IN]->(b:DOG {name: $dogParam}) DELETE r', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'IS_IN relationship deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

// Delete LIKES relationship
app.delete('/deleteLikes/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:PERSON {name: $nameParam})-[r:LIKES]->(b:DOG {name: $dogParam}) DELETE r', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'LIKES relationship deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


// Delete DISLIKES relationship
app.delete('/deleteDislikes/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:PERSON {name: $nameParam})-[r:DISLIKES]->(b:DOG {name: $dogParam}) DELETE r', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'DISLIKES relationship deleted successfully'});
    })
    
    .catch(function(err) {
        console.log(err);
    })
});


// Delete ASSIGNED_TO relationship
app.delete('/deleteAssignedTo/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;

    session
    .run('MATCH (a:DOG {name: $dogParam})-[r:ASSIGNED_TO]->(b:PERSON {name: $nameParam}) DELETE r', {nameParam: nameParam, dogParam: dogParam})
    .then(function(result) {
        session.close();
        res.json({message: 'ASSIGNED_TO relationship deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

//Delete properties of Person node

app.delete('/deletePersonProperties/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //Person's name
    var property = req.body.property; // Property to be deleted

    session
    .run('MATCH (n:PERSON {name: $nameParam}) REMOVE n.$property', {nameParam: nameParam, property: property})
    .then(function(result) {
        session.close();
        res.json({message: 'PERSON property deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


//Delete properties of Dog node
app.delete('/deleteDogProperties/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //Dog's name
    var property = req.body.property; // Property to be deleted

    session
    .run('MATCH (n:DOG {name: $nameParam}) REMOVE n.$property', {nameParam: nameParam, property: property})
    .then(function(result) {
        session.close();
        res.json({message: 'DOG property deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});


//Delete properties of ADOPTED relationship
app.delete('/deleteAdoptedProperties/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;
    var property = req.body.property;

    session
    .run('MATCH (a:PERSON {name: $nameParam})-[r:ADOPTED]->(b:DOG {name: $dogParam}) REMOVE r.$property', {nameParam: nameParam, dogParam: dogParam, property: property})
    .then(function(result) {
        session.close();
        res.json({message: 'ADOPTED property deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

//Delete properties of IS_IN relationship
app.delete('/deleteIsInProperties/:nameParam/:dogParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam;
    var dogParam = req.params.dogParam;
    var property = req.body.property;

    session
    .run('MATCH (a:SHELTER {name: $nameParam})<-[r:IS_IN]-(b:DOG {name: $dogParam}) REMOVE r.$property', {nameParam: nameParam, dogParam: dogParam, property: property})
    .then(function(result) {
        session.close();
        res.json({message: 'IS_IN property deleted successfully'});
    })

    .catch(function(err) {
        console.log(err);
    })
});

/* 
Get Data Section
*/

//Gets Dog by name
app.get('/dog/:dogParam', function(req, res) {
    session = driver.session();
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
    session = driver.session();
    session
    .run('MATCH (n:DOG) WHERE NOT (:PERSON)-[:ADOPTED]->(n) RETURN n, rand() as r ORDER BY r LIMIT 12')
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
    session = driver.session();
    session
    .run('MATCH (n:PERSON) RETURN n, rand() as r ORDER BY r LIMIT 12')
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


/*
Recommending Dogs Section
*/

//Recommends dogs based on user's preferences on race
app.get('/recommend_dogs_race/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //User's name

    session
    .run('MATCH (p1:PERSON {name: $nameParam})-[:LIKES]->(d1:DOG)-[:IS_A]->(:RACE)<-[:IS_A]-(d2:DOG) RETURN d2, rand() as r ORDER BY r LIMIT 6', {nameParam: nameParam})
    .then(function(result) {
        var results = [];
        result.records.forEach(function(record) {
            results.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,
            });
        });

        res.json(results);
    })

    .catch(function(err) {
        console.log(err);
    });
});

//Recommends dogs based on user's preferences on age
app.get('/recommend_dogs_age/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //User's name
    
    session
    .run('MATCH (p1:PERSON {name: $nameParam})-[:LIKES]->(d1:DOG) MATCH(d2:DOG) WHERE d2.age = d1.age RETURN d2, rand() as r ORDER BY r LIMIT 6', {nameParam: nameParam})
    .then(function(result) {
        var results = [];
        result.records.forEach(function(record) {
            results.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,
            });
        });

        res.json(results);
    })

    .catch(function(err) {
        console.log(err);
    });
});


//Recommends dogs bases on user's location
app.get('/recommend_dogs_location/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //User's name

    session
    .run('MATCH (p1:PERSON {name: $nameParam})-[:LIKES]->(d1:DOG)-[:IS_IN]->(l1:SHELTER) MATCH(d2:DOG)-[:IS_IN]->(l2:SHELTER) WHERE l1.name = l2.name RETURN d2, rand() as r ORDER BY r LIMIT 6', {nameParam: nameParam})
    .then(function(result) {
        var results = [];
        result.records.forEach(function(record) {
            results.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,

            });
        });

        res.json(results);
    })

    .catch(function(err) {
        console.log(err);
    });
});


//Recommends dogs based on user's preferences on size
app.get('/recommend_dogs_size/:nameParam', function(req, res) {
    session = driver.session();
    var nameParam = req.params.nameParam; //User's name
    
    session
    .run('MATCH (p1:PERSON {name: $nameParam})-[:LIKES]->(d1:DOG)-[:IS_A]->(r1:RACE) MATCH(d2:DOG)-[:IS_A]->(r2:RACE) WHERE r1.size = r2.size RETURN d2, rand() as r ORDER BY r LIMIT 6', {nameParam: nameParam})
    .then(function(result) {
        var results = [];
        result.records.forEach(function(record) {
            results.push({
                id: record._fields[0].identity.low,
                name: record._fields[0].properties.name,
                age: record._fields[0].properties.age,
                neutered: record._fields[0].properties.neutered,
                rescue_date: record._fields[0].properties.rescue_date,
                vaccines: record._fields[0].properties.vaccines,
            });
        });

        res.json(results);
    })

    .catch(function(err) {
        console.log(err);
    });
});


port = process.env.PORT || 4000;
app.listen(port); // Start server
console.log("Server started on port " + port);

module.exports = app;