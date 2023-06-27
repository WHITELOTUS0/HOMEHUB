//server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const addUser = require('./addUser');
const addProperty = require('./addProperty');
const authUser = require('./authUser');
const getUsers = require('./getUsers');
const app = express();
const apiKey = 'AIzaSyB8ynHr08e5gEf8ktwG8YeZB2H3_oHTqcY';
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontEnd')));

// Use the addUser middleware for handling registration requests
app.post('/register', addUser);
app.post('/upload-property', addProperty);
app.post('/login', authUser);


//google Map data
// Render the index page
app.get('/mp', (req, res) => {
  res.render('index');
});

// Handle the form submission
app.get('/map', (req, res) => {
  const { location } = req.query; // Get the location from the query string

  //Render the map page with the location data
  res.render('map', { location, apiKey });

  // console.log(location);
});


//getting from database
app.get('/users', getUsers);
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

