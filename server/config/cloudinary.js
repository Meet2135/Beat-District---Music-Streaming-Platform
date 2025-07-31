const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'your_cloud_name', // Replace with your Cloudinary cloud name
  api_key: 'your_api_key', // Replace with your Cloudinary API key
  api_secret: 'your_api_secret' // Replace with your Cloudinary API secret
});

module.exports = cloudinary; 