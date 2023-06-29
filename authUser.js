//autUser.js
const bcrypt = require('bcrypt');
const db = require('./db');

function authUser(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  // Check if the email exists in the database
  const query = 'SELECT * FROM user WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Error retrieving user:', error);
      res.send('Error retrieving user');
      return;
    }

    if (results.length === 0) {
      console.log('User not found');
      res.send('User not found');
      return;
    }

    const user = results[0];
    const hashedPassword = user.password;

    // Compare the provided password with the hashed password
    bcrypt.compare(password, hashedPassword, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.send('Error comparing passwords');
        return;
      }

      if (passwordMatch) {
        // Passwords match, authentication successful
        //const welcomeMessage = `Welcome ${user.Names}!`;
        //console.log(welcomeMessage);
        //res.send(welcomeMessage);
        res.redirect("/index.html")
      } else {
        // Passwords don't match
        console.log('Incorrect password');
        res.send('Incorrect password');
      }
    });
  });
}

module.exports = authUser;
