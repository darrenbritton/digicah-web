import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Home from './containers/home';
import Chat from './containers/chat';
import About from './containers/about';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">Home</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/about-us">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/logout">Logout</Link>
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/about-us" component={About} />
          <Route path="/login" component={() => { window.location = '//localhost:8080/auth/google'; }} />
          <Route path="/logout" component={() => { window.location = '//localhost:8080/logout'; }} />
        </main>
      </div>
    );
  }
}

export default App;
