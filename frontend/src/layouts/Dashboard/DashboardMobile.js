import styled from 'styled-components';

export const MobileHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 150px;

  background: ${(props) => props.colors.hex6};
  border-radius: 0px 0px 20px 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    margin: 0 40px 0 40px;
  }
`;

export const MobilePageContainer = styled.div`
  height: 98vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MobileContentContainer = styled.div`
  margin-top: 200px;
  width: 100%;
  height: 90%;

  background: ${(props) => props.colors.hex6};
  border-radius: 20px;

  overflow-y: hidden;
`;
