import React, { Component } from 'react';

import Firebase from '../data/Firebase.js';
import Cups from '../data/Cups.js';

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
    let scoresByCup = {};

    scoreKeys.map(s => {
        parsedScores.push(props.scores[s]);
    });

    thisUsersScores = parsedScores.filter(s => {
        return s.uid === 'DKnyuveNkVPTJ7g21ihOCTiPtAR2';
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
                    padding: '2rem'
                }}
            >
                <img src={[c[0]]} className="cup-image" /><h3>{avg}</h3>
            </Col>
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
        let userInfo = Firebase.database().ref('users/' + this.state.uid);

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
        let userInfo = Firebase.database().ref('users/' + this.state.uid);
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
                          <Row>
                              <ScoresByCup
                                  scores={this.props.scores}
                                  uid={this.props.uid}
                              />
                          </Row>
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
