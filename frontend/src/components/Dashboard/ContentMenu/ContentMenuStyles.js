import styled from 'styled-components';

export const MenuBackground = styled.div`
  margin: 5%;
  width: 90%;
  height: 90%;

  background-color: ${(props) => (props.colors ? props.colors.hex6 : '#dbdbdb')};
  border-radius: 25px;
`;
