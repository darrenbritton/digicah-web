import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LobbyBrowser from '../../components/lobbyBrowser';

class Home extends Component {
  render() {
    return (
      <LobbyBrowser/>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Home);
