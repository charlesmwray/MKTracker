import React, { Component } from 'react';

import firebase from '../data/Firebase.js';

import banana from '../images/cups/banana.png'
import bell from '../images/cups/bell.png'
import crossing from '../images/cups/crossing.png'
import flower from '../images/cups/flower.png'
import leaf from '../images/cups/leaf.png'
import lightning from '../images/cups/lightning.png'
import mushroom from '../images/cups/mushroom.png'
import shell from '../images/cups/shell.png'
import special from '../images/cups/special.png'
import star from '../images/cups/star.png'
import triforce from '../images/cups/triforce.png'
import yoshi from '../images/cups/yoshi.png'

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

const CupRow = (props) => {
    if (props && props.cups && props.cups.length) {
        return props.cups.map((cup)=>{
            return <Col
                sm={2}
                key={cup[1]}
                onClick={()=>{props.selectCup(cup[1])}}
                style={{
                    padding: '1rem',
                    borderRadius: '5px',
                    backgroundColor: cup[1] === props.selectedCup ? 'lightskyblue' : 'transparent',
                    textAlign: 'center'
                }}
            >
                <img src={cup[0]} style={{width: '8vw'}} className="cups"/>
            </Col>;
        });
    } else {
        return 'null';
    }
    //
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
      let itemsRef = firebase.database().ref('scores/');

      if (this.state.pointsValue <= 60 && this.state.cupValue) {
          itemsRef.push({
              uid: this.props.userInfo.uid,
              points: this.state.pointsValue,
              cup: this.state.cupValue,
              date: new Date(),
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
      if (this.state.pointsValue > 60) {
          return 'error';
      } else if (this.state.pointsValue !== null ) {
          return 'success';
      } else {
          return null;
      }
  }

  render() {
    return (
        <form>
            <Grid>
                <Row>
                    <Col xs={12} sm={1}>
                        <FormGroup validationState={this.getPointsValidationState()}>
                            <ControlLabel>Points</ControlLabel>
                            <FormControl
                                type="number"
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
                                cups={[
                                    [mushroom,'mushroom'],
                                    [flower,'flower'],
                                    [star,'star'],
                                    [special,'special'],
                                    [yoshi,'yoshi'],
                                    [crossing,'crossing']
                                ]}
                            />
                        </Row>
                        <Row>
                            <CupRow
                                selectCup={this.selectCup}
                                selectedCup={this.state.cupValue}
                                cups={[
                                    [shell,'shell'],
                                    [banana,'banana'],
                                    [leaf,'leaf'],
                                    [lightning,'lightning'],
                                    [triforce,'triforce'],
                                    [bell,'bell']
                                ]} />
                        </Row>
                    </Col>
                    <Col xs={12} style={{textAlign:'right'}}>
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
