const Tweet = require('../models/Tweet.js');

module.exports = {
    async store(req, res){
        const tweet = await Tweet.findById(req.params.id);
        tweet.set({
            likes: tweet.likes+1
        });

        await tweet.save(tweet);
        req.io.emit('likes', tweet);
        return res.json(tweet);
    }
}