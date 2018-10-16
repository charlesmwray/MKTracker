import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Grid,
    Row,
    Col,
    Button
} from 'react-bootstrap';

class EnterScore extends Component {
  constructor(props) {
      super(props);

      this.handlePointsChange = this.handlePointsChange.bind(this);
      this.handleCupChange = this.handleCupChange.bind(this);

      this.state = {
          cupValue: 'mushroom'
      };
  }

  saveScore() {
      let itemsRef = firebase.database().ref('scores/');

      itemsRef.push({
          uid: this.props.userInfo.uid,
          points: this.state.pointsValue,
          cup: this.state.cupValue,
          date: new Date(),
          username: this.props.userInfo.displayName,
          photoURL: this.props.userInfo.photoURL
      });
  }

  handlePointsChange(e) {
      this.setState({ pointsValue: e.target.value });
  }

  handleCupChange(e) {
      this.setState({ cupValue: e.target.value });
  }

  render() {
    return (
        <form>
            <Grid>
                <Row>
                    <Col xs={12} sm={6}>
                        <FormGroup>
                            <ControlLabel>Points</ControlLabel>
                            <FormControl
                                type="number"
                                value={this.state.prixPoints}
                                placeholder=""
                                onChange={this.handlePointsChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={6}>
                        <FormGroup>
                            <ControlLabel>Cup</ControlLabel>
                            <FormControl
                                componentClass="select"
                                placeholder="select"
                                onChange={this.handleCupChange}
                                value={this.state.cupValue}
                            >
                                <option value="mushroom">Mushroom</option>
                                <option value="other">...</option>
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={12} style={{textAlign:'right'}}>
                        <Button bsStyle="primary" onClick={() => {this.saveScore()}}>Add Score</Button>
                    </Col>
                </Row>
            </Grid>
        </form>
    );
  }
}

export default EnterScore;
