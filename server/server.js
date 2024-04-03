const express = require('express');
const dotenv = require('dotenv');
const authRouter = require("./routes/auth");
const bodyParser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

dotenv.config();

// connectDB();
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

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
