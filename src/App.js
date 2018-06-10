import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from './containers/home';
import Chat from './containers/chat';
import Game from './containers/game';
import LoggedOut from './containers/loggedOut';
import About from './containers/about';

import NavBar from './components/navBar';
import SnackBar from './components/snackBar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ((Object.keys(nextProps.player.session).length > 0) !== prevState.loggedIn) {
      if (!prevState.loggedIn && !nextProps.location.pathname.includes('game')) {
        nextProps.loggedIn();
        return { loggedIn: !prevState.loggedIn };
      }
      nextProps.loggedOut();
    } else if (Object.keys(nextProps.player.session).length > 0) {
      return { loggedIn: true };
    }
    return prevState;
  }

  componentDidMount() {
    if (!this.state.loggedIn
      && this.props.location
      && this.props.location.pathname !== '/logged-out') this.props.loggedOut();
  }

  render() {
    return (
      <div>
        {this.state.loggedIn ? <div><NavBar /><Chat /></div> : null}
        {/* <header> */}
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/chat">Chat</Link> */}
        {/* <Link to="/about-us">About</Link> */}
        {/* <Link to="/login">Login</Link> */}
        {/* <Link to="/logout">Logout</Link> */}
        {/* </header> */}

        <main>
          <Route exact path="/play" component={Home} />
          <Route exact path="/play/game/:id" component={Game} />
          <Route exact path="/about-us" component={About} />
          <Route exact path="/logged-out" component={LoggedOut} />
          <Route path="/login" component={() => { window.location = `//${window.location.hostname}:8080/auth/google`; }} />
          <Route path="/logout" component={() => { window.location = `//${window.location.hostname}:8080/logout`; }} />
        </main>
        <SnackBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
  player: state.player,
  location: state.routing.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loggedOut: () => push('/logged-out'),
  loggedIn: () => push('/play'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
