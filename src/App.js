import React, { Component } from 'react';

import './App.css';

import firebase, { auth, provider } from './data/Firebase.js';

import {
    Button,
    Row,
    Col
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
            <div class="container">
                <div className="App">
                    <header className="App-header">
                        <Row>
                            <Col xs={12} sm={8}>
                                <h1>Mario Kart Tracker</h1>
                            </Col>
                            <Col xs={12} sm={4}>
                                {!this.state.userInfo && <Button bsStyle="primary" onClick={() => {this.login()}}>Log In</Button>}
                                {this.state.userInfo && <div className="pull-right"><img style={{ margin: '1rem', width: '50px', height: '50px', borderRadius: '50%' }} src={this.state.userInfo.photoURL} /></div>}
                            </Col>
                        </Row>
                    </header>
                    {
                        this.state.userInfo &&
                        <div>
                            {
                                !this.state.showAddScore &&
                                <Button bsStyle="primary" onClick={() => {this.toggleAddScore()}}>Add Score</Button>
                            }
    
                            {
                                this.state.showAddScore &&
                                <EnterScore
                                    userInfo={this.state.userInfo}
                                    toggleAddScore={this.toggleAddScore.bind(this)}
                                />
                            }
                        </div>
                    }
                    <LeaderBoard />
                </div>
            </div>
        );
    }
}

export default App;
