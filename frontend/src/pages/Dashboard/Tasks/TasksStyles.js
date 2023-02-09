import styled from 'styled-components';

export const AuxContainer = styled.div`
  position: relative;
  height: 100%;

  margin: 0 5% 0 5%;
`;

export const TasksHeader = styled.div`
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

export const TasksHeaderButtons = styled.div`
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

export const DropdownAnchor = styled.div`
  position: relative;
  z-index: 1;

  > div {
    margin-left: 20px;
    text-align: center;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index: 500;

  top: 20px;
  right: 0px;

  width: 180px;
  height: auto;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => (props.theme ? props.theme.hex6 : '#ffffff')};
  -webkit-box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 3px 10px 2px rgba(0, 0, 0, 0.75);
  border-radius: 15px;
`;

export const DropdownContent = styled.div`
  width: 95%;
  font-size: 24px;
  min-height: 40px;
  height: auto;
  background-color: ${(props) => (props.colors ? '#DFCFBE' : 'none')};
  border-radius: 15px;
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: flex-start;

  //margin: 15px 0 5% 0;
  height: 90%;
  width: 100%;
  overflow-y: scroll;

  > img {
  }
`;

export const TaskContainer = styled.div`
  display: flex;
  justify-items: center;
  align-items: flex-start;

  width: 100%;
  margin-bottom: 15px;

  padding: 15px 0 15px 0;

  background-color: ${(props) => (props.palette ? props.palette.hex4 : '#996cc9')};
  border-radius: 20px;

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 29px;
  line-height: 29px;

  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const TaskImage = styled.div`
  margin-left: 15px;
  margin-right: 15px;
  height: 100%;
  min-height: 160px;
  height: 100%;

  img {
    min-height: 160px;
    height: 100%;
    width: 160px;
    display: block;
    object-fit: cover;
    border-radius: 20px;
  }
`;

export const TaskInfoContainer = styled.div`
  font-size: 20px;
  width: 70%;
`;

export const TaskTitle = styled.div`
  font-size: 24px;
`;

export const TaskDates = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};

  margin-top: 10px;

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    p {
      margin-right: 10px;
    }

    @media (max-width: 800px) {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export const TaskDays = styled.div`
  margin-top: 10px;
`;

export const AddCharacterButton = styled.div`
  margin-right: 20px;
`;

export const EditButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: ${(props) => (props.switchToColumn ? 'column' : 'none')};

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  margin: 30px 0 30px 0;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 66px;
    width: 240px;

    margin-bottom: ${(props) => (props.switchToColumn ? '20px' : 'none')};

    border-radius: 20px;
  }
`;

export const UpdateButton = styled.div`
  background: ${(props) => (props.valid ? '#00b88f' : '#c7d6d5')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const DeleteButton = styled.div`
  background: #d65e39;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const TaskEditInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  margin-top: 20px;
`;

export const TaskInfoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    object-fit: cover;
    border: none;
  }
`;

export const TaskEditItemsContainer = styled.div`
  height: 90%;
  overflow-y: scroll;
`;

export const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  font-size: 20px;
  margin: 0 15px 0 0;
`;

export const NameField = styled.div`
  margin: 0 0 10px 0;
`;

export const ImageField = styled.div`
  margin: 15px 0 10px 0;
`;

export const ItemContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;

  display: flex;

  background-color: ${(props) => (props.colors ? props.colors.hex4 : '#996cc9')};
`;

export const ItemImage = styled.div`
  width: 20%;
  height: 100%;
  margin: 10px 10px 10px 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 15px;
    background-color: ${(props) => (props.colors ? props.colors : 'none')};
  }
`;

export const ItemInfo = styled.div`
  width: 60%;
  margin: 10px 10px 10px 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 29px;
`;

export const ExcludeItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 20%;

  div {
    font-family: 'Inter', arial;
    font-size: 30px;

    height: 30%;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
  }
`;

export const AddItemButtom = styled.div`
  margin: 40px 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  * {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000 !important;
    font-family: 'Inter', arial;
    font-size: 40px;
  }

  button {
    height: 60px;
    width: 40px;
    border-radius: 10px;
  }
`;

export const ModalContainer = styled.div`
  * {
    font-family: 'Inter', arial;
  }

  .MuiBox-root {
    background-color: ${(props) => props.theme.hex6};
    color: #000000;
    border-radius: 15px;
    border: 1px solid #ffffff;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 24px;
`;

export const ItemsContainer = styled.div`
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 5px;
  justify-items: center;
  align-items: self-start;
  text-align: center;

  border: 1px solid #000000;
  border-radius: 15px;
  padding-bottom: 10px;

  @media (max-width: 1500px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 1045px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  overflow-y: scroll;
`;

export const ModalItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  height: 170px;
  width: 150px;

  margin-top: 10px;
  //border: 1px solid black;
  border-radius: 15px;

  background-color: ${(props) => props.colors};

  img {
    background-color: ${(props) => props.colors};
    height: 100px;
    width: 100px;
    border-radius: 15px;
  }
`;

export const ModalItemTitle = styled.div`
  background-color: #1f3265;
  border-radius: 15px;
  text-align: center;
  color: #ffffff;
  margin: 5px 0 10px 0;
  padding: 5px 0 0px 0;
  height: 40px;
  width: 90%;
`;

export const CreateButton = styled.div`
  background: ${(props) => (props.valid ? '#00b88f' : '#c7d6d5')};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const AddButtomContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => (props.switchToColumn ? 'column' : 'none')};

  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;

  margin: 30px 0 30px 0;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 66px;
    width: 240px;

    margin-bottom: ${(props) => (props.switchToColumn ? '20px' : 'none')};

    border-radius: 20px;
  }
`;

//
//
//
