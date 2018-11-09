import React, { Component } from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';

import Cups from '../data/Cups.js';

const ScoresByCup = (props) => {
    let ScoreKeys = Object.keys(props.scores);
    let parsedScores = [];
    let thisUsersScores = [];
    let scoresByCup = {};

    ScoreKeys.map(s => {
        parsedScores.push(props.scores[s]);
    });

    thisUsersScores = parsedScores.filter(s => {
        return s.uid === props.uid;
    });

    Cups.map(c => {
        scoresByCup[c[1]] = thisUsersScores.filter(s => {
            return s.cup === c[1]
        });
    });

    return Cups.map(c => {
        let cupScores = [];
        let avg;

        scoresByCup[c[1]].map(sbc => {
            console.log(sbc);
            cupScores.push(sbc.points);
        });

        avg = cupScores.length ? (cupScores.reduce((a = 0,b = 0) => parseInt(a) + parseInt(b)) / cupScores.length).toFixed(2) : 'none';


        return (
            <Col
                xs={2}
                key={c[1]}
                className="cup-row"
                style={{
                    padding: '.75rem',
                    cursor: 'default'
                }}
            >
                <img src={[c[0]]} className="cup-image" /><span>{avg}</span>
            </Col>
        )
    })
}

export default ScoresByCup;
