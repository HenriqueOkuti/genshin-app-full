import styled from 'styled-components';

export function Logo() {
  return (
    <>
      <LogoContainer>
        <div>
          <div>Genshin Task Manager</div>
          <div>
            <p>Less time planning. More time playing.</p>
          </div>
        </div>
      </LogoContainer>
    </>
  );
}

const LogoContainer = styled.div`
  margin-left: 50%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #ffffff;

  @media (min-width: 990px) {
    > div,
    p {
      padding: 15px;
      border-radius: 15px;
    }
  }

  @media (max-width: 990px) {
    p {
      display: none;
    }

    > div {
      max-width: 280px;
      padding: 15px;
      border-radius: 15px;
    }
  }

  @media (max-width: 923px) {
    > div {
      max-width: 280px;
      padding: 15px;
      border-radius: 15px;
    }
  }

  @media (max-width: 700px) {
    margin: 0;
    padding: 0;
    height: 200px;
    color: #000000;
    div {
      background-color: #ffffff !important;
      padding: 0;
      margin: 0;
    }
  }

  div {
    font-family: 'Iceberg', arial;
    font-size: 48px;
    text-align: center;
    text-decoration: underline;
    background-color: #1f3265;
  }

  p {
    margin-top: 20px;
    font-family: 'Inter', arial;
    font-style: italic;
    font-size: 17px;
    text-align: center;
    background-color: #1f3265;
    padding-bottom: 10px;
  }
`;
