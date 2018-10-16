import React, { Component } from 'react';

import './App.css';

import firebase, { auth, provider } from './data/Firebase.js';

import {
    Button
} from 'react-bootstrap';

import EnterScore from './components/enterScore.js';
import LeaderBoard  from './components/leaderBoard.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: null,
            showAddScore: false,
            userInfo: null
        }
    }
    componentDidMount() {
        !this.state.userInfo && auth.onAuthStateChanged((user) => {
            user && this.setUser(user);
        });
    }
    login() {
        auth.signInWithPopup(provider);
    }
    setUser(userInfo) {
        !this.state.userInfo && this.setState({ userInfo: userInfo });
    }
    toggleAddScore() {
        this.setState({
            showAddScore: !this.state.showAddScore
        })
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Mario Kart Tracker</h1>
                    {this.state.userInfo && <h2>Welcome {this.state.userInfo.displayName}</h2>}
                </header>
                {!this.state.userInfo && <Button bsStyle="primary" onClick={this.login()}>Log In</Button>}
                {
                    this.state.userInfo &&
                    <div>
                        {
                            !this.state.showAddScore &&
                            <Button bsStyle="primary" onClick={() => {this.toggleAddScore()}}>Add Score</Button>
                        }

                        {
                            this.state.showAddScore &&
                            <EnterScore userInfo={this.state.userInfo} />
                        }
                    </div>
                }
                <LeaderBoard />
            </div>
        );
    }
}

export default App;
