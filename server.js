const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

//controllers
const register = require('./controllers/registerController');
const signin = require('./controllers/signinController');
const profile = require('./controllers/profileController');
const image = require('./controllers/imageController');

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'qwerty',
      database : 'smart-brain'
    }
  });

const app = express();


app.use(cors());
app.use(bodyParser.json());//must have when we use express

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)});

app.listen(process.env.PORT || 3000, ()=> {
    console.log('app is running ${process.env.PORT}');
});







