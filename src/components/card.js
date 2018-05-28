import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Button from '@material-ui/core/Button';

const CardBody = styled.div`
  cursor: pointer;
  background-color: #ffffff;
  color: #000000;
  width: 180px;
  height: 180px;
  margin: 10px;
  padding: 15px;
  font-weight: bold;
  word-wrap: break-word;
  border-radius: 10px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  user-select: none;
  
  & > span {
    margin: 0px;
    padding: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    height: 85%;
    width: 100%;
    display: block;
  }
  
  button {
    visibility: hidden;
  }
  
   button:first-of-type {
    margin-right: 2%;
  }
  
  ${props => props.black && css`
    cursor: not-allowed;
    background-color: #000000;
    color: #ffffff;
    flex-shrink: 0;
  `}
  
  ${props => props.selected && css`
    background-color: #b9b9b9;
    button {
      visibility: visible;
    }
  `}
`;


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  toggle = () => {
    this.setState({selected: !this.state.selected});
  }
  select = () => {
    this.props.select(this.props.text, !this.state.selected);
    this.toggle();
  }
  submit = () => {
    this.props.submit(this.props.index);
  }
  render() {
    return (
      <CardBody selected={this.state.selected} {...this.props} onClick={() => this.props.select ? this.select() : undefined}>
        <span>{this.props.text}</span>
        <Button variant="raised" onClick={() => this.toggle()} color='secondary'>
          Cancel
        </Button>
        <Button variant="raised" onClick={() => this.props.submit ? this.submit() : undefined} color='primary'>
          Submit
        </Button>
      </CardBody>
    );
  }
}

export default Card;
