require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnrection");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 8080;

connectDB();
app.use(cors());
app.use(express.json());
app.use(credentials);

app.use("/users", require("./routs/users"));

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

module.exports = { app };
