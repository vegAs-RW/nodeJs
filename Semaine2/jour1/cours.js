const express = require('express')

const app = express();

// Middleware
app((req, res, next) => {
    res.setHeader('Acess-Control-Allow-Origin', '*');
    res.setHeader('Acess-Control-Allow-Headers', 'Origin, x-requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Acess-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

/*app.use((req, res) => {
    res.json({message: "Hello world !"})
})*/

/*app.use((req, res, next) => {
    console.log('test');
    next();
})*/

/*app.use((req, res, next) => {
    res.json({message: "Hello world !"})
    next();
})*/

/*app.use((req, res, next) => {
    res.status(201)
    next();
})*/

// Routes avec requete GET
app.get('/data/movies', (req, res, next) => {
    const movies = [
        {
            id: 1,
            title: 'lol',
            real: 'Kévin'
        },
        {
            id: 2,
            title: 'lolilol',
            real: 'Kévin'
        }
    ]
});

// Routes avec requete POST
app.post('/data/form', (req, res, next) => {
    console.log(req.body);
    res.status(201);
});


module.exports = app;
