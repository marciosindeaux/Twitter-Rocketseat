import React, {Component} from 'react';
import twitterLogo from '../../twitter.svg'
import './Login.css';

export default class Login extends Component {
    state = {
        username: ''
    };

    handleInputChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username } = this.state;
        if(!username){
            return;
        }
        localStorage.setItem('@GoTwitter:username', username)
        this.props.history.push('/timeline')
    }

    render(){
        return(
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter"/>
                <form onSubmit={this.handleSubmit} action="">
                    <input value={this.state.username} onChange={this.handleInputChange} type="text" placeholder="Nome De Usuario"/>
                    <button type="submit">Entrar</button>
                </form>
            </div>        
        );
    }
}