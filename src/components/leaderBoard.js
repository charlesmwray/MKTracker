import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import { Line } from 'react-chartjs-2';

import { Popover, OverlayTrigger } from 'react-bootstrap';

const CupArray = (props) => {
    return props.cups.map((cup) => {
        return <span>{cup}</span>
    })
}

const ScoreToolTip = (score) => {
    let scores = score.scores
    return (
        <Popover id="popover-trigger-hover-focus" title={score.username+" score details"}>
            Top score: <b>{ Math.max.apply(Math, scores) }</b><br/>
            Games played: { scores.length }<br/>
            Last 10 scores:
            <ul>
                {
                    // Returns the latest 10 scores
                    scores.slice(Math.max(data.length - 10, 1)).map((value, index) => {
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
                let labels = []
                for (var j = 0; j < score.scores.length; j++) {
                    labels.push(score.scores[j]);
                }
                return (
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" overlay={ScoreToolTip
                        (score)} key={i}>
                        <tr >
                            <th scope="row">{i+1}</th>
                            <td>{score.username}</td>
                            <td>{score.avgScore.toFixed(1)}</td>
                            <td>{score.avgLast10.toFixed(1)}</td>
                            <td style={{
                                width: '70px',
                                height: '50px'
                            }}>
                                <Line
                                    width={200}
                                    height={80}
                                    data={{
                                        labels: labels,
                                        datasets: [{
                                          label: 'All scores',
                                          data: score.scores,
                                          backgroundColor: "#ff5722"
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        legend: {
                                            display: false
                                        },
                                        scales:{
                                            xAxes: [{
                                                display: false //this will remove all the x-axis grid lines
                                            }]
                                        }
                                    }}
                                />
                            </td>
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
            let windowGames;
            let windowTotal = 0;

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
                    avgLast10: 0,
                    username: players[i]
                };

                scores.map((s)=>{
                	if (s.username === players[i]) {
                	    parsedStats['scores'].push(s.points);
                        parsedStats['cups'].push(s.cup);
                	}
                });

                parsedStats['avgScore'] = parsedStats['scores'].reduce((a,b) => { return parseInt(a) + parseInt(b);  }) /  parsedStats['scores'].length;

                // Avg score over last 10 games
				windowGames = parsedStats['scores'].length > 10 ? 10 : parsedStats['scores'].length;
				windowTotal = 0;
				for (var i = 0; i < windowGames; i++) {
                    windowTotal = windowTotal + parseInt(parsedStats['scores'][ parsedStats['scores'].length - 1 - i]);
                }
                parsedStats['avgLast10'] = windowTotal/windowGames;

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
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Player</th>
                  <th scope="col">Score</th>
                  <th scope="col">Last 10</th>
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
