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

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB: ', error.message);
    process.exit(1);
});


const app = express();
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer, {
    cors: {
        origin: '*',
    }
});


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
app.use(userRouter);
app.use(messagesRouter);

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
