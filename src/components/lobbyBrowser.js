import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

import { game } from '../actions';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {chat} from "../actions";

const FormTab = styled(Box)`
  & > div > div, button {
    width: 100%;
    margin: auto;
  }
  button {
    margin-bottom: 3vh;
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class LobbyBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      name: '',
      cardpacks: [],
      password: '',
      maxPlayers: 10
    };
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleChangeIndex = tabValue => {
    this.setState({ tabValue });
  };

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ cardpacks: event.target.value });
  };

  handleMaxPlayersChange = event => {
    this.setState({ maxPlayers: event.target.value });
  };

  createGame = event => {
    this.props.createGame({name: this.state.name, cardpacks: this.state.cardpacks, password: this.state.password});
    this.setState({tabValue: 0});
  }



  render() {
    const { classes } = this.props;
    return (
      <Flex flexDirection='column'>
        <Box m="auto" mt="15vh" style={{maxWidth: '100vw'}}>
          <Paper>
            <AppBar position="static">
              <Tabs value={this.state.tabValue} onChange={this.handleChange}>
                <Tab label="Browse" />
                <Tab label="Create" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              index={this.state.tabValue}
              onChangeIndex={this.handleChangeIndex}
            >
                <Box mt="1vh">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Creator</TableCell>
                        <TableCell>Cardpacks</TableCell>
                        <TableCell>Password Protected</TableCell>
                        <TableCell>Players</TableCell>
                        <TableCell>Game In Progress</TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.props.lobbies.map(n => {
                        return (
                          <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                              {n.name}
                            </TableCell>
                            <TableCell>{n.creator}</TableCell>
                            <TableCell>{n.cardpacks}</TableCell>
                            <TableCell>{n.hasPassword ? '✔️' : '❌'}</TableCell>
                            <TableCell>{`${n.maxPlayers}/${n.players.length}`}</TableCell>
                            <TableCell>{n.waitForPlayers ? '✔️' : '❌'}</TableCell>
                            <TableCell>
                              <Button variant="raised" color="primary">
                                Join
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              <FormTab m='1vw'>
                <Box mt='3vh'>
                  <TextField
                    id="name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                    margin="normal"
                  />
                </Box>
                <Box mt='3vh'>
                  <FormControl>
                    <InputLabel htmlFor="select-multiple-chip">Cardpacks</InputLabel>
                    <Select
                      multiple
                      value={this.state.cardpacks}
                      onChange={this.handleSelectChange}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={selected => (
                        <div>
                          {selected.map(value => <Chip key={value} label={value} />)}
                        </div>
                      )}
                      MenuProps={MenuProps}
                    >
                      {this.props.cardpacks.map(cardpack => (
                        <MenuItem
                          key={cardpack}
                          value={cardpack}
                        >
                          {cardpack}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box mt='3vh'>
                  <TextField
                    id="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    placeholder='Leave empty for no password'
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                </Box>
                <Box mt='3vh'>
                  <TextField
                    error={this.state.maxPlayers > 15 || this.state.maxPlayers < 3}
                    id="maxPlayers"
                    label="Max Players"
                    type="number"
                    value={this.state.maxPlayers}
                    onChange={this.handleMaxPlayersChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: {
                        min: 3,
                        max: 15
                      }
                    }}
                    margin="normal"
                  />
                </Box>
                <Box mt='3vh'>
                  <Button variant="raised" color="primary" onClick={this.createGame}>
                    Create
                  </Button>
                </Box>
              </FormTab>
            </SwipeableViews>
          </Paper>
        </Box>
      </Flex>
    );
  }
}

const mapStateToProps = state => ({
  lobbies: state.game.lobbies,
  cardpacks: state.game.cardpacks
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createGame: game.create
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LobbyBrowser);
