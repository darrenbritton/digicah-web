import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Launcher } from 'react-chat-window';
import { chat } from '../../actions';

const ChatWrapper = styled.div`
  & .sc-launcher, .sc-header, .sc-message--content.sent .sc-message--text {
    background-color: #3f50b5;
  }
  & .sc-chat-window.opened {
    z-index: 1;
    height: 35vh;
  }
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessagesCount: 0,
      isOpen: false,
    };
  }

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  };

  handleNewUserMessage = (message) => {
    if (Object.keys(message.data).length > 0) {
      this.props.sendMessage({text: message.data.text})
    }
  };

  render() {
    return (
      <ChatWrapper>
        <Launcher
          agentProfile={{
            teamName: 'thunderdome',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          }}
          onMessageWasSent={this.handleNewUserMessage}
          messageList={this.props.chatlog.map(message => message.sender === this.props.player.id ? {...message, data: {text: message.data.raw}, author: 'me'} : message)}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this.handleClick}
          isOpen={this.state.isOpen}
          showEmoji
        />
      </ChatWrapper>
    );
  }
}

const mapStateToProps = state => ({
  chatlog: state.chat.chatlog,
  player: state.player
});

const mapDispatchToProps = dispatch => bindActionCreators({
  sendMessage: chat.send
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
