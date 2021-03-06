import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import ScoresByCup from './scoresByCup.js';

import { Line } from 'react-chartjs-2';

import {
    Popover,
    OverlayTrigger,
    Modal,
    Button,
    Row,
    Col,
    Tabs,
    Tab
} from 'react-bootstrap';

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
                    scores.slice(Math.max(scores.length - 10, 0)).reverse().map((value, index) => {
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
                let labels = [];
                let placement = i > 3 ? 'top' : 'bottom';
                const scoresData = score.scores.slice(Math.max(score.scores.length - 10, 0)) || [];
                for (var j = 0; j < scoresData.length; j++) {
                    labels.push(scoresData[j]);
                }
                return (
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement={placement}
                        overlay={ScoreToolTip(score)}
                        key={i}>
                        <tr >
                            <th scope="row">{i+1}</th>
                            <td>
                                <span
                                    role="button"
                                    onClick={() => { props.showScoresByCup(score.uid, score.username) }}
                                    style={{
                                        color: '#337ab7',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {score.username}
                                </span>
                                {
                                    score.date &&
                                    <div style={{
                                        fontSize: '1.25rem',
                                        color: '#999'
                                    }}>Last updated: {score.date}</div>
                                }
                            </td>
                            <td>{score.avgScore.toFixed(1)}</td>
                            <td>{score.avgLast10.toFixed(1)}</td>
                            <td style={{
                                width: '70px',
                                height: '50px'
                            }} className="hidden-xs">
                                <Line
                                    width={200}
                                    height={80}
                                    data={{
                                        labels: labels.reverse(),
                                        datasets: [{
                                            data: scoresData,
                                            backgroundColor: "#ff5722"
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        legend: {
                                            display: false
                                        },
                                        tooltips: {
                                             enabled: false
                                        },
                                        scales:{
                                            xAxes: [{
                                                display: false
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
            scores: [],
            showScoresByCup: false
        };
    }

    componentDidMount() {
        const scoresData = firebase.database().ref('scores/');
        const userDataRef = firebase.database().ref('users/');
        let userData;

        userDataRef.on('value', (snapshot) => {
            userData = snapshot.val();

            scoresData.on('value', (snapshot) => {
                const data = snapshot.val();
                const keys = Object.keys(data);
                let scores = [];
                let uids = [];
                let players = [];
                let all = [];
                let windowGames;
                let windowTotal = 0;

                keys.forEach((k) => {
                    scores.push(data[k]);
                });

                scores.map((s) => {
                    let un = userData[s.uid] ? userData[s.uid].username : s.username;
                    if (uids.indexOf(s.uid) === -1){
                        uids.push(s.uid);
                        players.push([un, s.uid])
                    }
                });

                uids.map((player, i) => {
                    var parsedStats = {
                        scores:[],
                        cups:[],
                        avgScore: 0,
                        avgLast10: 0,
                        username: players[i][0],
                        uid: players[i][1],
                        date: ''
                    };

                    scores.map((s)=>{
                    	if (s.uid === uids[i]) {
                    	    parsedStats['scores'].push(s.points);
                            parsedStats['cups'].push(s.cup);

                            parsedStats['date'] = s.date;
                    	}
                    });

                    parsedStats['avgScore'] = parsedStats['scores'].reduce((a,b) => { return parseInt(a) + parseInt(b);  }) /  parsedStats['scores'].length;

                    // Avg score over last 10 games
    				windowGames = parsedStats['scores'].length > 10 ? 10 : parsedStats['scores'].length;
    				windowTotal = 0;
    				for (var j = 0; j < windowGames; j++) {
                        windowTotal = windowTotal + parseInt(parsedStats['scores'][ parsedStats['scores'].length - 1 - j]);
                    }
                    parsedStats['avgLast10'] = windowTotal/windowGames;

    				parsedStats['avgScore'] = parsedStats['scores'].reduce((a,b) => { return parseInt(a) + parseInt(b);  }) /  parsedStats['scores'].length;

                    parsedStats.scores.length > 9 && all.push(parsedStats);
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
        });
    }

    toggleShowScoresByCup() {
        this.setState({
            showScoresByCup: !this.state.showScoresByCup
        })
    }

    showScoresByCup(uid, username) {
        this.setState({
            showScoresByCupUid: uid,
            showScoresByCupUsername: username
        })

        this.toggleShowScoresByCup();
    }

    render() {
        return  <div>
            <Tabs id="leaderboard-tabs">
                <Tab eventKey={1} title="Leaderboard">
                    <table
                        className="table table-striped"
                        style={{
                            marginTop: '2rem'
                        }}
                    >
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Player</th>
                                <th scope="col">Average Score</th>
                                <th scope="col">Last 10</th>
                                <th scope="col" className="hidden-xs"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <Scores
                                scores={this.state.scores}
                                showScoresByCup={this.showScoresByCup.bind(this)}
                            />
                        </tbody>
                    </table>
                </Tab>
                <Tab eventKey={2} title="Scores By Cup">
                    <Row>
                        <Col
                            xs={12}
                            smOffset={1} sm={10}
                            lgOffset={2} lg={8}
                            style={{
                                marginTop: '2rem'
                            }}
                        >
                            <ScoresByCup scores={this.props.scores} />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
            <Modal
              show={this.state.showScoresByCup}
              bsSize="large"
            >
                <Modal.Header>
                    <Modal.Title>{this.state.showScoresByCupUsername + '\'s'} average scores</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{
                        padding: '2rem',
                    }}>
                        <ScoresByCup
                            scores={this.props.scores}
                            uid={this.state.showScoresByCupUid}
                        />
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>{ this.toggleShowScoresByCup() }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}

export default LeaderBoard;
