const bcrypt = require('bcrypt');
const db = require('./db');

function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) reject(error);
      else resolve(results && results.length > 0);
    });
  });
}

function addUser(req, res, next) {
  const user = {
    Names: req.body.Names,
    password: req.body.password,
    email: req.body.email,
    telno: req.body.telno,
  };

  checkEmailExists(user.email)
    .then((emailExists) => {
      if (emailExists) {
        console.log('Email already exists. User not saved.');
        res.send('Email already exists. User not saved.');
        return;
      }

      bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.send('Error hashing password');
          return;
        }

        const newUser = {
          Names: user.Names,
          password: hashedPassword,
          email: user.email,
          telno: user.telno,
        };

        const query = 'INSERT INTO user SET ?';
        db.query(query, newUser, (err, result) => {
          if (err) {
            console.error('Error adding user:', err);
            res.send('Error adding user');
            return;
          }
          console.log('User added successfully!');
          console.log('Result:', result);
          res.send('User added successfully!');
        });
      });
    })
    .catch((error) => {
      console.error('Error checking email existence:', error);
      res.send('Error checking email existence');
    });
}

module.exports = addUser;
