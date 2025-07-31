const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: "dhmaps3nh",
  api_key: "391395191845611",
  api_secret: "I66EPAq3vEF9lJ-3O_s3ytOIJTU",
  secure: true
});

// Test the connection
cloudinary.api.ping()
  .then(result => {
    console.log('Cloudinary connection successful:', result);
  })
  .catch(error => {
    console.error('Cloudinary connection failed:', error);
  });

module.exports = cloudinary;