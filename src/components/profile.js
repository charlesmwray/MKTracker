import React, { Component } from 'react';

import Firebase from '../data/Firebase.js';

import ScoresByCup from './scoresByCup.js';

import {
    Modal,
    Button,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';

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
                      <Col xs={12} lg={4}>
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
                      <Col xs={12} lg={8}>
                          <h2>Scores by cup</h2>
                          <Row style={{
                              padding: '2rem'
                          }}>
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
