const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// API routes
app.use("/api/users", userRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
