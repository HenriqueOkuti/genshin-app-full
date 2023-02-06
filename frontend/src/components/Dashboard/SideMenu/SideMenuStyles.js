import styled from 'styled-components';

export const OptionsContainer = styled.div`
  height: 95%;
  margin: 25px 20px 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #000000;

  @media (max-height: 790px) {
    overflow-y: scroll;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > .MuiAvatar-root {
    height: 160px;
    width: 160px;
  }
`;

export const UsernameContainer = styled.div`
  height: 25px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 15px;
  margin-bottom: 10px;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .MuiButton-root {
    margin-bottom: 10px;
    font-family: 'Inter', arial !important;
    color: #000000 !important;
    background-color: inherit !important;

    @media (max-width: 700px) {
      min-width: 250px !important;
    }
  }
`;

export const ButtonText = styled.div``;

export const ThemesContainer = styled.div`
  height: auto;
  width: 100%;

  margin-top: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  > .MuiAvatar-root {
    height: 120px;
    width: 120px;
  }
`;

export const ExitContainer = styled.div`
  margin-top: 20px;
  height: 25px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
