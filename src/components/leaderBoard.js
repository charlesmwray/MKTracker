import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import {
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';


const Scores = (props) => {
    if (props.length === 0) {
        return '...loading'
    } else {
        return  (
            props.scores.map((score,  i) => {
                return <ListGroupItem key={i}>{score.username} {score.date} <span className="pull-right">{score.avgScore}</span></ListGroupItem>
            })
        );
    }
};

class LeaderBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            scores: []
        };
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('scores/');

        itemsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            const keys = Object.keys(data);
            let scores = [];
            let players = [];
            let all = [];

            keys.forEach((k) => {
                scores.push(data[k]);
            });

            scores.map((s) => {
                if (players.indexOf(s.username) === -1){
                	players.push(s.username);
                }
            });

            players.map((player, i) => {
                var parsedStats = {
                    scores:[],
                    cups:[],
                    avgScore: 0,
                    username: players[i]
                };

                scores.map((s)=>{
                	if (s.username === players[i]) {
                	    parsedStats['scores'].push(s.points);
                        parsedStats['cups'].push(s.cup);
                	}
                });

                parsedStats['avgScore'] = parsedStats['scores'].reduce((a,b) => { return parseInt(a) + parseInt(b);  }) /  parsedStats['scores'].length;
                all.push(parsedStats);
            });

            this.setState({
                scores: all.sort((a, b) => {
                    if (a.avgScore > b.avgScore) {
                        return -1;
                    } else if (a.avgScore < b.avgScore) {
                        return 1;
                    } else {
                        return 0;
                    }
                })
            })

        });

    }

    render() {
        return  <div>
            <h2>LeaderBoard</h2>
            <ListGroup>
                <Scores scores={this.state.scores} />
            </ListGroup>
        </div>
    }
}

export default LeaderBoard;
