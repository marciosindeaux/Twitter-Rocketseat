import React, {Component} from 'react';
import './Timeline.css';
import twitterLogo from '../../twitter.svg'
import axios from '../../services/api.js';
import Tweet from '../../components/Tweet/Tweet.js'
import SocketIO from  'socket.io-client'

export default class TimeLine extends Component {
    state={
        tweets: [],
        newTweet:''
    }

    async componentDidMount(){
        this.subscribeToEvents()
        const response = await axios.get('/tweets');
        this.setState({
            tweets: response.data
        })
    }

    handleInputChange = (event) => {
        this.setState({
            newTweet: event.target.value
        })
    }

    subscribeToEvents = () => {
        const io = SocketIO('http://loclahost:3000');
        io.on('tweet', data => {
            this.setState({
                tweets:[ data, ...this.state.tweets]
            })
        });
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tweet => 
                    tweet._id === data._id ? data : tweet
                )
            })
        });
    }

    handleNewTweet = async (event) => {
        if(event.keyCode !== 13){
            return;
        }
        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");
        await axios.post('tweets',{ author, content })

        this.setState({newTweet: ''})
    }

    render(){
        return(
            <div className="timeline-wrapper">
                <img src={twitterLogo} height={24}/> 
                <form action="">
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown = {this.handleNewTweet}
                        placeholder="O Que está acontecendo ?"/>
                </form>
                <ul className="tweet-list">
                    { 
                        this.state.tweets.map(tweet => 
                            <Tweet key={tweet._id} tweet={tweet} /> 
                        )
                    }
                </ul>
            </div>
        );
    }
}