import React, {Component} from 'react';
import styled from 'styled-components';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Flex, Box} from 'grid-styled'

import Button from '@material-ui/core/Button';

const ButtonIcon = styled.img`
  position: relative;
  margin-left: 11px;
  width: 18px;
  height: 18px;
`;

const TiltedBox = styled(Box)`
    transform: rotate(-15deg);
`;

const HeroText = styled.a`
    font-family: 'Pacifico';
    height: 2em;
    font-size: 4em;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-image: url(https://res.cloudinary.com/practicaldev/image/fetch/s--_z_xPOyJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://camo.qiitausercontent.com/6460dfb406278f818805744fde2ecefe9203e1e4/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f363635372f64373634383466652d346161612d313763662d353837332d3962313139313763663961612e676966);
`;

class Home extends Component {
    render() {
        return (
            <Flex flexDirection='column'>
                <TiltedBox m='auto' mt='35vh'>
                    <HeroText>Digicah</HeroText>
                </TiltedBox>
                <Box m='auto' mt='4vh'>
                    <Button href='/login' variant="raised" color="primary">
                        Login With <ButtonIcon src="//upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                    </Button>
                </Box>
            </Flex>
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
