// https://stackoverflow.com/questions/9901082/what-is-this-javascript-require
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // used to connect to mongoDB
mongoose.set('strictQuery', true);

require('dotenv').config(); // Configures our environtment variables in the dotenv file

// Creates express server and hosts it on port 5000
const app = express();
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json()); //allows us to parse json

const uri = process.env.ATLAS_URI; //database uri
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
        console.log("MongoDB database connection established successfully")
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// {rooturl}/exercises -> loads everything in the exercisesRouter
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


// Starts the server
app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
});
