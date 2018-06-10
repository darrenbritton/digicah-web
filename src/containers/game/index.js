import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';

import { display, player } from "../../actions";

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Card from '../../components/card';

const DrawerButton = styled(Button)`
  margin: 10vh !important;
`;

class Home extends Component {
  constructor(props) {
    super(props);
  }

  fillInText = () => {
    let index = 0;
    let populatedText = this.props.game.playing.currentRound.blackCard.text;
    while(populatedText.indexOf('___') > 0 && this.props.player.submittedTexts[index]) {
      populatedText = populatedText.replace('___', this.props.player.submittedTexts[index]);
      index++;
    }
    return populatedText;
  };

  submit = (index) => {
    this.props.submit(index);
  };

  judge = (id) => {
    this.props.judge({id});
  };

  render() {
    const { playing } = this.props.game;
    const { player } =  this.props;
    let roundPlayer =  { hand: []};
    if (this.props.game.playing.currentRound && this.props.game.playing.currentRound.players) {
      const roundPlayerData = this.props.game.playing.currentRound.players.find(roundPlayer => roundPlayer.id === player.session.id);
      if (roundPlayerData) {
        roundPlayer = roundPlayerData;
      } else if (!roundPlayerData && this.props.game.playing.currentRound.cardCzar.id === player.session.id) {
        roundPlayer = this.props.game.playing.currentRound.cardCzar;
      }
    }
    return (
      <div>
        <Drawer open={this.props.display.playerDrawer} onClose={() => this.props.togglePlayerDrawer()}>
          <div
            tabIndex={0}
          >
          <Box w='250px'>
            <div>
              <List>
                {player.inGame && playing.players && playing.players.map((player, index) => (
                  <ListItem key={player.id} >
                    <Avatar alt={player.nickname} src={player.profilePicture} />
                    <ListItemText primary={player.isCzar? 'Card Czar' : player.onBreak ? 'On Break' : 'Playing'} secondary={`score: ${player.score}`} />
                  </ListItem>
                ))}
              </List>
            </div>
          </Box>
          </div>
        </Drawer>
        <Drawer anchor="bottom" open={this.props.display.breakDrawer || this.props.player.onBreak} onClose={() => this.props.returnFromBreak()}>
          <div
            tabIndex={0}
          >
            <Box w='fit-content' m='auto'>
              <DrawerButton color='primary' onClick={() => this.props.returnFromBreak()} variant="outlined">Return To Game</DrawerButton>
            </Box>
          </div>
        </Drawer>
        <Flex justifyContent='center'>
          <Box m='auto'>
            <Card text={ Object.keys(this.props.game.playing.currentRound).length === 0 ? '' : this.fillInText()} black />
          </Box>
        </Flex>
        <Flex justifyContent='center' flexWrap='wrap'>
          { !roundPlayer.isCzar && player.hand &&
            player.hand.map((card, index) => (
              <Box key={card.text}>
                <Card text={card.text} index={index} submit={(index) => this.submit({index})} />
              </Box>
            ))
          }
          { roundPlayer.isCzar && !this.props.game.playing.currentRound.submissions &&
            <Box>
              <h1>{'Waiting for submissions...'}</h1>
            </Box>
          }
          { this.props.game.playing.currentRound.submissions &&
            Object.keys(this.props.game.playing.currentRound.submissions).map((key) => {
              const submission = this.props.game.playing.currentRound.submissions[key];
              return (
                <Box key={key}>
                  <Card text={submission} index={key} submit={(key) => this.judge(key)}
                        select={this.logger}/>
                </Box>
              );
            })
          }
        </Flex>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
  display: state.display
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
  togglePlayerDrawer: display.togglePlayerDrawer,
  returnFromBreak: player.returnFromBreak,
  submit: player.submit,
  judge: player.judge
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
