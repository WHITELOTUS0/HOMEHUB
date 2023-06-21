const express = require('express');
const addUser = require('./addUser');
const addProperty = require('./addProperty');

const app = express();
app.use(express.json());

// Mount the addUser app as a sub-app under the '/user' path
app.use('/user', addUser);

// Mount the addProperty app as a sub-app under the '/property' path
app.use('/property', addProperty);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
