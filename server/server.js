const express = require('express');
const dotenv = require('dotenv');
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

// connectDB();
const app = express();

app.get('/status', (req, res) => {
    res.send({
        message: 'Server is running',
        status: 200
    });
});

app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Set secure HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.json());
app.use(authRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
