const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

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