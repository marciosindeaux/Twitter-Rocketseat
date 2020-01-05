import React, {Component} from 'react';
import './Timeline.css';
import twitterLogo from '../../twitter.svg'
import axios from '../../services/api.js';

export default class TimeLine extends Component {
    state={
        newTweet:''
    }

    handleInputChange = (event) => {
        this.setState({
            newTweet: event.target.value
        })
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
            </div>
        );
    }
}