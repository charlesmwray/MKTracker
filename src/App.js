import React, { Component } from 'react';

import './App.css';

import firebase, { auth, provider } from './data/Firebase.js';

import {
    Button,
    ButtonGroup,
    Row,
    Col
} from 'react-bootstrap';

import EnterScore from './components/enterScore.js';
import LeaderBoard  from './components/leaderBoard.js';
import Profile from './components/profile.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: null,
            showAddScore: false,
            showProfile: false,
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
        });
    }
    toggleProfile() {
        this.setState({
            showProfile: !this.state.showProfile
        })
    }
    render() {
        return (
            <div className="App container">
                <header className="App-header">
                    <Row>
                        <Col xs={6} sm={8}>
                            <h1>Mario Kart Tracker</h1>
                        </Col>
                        <Col xs={4} sm={2} className="align-right">
                            {!this.state.userInfo && <Button bsStyle="primary" onClick={() => {this.login()}}>Log In</Button>}
                            {
                                this.state.userInfo &&
                                <ButtonGroup>
                                    <Button bsStyle="primary" onClick={() => {this.toggleAddScore()}}>Add Score</Button>
                                    <Button bsStyle="info" onClick={() => { this.toggleProfile() }}>Profile</Button>
                                </ButtonGroup>
                            }
                        </Col>
                        <Col xs={2} sm={2} className="align-right">
                            {
                                this.state.userInfo &&
                                <img
                                    style={{
                                        margin: '1rem',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%'
                                    }}
                                    src={this.state.userInfo.photoURL}
                                />
                            }
                        </Col>
                    </Row>
                </header>
                {
                    this.state.userInfo &&
                    <div>
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
                {
                    this.state.showProfile &&
                    <Profile
                        uid={this.state.userInfo.uid}
                        toggleProfile={this.toggleProfile.bind(this)}
                    />
                }

            </div>
        );
    }
}

export default App;
