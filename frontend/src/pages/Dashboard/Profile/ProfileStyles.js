import styled from 'styled-components';

export const AuxContainer = styled.div`
  position: relative;
  height: 90%;

  overflow-y: scroll;
  font-family: 'Inter', arial;

  padding-top: 10px;
  margin: 0 5% 5% 5%;
`;

export const ProfileHeaders = styled.div`
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

export const ProfileFormsContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const ProfileFormsData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
`;

export const ImageColumn = styled.div`
  img {
    height: 240px;
    width: 240px;
    border-radius: 100%;
    object-fit: cover;
    border: ${(props) => props.border};
  }
`;

export const ProfileFormsDataMobile = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  align-items: flex-start;
  justify-items: center;
  margin-bottom: 20px;

  img {
    height: 180px;
    width: 180px;
  }
`;

export const InputColumn = styled.div`
  font-size: 20px;
`;

export const NameField = styled.div`
  margin: 0 0 10px 0;
`;

export const EmailField = styled.div`
  margin: 15px 0 10px 0;
`;

export const ImageUpdateField = styled.div`
  font-size: 20px;
  margin: 15px 0 10px 0;
  div {
    margin: 5px 0 5px 0;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const ButtonContainerMobile = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const UpdateDataButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 240px;
  border-radius: 20px;
  background-color: ${(props) => (props.colors ? '#4bb543' : '#c7d6d5')};
  -webkit-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -4px 2px 16px 0px rgba(0, 0, 0, 0.75);
  font-size: 24px;
  margin-right: 25px;
`;
//
