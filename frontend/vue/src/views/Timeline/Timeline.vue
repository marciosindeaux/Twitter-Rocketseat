<template>
    <div class="timeline-wrapper">
        <img src="../../assets/twitter.svg" height="24">
        <form action="">
            <textarea 
                name="tweet" 
                id="user-tweeet"
                v-model="newTweet"
                @keydown="handleNewTweet"
                placeholder="O que está acontecendo ?"/>
        </form>
        <ul class="tweet-list">
            <Tweet 
                v-for="item in tweets" 
                v-bind:key="item._id"
                :tweet="item"/>
        </ul>
    </div>
</template>

<script>
import axios from '../../services/Axios.js';
import SocketIO from 'socket.io-client';
import Tweet from '../../components/Tweet/Tweet.vue'
export default {
    data() {
        return {
            newTweet:"",
            tweets:[]
        }
    },
    components:{
        'Tweet':Tweet
    },
    methods:{
        handleNewTweet(event){
            if(event.keyCode === 13 && this.newTweet){
                let author = localStorage.getItem("username");
                let content = this.newTweet;
                axios.post("tweets",{ author, content })
                .then(response => {
                    this.newTweet = '';
                });
                
            }
        },
        subscribeToEvents(){
            const io = SocketIO("http://localhost:3000")
            io.on('tweet', data => {
                this.tweets = [data].concat(this.tweets);
            });
            io.on('like', data => {
                this.tweets = this.tweets.map(tweet => {
                    tweet._id === data._id ? data : tweet
                });
            })
        },
        getTweets(){
            axios.get("/tweets")
            .then(response => {
                this.tweets = response.data;
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.subscribeToEvents();
        this.getTweets();
    }
}
</script>

<style scoped>

.timeline-wrapper {
  width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.timeline-wrapper form {
  width: 100%;
  background: #e9f1f6;
  padding: 20px;
  border-radius: 5px;
  margin: 30px 0;
}

.timeline-wrapper form textarea {
  border: 3px solid #d8e5ed;
  border-radius: 5px;
  font-size: 14px;
  padding: 15px;
  width: 100%;
  resize: none;
}

.tweet-list {
  list-style: none;
  color: #1c2022;
}

</style>