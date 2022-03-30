const mongoose = require('mongoose');
const dotenv = require(`dotenv`);
dotenv.config({ path: `${__dirname}/configure.env` });
const mongoUrl = process.env.MONGODB_URL;

// console.log(Date.now());

mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Database Linked...');
})

db.on('error', () => {
    console.log('Error!!!');
})

module.exports = mongoose;