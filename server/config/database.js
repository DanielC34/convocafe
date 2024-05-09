const mongoose = require('mongoose');

//Async function connectDB connects to MongoDB database
const connectDB = async () => {
    try {
        //Mongoose connects to MongoDB database with MongoDB URI
        const con = await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
/////////////
        // Successful connection message displayed when database is connected
        console.log(`MongoDb connected: ${con.connection.host}`)
    } catch (err) {
        //Error thrown when connection has failed
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};

//Export function for use in other parts of application
module.exports = connectDB;