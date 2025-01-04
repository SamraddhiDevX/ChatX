const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");


dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET,
});

// Export Cloudinary for use in other modules
module.exports = cloudinary;
