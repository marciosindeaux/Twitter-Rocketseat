const express = require('express');
const app = express();
const mongoose = require("mongoose");
const server = require('http').Server(app)
const io = require('socket.io')(server);
const cors = require('cors')

mongoose.connect('mongodb+srv://admin:admin@cluster0-rppod.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(cors());
app.use(express.json());
app.use(require('./routes.js'));


server.listen(3000, () => {
    console.log("Server stated on port 3000");
})