const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/users';

exports.connectDatabase = () => {
    // Connecting to the database
    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("Failed connecting to database");
        console.error(error);
        process.exit(1);
      });
  };
