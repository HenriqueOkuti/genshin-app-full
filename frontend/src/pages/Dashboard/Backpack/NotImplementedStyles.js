import styled from 'styled-components';

export const NotImplementedContainer = styled.div`
  margin: 10% 0 50% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Inter', arial;
  font-size: 40px;
  text-align: center;

  div {
    margin: 15px 0 15px 0;
  }

  img {
    height: 200px;
    width: 200px;
    object-fit: cover;
    border-radius: 100%;
    object-position: -35px 0px;
  }
`;
