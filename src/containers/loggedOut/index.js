import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';

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
    background-image: url(https://media.giphy.com/media/l1J9R1Q7LJGSZOxFe/giphy.gif);
`;

class LoggedOut extends Component {
  render() {
    return (
      <Flex flexDirection="column">
        <TiltedBox m="auto" mt="35vh">
          <HeroText>Digicah</HeroText>
        </TiltedBox>
        <Box m="auto" mt="4vh">
          <Button href="/login" variant="raised" color="primary">
                        Login With <ButtonIcon src="//upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
          </Button>
        </Box>
      </Flex>
    );
  }
}

export default LoggedOut;
