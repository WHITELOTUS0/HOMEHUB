//server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const addUser = require('./addUser');
const addProperty = require('./addProperty');
const authUser = require('./authUser');
const getUsers = require('./getUsers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontEnd')));

// Use the addUser middleware for handling registration requests
app.post('/register', addUser);
app.post('/upload-property', addProperty);
app.post('/login', authUser);

//getting from database
app.get('/users', getUsers);


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
