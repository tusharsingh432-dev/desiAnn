const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const dotenv = require(`dotenv`);
const morgan = require('morgan');

const userRoutes = require('./routes/userRoutes');

dotenv.config({ path: `${__dirname}/configure.env` });
app.use(morgan("dev"));
app.use(express.json());

app.use(`/api/v1/users`, userRoutes);
app.use('/', (req, res) => {
    res.send('Server Running///');
})


// app.use(express.static(path.join(__dirname, "client", "build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Listening on Port ' + port);
})