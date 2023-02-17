const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection string
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB database connection established successfully`);
  } catch (err) {
    console.log(`Error connecting to database: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
