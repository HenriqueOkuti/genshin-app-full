import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { Background } from '../layouts/layouts';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

export function LandingPage() {
  const [token, setToken] = useState(null);
  const hasToken = useContext(UserContext).userToken;
  const navigate = useNavigate();

  useEffect(() => {
    if (hasToken) {
      setToken(hasToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/dashboard/home');
    } else {
      navigate('/login');
    }
  }, [token]);

  return (
    <>
      <Background>
        <LoaderContainer>
          <Loader
            height={120}
            width={120}
            color="#8C6CC4"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#8C6CC4"
            strokeWidth={2}
            strokeWidthSecondary={2}
            type="Oval"
          />
        </LoaderContainer>
      </Background>
    </>
  );
}

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`;
