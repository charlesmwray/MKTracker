import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

const Scores = (props) => {
    if (props.length === 0) {
        return;
    } else {
        return  (
            props.scores.map((score,  i) => {
                return <h3 key={i}>{score.username} {score.points}</h3>
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

            keys.forEach((k) => {
                scores.push(data[k]);
            })


            this.setState({
                scores: scores
            })

        });

    }

    render() {
        return  <div>
            <h2>LeaderBoard</h2>
            <Scores scores={this.state.scores} />
        </div>
    }
}

export default LeaderBoard;
