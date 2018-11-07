import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import {
    Modal,
    Button,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';

const ScoresByCup = (props) => {
    let scoreKeys = Object.keys(props.scores);
    let parsedScores = [];
    let thisUsersScores = [];
    let cups = ['mushroom','flower','star','special','yoshi','crossing','shell','banana','leaf','lightning','triforce','bell'];
    let scoresByCup = {};

    scoreKeys.map(s => {
        parsedScores.push(props.scores[s]);
    });

    thisUsersScores = parsedScores.filter(s => {
        return s.uid === props.uid;
    });

    cups.map(c => {
        scoresByCup[c] = thisUsersScores.filter(s => {
            return s.cup === c
        });
    });

    return cups.map(c => {
        let cupScores = [];
        let avg;
        scoresByCup[c].map(sbc => {
            cupScores.push(sbc.points);
        });

        avg = cupScores.reduce((a,b) => parseInt(a) + parseInt(b)) / cupScores.length;

        return (
            <div key={c}>
                <h3>{scoresByCup[c][0].cup}({cupScores.length})</h3>
                <h4>{avg.toFixed(2)}</h4>
            </div>
        )
    })
}

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: props.uid,
            username: ''
        }
    }
    componentWillMount() {
        let userInfo = firebase.database().ref('users/' + this.state.uid);

        userInfo.on('value', (snapshot) => {
            userInfo = snapshot.val();

            if (userInfo) {
                this.setState({
                    username: userInfo.username
                })
            }
        });
    }
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }
    saveUsername() {
        let userInfo = firebase.database().ref('users/' + this.state.uid);
        let userInfoUpdate = {}

        userInfo.set({
            username: this.state.username
        }).then(()=>{
            this.props.toggleProfile();
        });
    }
    render() {
        return (
            <Modal
              show={true}
              bsSize="large"
              aria-labelledby="contained-modal-title-lg"
            >
              <Modal.Header>
                  <Modal.Title id="contained-modal-title-lg">My Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Row>
                      <Col xs={12}>
                          <h2>Details</h2>
                          <FormGroup validationState={null}>
                              <ControlLabel>Username</ControlLabel>
                              <FormControl
                                  type="text"
                                  value={this.state.username}
                                  onChange={(e)=>{this.handleUsernameChange(e)}}
                                  bsSize="large"
                              />
                          </FormGroup>
                      </Col>
                      <Col xs={12}>
                          <h2>Scores by cup</h2>
                          <ScoresByCup
                              scores={this.props.scores}
                              uid={this.props.uid}
                          />
                      </Col>
                  </Row>
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={()=>{ this.props.toggleProfile() }}>Close</Button>
                  <Button bsStyle="primary" onClick={()=>{ this.saveUsername() }}>Save</Button>
              </Modal.Footer>
            </Modal>
        )
    }
}

export default Profile;
