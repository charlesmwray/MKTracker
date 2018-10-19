import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import { Popover, OverlayTrigger } from 'react-bootstrap';

const CupArray = (props) => {
    return props.cups.map((cup) => {
        return <span>{cup}</span>
    })
}

const ScoreToolTip = (score) => {
    return (
        <Popover id="popover-trigger-hover-focus" title={score.username+" score details"}>
            Top score: <b>{ Math.max.apply(Math, score.scores) }</b><br/>
            Games played: { score.scores.length }<br/>
            All scores:
            <ul>
                {
                    score.scores.map((value, index) => {
                        return (
                            <li key={index} >
                                {value.replace(/^0+/, '')}
                            </li>
                        )
                    })
                }
            </ul>
        </Popover>
    )
}
const Scores = (props) => {
    if (props.length === 0) {
        return '...loading'
    } else {
        return  (
            props.scores.map((score,  i) => {
                return (
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ScoreToolTip
                        (score)} key={i}>
                        <tr >
                          <th scope="row">{i+1}</th>
                          <td>{score.username}</td>
                          <td>{score.avgScore.toFixed(1)}</td>
                          <td>{score.scores.length}</td>
                        </tr>
                    </OverlayTrigger>
                )
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
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col">Score</th>
                  <th scope="col">Total games</th>
                </tr>
              </thead>
              <tbody>
                <Scores scores={this.state.scores} />
              </tbody>
            </table>
        </div>
    }
}

export default LeaderBoard;
