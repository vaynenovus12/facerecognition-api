const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!'); })

//endpoint
app.post('/signin', signin.handleSignin(db, bcrypt))

//endpoint
//receiver function handleRegister from register.js
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)});

//endpoint
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});

//endpoint
app.put('/image', (req, res) => { image.handleImage(req, res, db)});

//endpoint
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res)});




app.listen(process.env.PORT|| 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user(object)
/image --> PUT --> user(object)

*/