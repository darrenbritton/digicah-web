import { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      'You are logged in'
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
