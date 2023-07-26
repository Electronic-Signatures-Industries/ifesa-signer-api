require('dotenv').config();

module.exports = {
    url: `mongodb+srv://luis:${process.env.DB_PASSWORD}@cluster0.beraluh.mongodb.net/Sign`
  };