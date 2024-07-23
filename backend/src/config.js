// config.js
require('dotenv').config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  WEBSITE_URL: process.env.WEBSITE_URL,
  PORT: process.env.PORT || 5000,
};
