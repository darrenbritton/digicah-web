import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import {display, player} from '../actions';
import {push} from 'react-router-redux';

import ReactCountdownClock from 'react-countdown-clock';

const HeroText = styled.a`
    font-family: 'Pacifico';
    font-size: 2em;
    color: #fff;
    text-decoration: none;
`;

const ActionWrapper = styled(Box)`
  .react-countdown-clock {
    position: fixed;
    right: 25px;
    top: 90px;
  }
`;

class NavBar extends Component {
  render() {
    const buttons = [];
    let timer = null;
    if (this.props.player.inGame) {
      buttons.push(<Button key='take-a-break' onClick={() => this.props.takeBreak()} color="inherit">Take A Break</Button>);
      buttons.push(<Button key='leave' href="/play" color="inherit">Leave</Button>);
      buttons.push(<Button key='view-players' onClick={() => this.props.togglePlayerDrawer()} color="inherit">View Players</Button>);
      if( this.props.playing.currentRound.players && !this.props.playing.judging && this.props.playing && this.props.playing.timeout > 0) {
        timer = (<ReactCountdownClock
          seconds={this.props.playing.timeout / 1000}
          color="#fff"
          alpha={0.9}
          size={60}
        />);
      }
    }
    buttons.push(<Button key='logout' href="/logout" color="inherit">Logout</Button>);
    return (
      <AppBar position="static">
        <Toolbar>
          <Flex w='100%' justifyContent='space-between'>
            <Box>
              <HeroText href="/">Digicah</HeroText>
            </Box>
            <ActionWrapper mt='10px'>
              {buttons}
              {timer}
            </ActionWrapper>
          </Flex>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  display: state.display,
  playing: state.game.playing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  togglePlayerDrawer: display.togglePlayerDrawer,
  takeBreak: player.takeBreak,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
