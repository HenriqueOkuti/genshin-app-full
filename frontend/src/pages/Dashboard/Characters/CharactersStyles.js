import styled from 'styled-components';

export const AuxContainer = styled.div`
  position: relative;
  height: 95%;

  overflow-y: scroll;

  margin: 0 5% 0 5%;
`;

export const CharactersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 45px;

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;

  color: #000000;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const CharactersHeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 45px;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Inter', arial;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 29px;
    display: flex;
    align-items: center;
  }
`;

export const AddCharacterButton = styled.div`
  margin-right: 20px;
`;

export const SearchBarContainer = styled.div`
  background-color: red;
`;

export const CharactersList = styled.div`
  display: grid;

  grid-template-columns: repeat(${(props) => (props.width ? Math.floor(props.width / 300) : 3)}, 1fr);

  @media (max-width: 700px) {
    grid-template-columns: repeat(${(props) => (props.width ? Math.floor(props.width / 205) : 3)}, 1fr);
  }

  justify-items: center;
  align-items: self-start;

  gap: 5px;
  height: 90%;
  overflow-y: scroll;

  border: 1px solid #000000;
  border-radius: 15px;

  > img {
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
`;

export const CharacterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Inter, arial;
  font-size: 18px;

  padding: 10px;

  border-radius: 5px;
  width: 120px;

  background-color: ${(props) => props.colors};
`;

export const CardName = styled.div`
  width: 100%;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #1f3265;
  border-radius: 15px;
  text-align: center;
  color: #ffffff;
  padding: 5px 0 5px 0;

  margin-bottom: 5px;
`;

export const CardImage = styled.div`
  img {
    background-color: ${(props) => (props.colors ? props.colors : '#d95538')};
    border-radius: 5px 5px 0 0;
  }
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    margin: 5px 0 0px 0;
  }
`;

export const DropdownAnchor = styled.div`
  position: relative;
  z-index: 1;

  > div {
    margin-left: 20px;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index: 500;

  top: 20px;
  right: 5px;

  width: 180px;
  height: auto;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => (props.theme ? props.theme.hex6 : '#ffffff')};
  -webkit-box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  border-radius: 15px;

  padding: 5px 0 5px 0;
`;

export const DropdownContent = styled.div`
  width: 95%;
  font-size: 24px;
  height: 40px;
  background-color: ${(props) => (props.colors ? '#DFCFBE' : 'none')};
  border-radius: 15px;
`;

export const RenderAddCharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
`;

export const SendUserCharacter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background-color: ${(props) => (props.allowed ? '#4BB543' : '#D11A2A')};
  border-radius: 20px;
  height: 60px;
  width: 100%;
  font-size: 20px;
  font-family: 'Inter', arial;
`;

export const AddCharacterContainer = styled.div`
  font-family: 'Inter', arial;
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const AddCharacterImage = styled.div`
  width: 50%;

  img {
    max-width: 100%;
    min-width: 100%;
    min-height: 400px;
    max-height: 400px;
    background-color: ${(props) => (props.color ? props.color : 'none')};
    object-fit: contain;

    border-radius: 15px;
  }
`;

export const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 20px;

  input {
    height: 30px;
    line-height: 16px;
    padding: 8px 32px 8px 8px;
    color: #000000;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
  }
`;

export const TalentsContainer = styled.div`
  width: 100%;
  > p {
    margin: 0 0 15px 0;
    font-size: 22px;
  }
`;

export const IndividualTalent = styled.div``;

//${(props) => (props.colors ? props.colors : 'none')};
export const TalentInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 10px 0 10px 0;

  img {
    height: 50px;
    width: 50px;
    background-color: ${(props) => (props.colors ? props.colors : 'none')};
    border-radius: 5px;
  }

  p {
    width: calc(70% - 60px);
    margin-left: 5px;
  }

  div {
    margin-left: 15px;
  }
`;

export const MiscInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 22px;
  margin-right: 15px;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 80%;
  }
  input {
    display: flex;
    width: 20%;
  }
`;

export const EditCharacterOuterContainer = styled.div`
  width: 90%;
  padding: 0 5% 5% 5%;
  min-height: 400px;
  height: 35vh;
`;

export const EditCharacterContainer = styled.div`
  width: 100%;
  height: 400px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  font-family: 'Inter', arial;

  margin-top: 10px;
`;

//${(props) => (props.colors ? props.colors : 'none')};
export const EditCharacterImage = styled.div`
  width: 50%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  > * {
    display: flex;
    background-color: ${(props) => (props.colors ? props.colors : 'none')};
    min-height: 400px;
    max-height: 40px !important;
    border-radius: 15px;
    object-fit: cover;
    object-position: top;
    height: 50%;
    max-width: 75%;
    max-height: 50%;
    width: 75%;
  }
`;

export const EditForms = styled.div`
  max-width: 50%;
  min-width: 50%;

  max-height: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin-left: 20px;

  input {
    width: 40px;
    height: 30px;
    line-height: 16px;
    padding: 8px 16px 8px 16px;
    color: #000000;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    text-align: center;
  }
`;

export const TalentsTitle = styled.div`
  margin: 0 0 15px 0;
  font-size: 22px;
`;

export const EditButtonsContainer = styled.div`
  height: 75px;

  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;

    height: 100%;
    width: 50%;
    border-radius: 25px;
    border: 1px solid #7c7a7a;
    -webkit-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
  }
`;

export const EditDeleteButton = styled.div`
  background-color: #ff5d73;
`;

export const EditModifyButton = styled.div`
  background-color: ${(props) => (props.color ? '#4bb543' : '#c7d6d5')};
`;

export const AddButtonContainer = styled.div`
  height: 75px;

  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 22px;

    height: 100%;
    width: 50%;
    border-radius: 25px;
    border: 1px solid #7c7a7a;
    -webkit-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
  }
`;

export const AddInsertButton = styled.div`
  background-color: ${(props) => (props.color ? '#4bb543' : '#c7d6d5')};
`;
