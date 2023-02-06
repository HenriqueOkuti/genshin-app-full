import styled from 'styled-components';

export const AuxContainer = styled.div`
  position: relative;
  height: 100%;

  margin: 0 5% 0 5%;
`;

export const HomeHeader = styled.div`
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

export const HomeHeaderButtons = styled.div`
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

  div {
    font-size: 24px;
    height: 40px;
  }
`;

export const EmptyTasksContainer = styled.div`
  height: 90%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Inter', arial;
  font-size: 20px;
`;
