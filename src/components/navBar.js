import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';

const HeroText = styled.a`
    font-family: 'Pacifico';
    font-size: 2em;
    color: #fff;
    text-decoration: none;
`;

const styles = {
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar className={classes.root}>
          <HeroText href="/" className={classes.left}>Digicah</HeroText>
          <Button className={classes.right} href="/logout" color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  player: state.game.player,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(NavBar));
