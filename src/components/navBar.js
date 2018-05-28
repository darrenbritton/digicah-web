import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import {display, player} from "../actions";
import {push} from "react-router-redux";

const HeroText = styled.a`
    font-family: 'Pacifico';
    font-size: 2em;
    color: #fff;
    text-decoration: none;
`;

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class NavBar extends Component {
  render() {
    const buttons = [];
    if (this.props.player.inGame) {
      buttons.push(<Button key='take-a-break' onClick={() => this.props.takeBreak()} color="inherit">Take A Break</Button>);
      buttons.push(<Button key='leave' href="/play" color="inherit">Leave</Button>);
      buttons.push(<Button key='view-players' onClick={() => this.props.togglePlayerDrawer()} color="inherit">View Players</Button>);
    }
    buttons.push(<Button key='logout' href="/logout" color="inherit">Logout</Button>);
    return (
      <AppBar position="static">
        <Toolbar>
          <Flex w='100%' justifyContent='space-between'>
            <Box>
              <HeroText href="/">Digicah</HeroText>
            </Box>
            <Box mt='10px'>
              {buttons}
            </Box>
          </Flex>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  display: state.display
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  togglePlayerDrawer: display.togglePlayerDrawer,
  takeBreak: player.takeBreak,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NavBar));
