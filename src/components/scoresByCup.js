import React from 'react';

import {
    Col
} from 'react-bootstrap';

import Cups from '../data/Cups.js';

const ScoresByCup = (props) => {
    let ScoreKeys = Object.keys(props.scores);
    let parsedScores = [];
    let scoresByCup = {};

    ScoreKeys.map(s => {
        parsedScores.push(props.scores[s]);
    });

    if (props.uid) {
        parsedScores = parsedScores.filter(s => {
            return s.uid === props.uid;
        });
    }

    Cups.map(c => {
        scoresByCup[c[1]] = parsedScores.filter(s => {
            return s.cup === c[1]
        });
    });

    return Cups.map(c => {
        let cupScores = [];
        let avg;

        scoresByCup[c[1]].map(sbc => {
            cupScores.push(sbc.points);
        });

        avg = cupScores.length ? (cupScores.reduce((a = 0,b = 0) => parseInt(a) + parseInt(b)) / cupScores.length).toFixed(2) : 'none';


        return (
            <Col
                xs={2}
                key={c[1]}
                className="cup-row"
                style={{
                    cursor: 'default'
                }}
            >
                <div className="scoreCell">
                    <img src={[c[0]]} alt={c[1] + ' cup'} className="cup-image" />
                    <span className="score">
                        {avg}
                    </span>
                </div>
            </Col>
        )
    })
}

export default ScoresByCup;
