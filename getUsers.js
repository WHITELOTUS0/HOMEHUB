//getUsers.js
const db = require('./db');

function getUsers(req, res, next) {
  const query = 'SELECT Names, email, telno FROM user';

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving users:', error);
      res.send('Error retrieving users');
      return;
    }

    if (results.length === 0) {
      console.log('No users found');
      res.send('No users found');
      return;
    }

    const users = results.map((user) => ({
      Names: user.Names,
      email: user.email,
      telno: user.telno,
    }));

    res.json(users);
  });
}

module.exports = getUsers;
