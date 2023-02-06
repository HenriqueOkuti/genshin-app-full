import styled from 'styled-components';

export const AuthContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (min-width: 700px) {
    width: 50%;
  }

  > div {
    width: 80%;
    margin: 0 10% 0 10%;
  }

  background-color: #ffffff;
  z-index: 0;
`;
