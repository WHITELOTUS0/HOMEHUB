const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const path = require('path');
const multer=require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontEnd')));

const storage = multer.diskStorage({
    destination: 'frontEnd/images/propertyUploads', // Specify the project folder where you want to move the uploaded images
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uniqueSuffix}.${fileExtension}`;
      callback(null, fileName);
    }
  });

  const upload = multer({ storage });


// Define the route handler for the form submission
app.post('/upload-property', upload.fields([{ name: 'imageField1' }, { name: 'imageField2' }]), (req, res) => {
  // Process other form fields and create the user object
  const post = {
    propName: req.body.propertyName,
    propType: req.body.propertyType,
    location: req.body.location,
    DESCRIPTION: req.body.description,
    bedrooms: req.body.bedroom,
    bathrooms:req.body.bathroom,
    cost:req.body.price,
    imagePath1:'',
    imagePath2: '' ,// Placeholder for the image path
  };

 

  const newPost = {
    propName: req.body.propertyName,
    propType: req.body.propertyType,
    location: req.body.location,
    DESCRIPTION: req.body.description,
    bedrooms: req.body.bedroom,
    bathrooms:req.body.bathroom,
    cost:req.body.price,
    imagePath1: req.files['imageField1'][0].path, // Get the path of the first uploaded image
    imagePath2: req.files['imageField2'][0].path // Get the path of the second uploaded image
  };

  // Save the user object to the database or perform any other necessary operations
  const query = 'INSERT INTO property SET ?';
          db.query(query, newPost, (err, result) => {
            if (err) {
              console.error('Error adding property:', err);
              res.send('Error adding property');
              return;
            }
            console.log('Property added successfully!');
            console.log('Result:', result);
            res.send('Property added successfully!');
          });

  // Send the response back to the client
  res.send('Form submitted successfully!');
});

  
app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });