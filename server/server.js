const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");

dotenv.config();

//Database connection in database.js
connectDB();

// Starting the app server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Middleware Configuration

app.use(bodyParser.json()); //Body parser to parse incoming request bodies as JSON

app.use(cookieParser()); // Cookie parser to handle cookies

app.use(cors()); //CORS for enabling cross-origin resource sharing

//Routing
app.use("/api", authRouter); //Mount authentication-related routes under '/api' endpoint

