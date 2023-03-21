const mongoose = require('mongoose');

const URI = "mongodb+srv://eduardo:J5E4pFsU9G2sKI53cluster0.xaihz.mongodb.net/Cluster0?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI);
    console.log('db connected');
};

module.exports = connectDB;