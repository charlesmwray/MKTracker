import React, { Component } from 'react';

import Firebase from '../data/Firebase.js';
import Cups from '../data/Cups.js';

import {
    FormGroup,
    ControlLabel,
    FormControl,
    Grid,
    Row,
    Col,
    Button
} from 'react-bootstrap';

const CupRow = (props) => {
    if (props && props.cups && props.cups.length) {
        return props.cups.map((cup)=>{
            return <Col
                xs={2}
                key={cup[1]}
                onClick={()=>{props.selectCup(cup[1])}}
                className={ cup[1] === props.selectedCup ? 'cup-row active' : 'cup-row' }
            >
                <img src={cup[0]} alt={cup[1] + ' cup'} className="cup-image" />
            </Col>;
        });
    } else {
        return 'null';
    }
}

class EnterScore extends Component {
  constructor(props) {
      super(props);

      this.handlePointsChange = this.handlePointsChange.bind(this);
      this.selectCup = this.selectCup.bind(this);

      this.state = {
          cupValue: null
      };
  }

  saveScore() {
      let itemsRef = Firebase.database().ref('scores/');

      if (this.state.pointsValue <= 60 && this.state.cupValue) {
          itemsRef.push({
              uid: this.props.userInfo.uid,
              points: this.state.pointsValue,
              cup: this.state.cupValue,
              date: new Date().toDateString(),
              username: this.props.userInfo.displayName,
              photoURL: this.props.userInfo.photoURL
          });

          this.props.toggleAddScore();
      }
  }

  handlePointsChange(e) {
      this.setState({ pointsValue: e.target.value });
  }

  selectCup(cup) {
      this.setState({ cupValue: cup });
  }

  getPointsValidationState() {
      const pointsValue = parseInt(this.state.pointsValue);
      if (pointsValue > 60 || pointsValue < 4) {
          return 'error';
      } else if (pointsValue !== null ) {
          return 'success';
      } else {
          return null;
      }
  }

  render() {
    return (
        <form style={{margin: '2rem 0'}}>
            <Grid>
                <Row>
                    <Col xs={12} sm={1}>
                        <FormGroup validationState={this.getPointsValidationState()}>
                            <ControlLabel>Points</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.prixPoints}
                                placeholder=""
                                onChange={this.handlePointsChange}
                                bsSize="large"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={12} sm={11}>
                        <Row>
                            <CupRow
                                selectCup={this.selectCup}
                                selectedCup={this.state.cupValue}
                                cups={Cups}
                            />
                        </Row>
                    </Col>
                    <Col xs={12} style={{ textAlign:'right', marginTop: '2rem' }}>
                        <Button
                            bsStyle="danger"
                            onClick={() => { this.props.toggleAddScore() }}
                            style={{marginRight: '1rem'}}
                        >
                            Cancel
                        </Button>
                        <Button
                            bsStyle="primary"
                            onClick={() => { this.saveScore() }}
                        >
                            Add Score
                        </Button>
                    </Col>
                </Row>
            </Grid>
        </form>
    );
  }
}

export default EnterScore;
