const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

require("dotenv").config();

//Database connection 
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection failed", err));

// Starting the app server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Middleware Configuration

app.use(bodyParser.json()); //Body parser to parse incoming request bodies as JSON

app.use(cookieParser()); // Cookie parser to handle cookies

app.use(cors({})); //CORS for enabling cross-origin resource sharing

//Routing
app.use("/api", authRouter); //Mount authentication-related routes under '/api' endpoint
app.use('/api/users', userRouter);

//Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


//Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, route does not exist.");
});


