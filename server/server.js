const express = require('express');
const dotenv = require('dotenv');
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const messagesRouter = require("./routes/messages");

// Load environment variables
dotenv.config();

//Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
    process.exit(1);
});

//Create express app and http server
const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer, { //Set up socket.io for real time communication
    cors: {
        origin: '*',
    }
});

//Handle socket.io events
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chats message', (msg) => {
        console.log('message: ' + JSON.stringify(msg));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('message', (msg) => {
        console.log(`message ${socket.id}: ` + JSON.stringify(msg));
    });

    socket.on('send-message', (msg) => {
        console.log('message: ' + JSON.stringify(msg));
        io.emit('receive-message', msg);
    });

});

//Attach socket.io to the express app
app.io = io;

//Define a route to check server status
app.get('/status', (req, res) => {
    res.send({
        message: 'Server is running',
        status: 200
    });
});

//Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Set secure HTTP headers
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(authRouter); //Attach authentication routes
app.use(userRouter); //Attach user routes
app.use(messagesRouter); //Attach message routes

//Define the port for the server to listen on
const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
