const express = require('express')
const routes = express.Router();
const TweetController = require('./controllers/TweetController.js');
const LikeController = require('./controllers/LikeController.js');
routes.get("/tweets", TweetController.index);
routes.post("/tweets", TweetController.store);
routes.post("/likes/:id", LikeController.store);
module.exports = routes;