//getProperty
const db = require('./db');

function getProperties(req, res, next) {
  const query = 'SELECT * FROM property';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving properties:', err);
      res.send('Error retrieving properties');
      return;
    }

    console.log('Properties retrieved successfully!');
    console.log('Results:', results);

    // Send the property data as the response
    res.json(results);
  });
}

module.exports = getProperties;
