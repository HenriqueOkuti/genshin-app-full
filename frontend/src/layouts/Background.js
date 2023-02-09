import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  background: ${(props) =>
    props.colors ? 'none' : `url(${'https://wallpapercave.com/wp/wp10519849.jpg'}) no-repeat fixed center`};
  background-color: ${(props) => (props.colors ? props.colors.hex3 : '#66527B')};
  background-size: 100% auto;
  background-repeat: repeat;

  z-index: -1;
`;
