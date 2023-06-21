const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontEnd')));

const storage = multer.diskStorage({
  destination: 'frontEnd/images/propertyUploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uniqueSuffix}.${fileExtension}`;
    callback(null, fileName);
  }
});

const upload = multer({ storage });

function addProperty(req, res, next) {
  upload.fields([{ name: 'imageField1' }, { name: 'imageField2' }])(req, res, (error) => {
    if (error) {
      console.error('Error uploading property images:', error);
      res.send('Error uploading property images');
      return;
    }

    const post = {
      propName: req.body.propertyName,
      propType: req.body.propertyType,
      location: req.body.location,
      DESCRIPTION: req.body.description,
      bedrooms: req.body.bedroom,
      bathrooms: req.body.bathroom,
      cost: req.body.price,
      imagePath1: req.files['imageField1'][0].path,
      imagePath2: req.files['imageField2'][0].path
    };

    const query = 'INSERT INTO property SET ?';
    db.query(query, post, (err, result) => {
      if (err) {
        console.error('Error adding property:', err);
        res.send('Error adding property');
        return;
      }
      console.log('Property added successfully!');
      console.log('Result:', result);
      res.send('Property added successfully!');
    });
  });
}

module.exports = addProperty;
