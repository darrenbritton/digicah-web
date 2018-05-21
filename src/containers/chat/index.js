import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Launcher } from 'react-chat-window';

import messageHistory from './messageHistory';

const ChatWrapper = styled.div`
  & .sc-launcher, .sc-header, .sc-message--content.sent .sc-message--text {
    background-color: #3f50b5;
  }
`;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
    };
  }

  onMessageWasSent = (message) => {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  };

  handleClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  };

  handleNewUserMessage = (message) => {
    if (Object.keys(message.data).length > 0) {
      this.setState({
        messageList: [...this.state.messageList, message],
      });
    }
    // Now send the message throught the backend API
  };

  render() {
    return (
      <ChatWrapper>
        <Launcher
          agentProfile={{
            teamName: 'thunderdome',
            imageUrl: this.props.player.profilePicture || 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          }}
          onMessageWasSent={this.handleNewUserMessage}
          messageList={this.state.messageList}
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
  chatLog: state.chatLog,
  player: state.game.player
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
