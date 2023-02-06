import styled from 'styled-components';

export const Title = styled.div`
  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 51px;
  display: flex;
  align-items: center;

  color: #000000;

  mix-blend-mode: normal;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  margin-top: 40px !important;

  @media (min-width: 700px) {
    margin-top: 90px !important;
  }
`;

export const Subtitle = styled.div`
  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;

  color: #929292;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  margin-top: 7px !important;
  margin-bottom: 5px !important;
`;

export const OAuthContainer = styled.div`
  width: 100%;

  > div {
    margin: 25px 0 0 0 !important;
  }
`;

export const OAuthButton = styled.div`
  width: 100%;
  height: 70px !important;

  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 10px;

  text-align: center;

  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.color};
    color: ${(props) => props.fcolor};
    border-radius: 10px;
    font-size: 21px;
  }
`;

export const OAuthLogo = styled.img`
  height: 50%;
  margin-right: 10px;
`;

export const DividerLogin = styled.div`
  margin-top: 25px !important;
  margin-bottom: 25px !important;
  display: grid;
  grid-template-columns: 1fr 0.25fr 1fr;
  justify-items: center;
  align-items: center;
  gap: 0px;
`;

export const DividerLineContainer = styled.div`
  width: 100% !important;

  > div {
    height: 10px !important;
  }
`;

export const DividerText = styled.div`
  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #929292;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const LineUpSide = styled.div`
  border-bottom: 1px solid #929292;
`;

export const LineDownSide = styled.div`
  border-top: 1px solid #929292;
`;

export const AuthenticationForms = styled.form`
  input {
    height: 45px;

    background: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
  }

  * > .MuiInput-underline:before {
    border-bottom: 1px solid #e0e0e0 !important;
    border-radius: 10px !important;
  }

  .MuiInput-underline:after {
    border-bottom: 1px solid #e0e0e0 !important;
    border-radius: 10px !important;
  }
`;

export const AuthenticationFormsText = styled.div`
  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #000000;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  margin-top: 15px !important;
  margin-bottom: 7px !important;
`;

export const AuthenticationButtom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 60px;

  background: #1f3265;
  border: 1px solid #e0e0e0;
  border-radius: 10px;

  margin-top: 20px !important;
  margin-bottom: 20px !important;

  p {
    font-family: 'Inter', arial;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const RedirectAuth = styled.div`
  font-family: 'Inter', arial;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;

  color: #929292;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  p {
    margin-left: 5px !important;
    color: #81b2c6;
  }
`;

export const OAuthLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-family: 'Inter', arial;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 19px;
    display: flex;
    align-items: center;

    color: #929292;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 25px 0 25px 0;
  }
`;
