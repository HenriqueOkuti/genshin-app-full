import { useNavigate } from 'react-router-dom';
import { AuthContainer, Background, Logo } from '../../layouts/layouts';
import { OAuthLoader, Subtitle, Title } from './AuthenticationSharedStyles';
import qs from 'query-string';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { toast } from 'react-toastify';

export function OAuth() {
  const navigate = useNavigate();
  const { code } = qs.parseUrl(window.location.href).query;
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [update]);

  if (token) {
    navigate('/dashboard/home');
  }

  if (!code) {
    navigate('/login');
  }

  useEffect(async () => {
    if (code) {
      const response = await fetchUserInfo(code, setUpdate, update);
      if (!response) {
        const hasToken = localStorage.getItem('token');
        if (!hasToken) {
          toast('Login unsuccesful');
        }

        navigate('/login');
      }
    }
  }, []);

  //Handles width of screen
  useEffect(() => {
    useWindowWidth(setWindowWidth);
  }, []);

  return (
    <>
      <Background>
        <Logo />
      </Background>
      <AuthContainer>
        {windowWidth < 700 ? <Logo /> : <></>}
        <OAuthLoader>
          <p>Loading</p>
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="success" />
          </Box>
          <p>Just finishing a few touches</p>
        </OAuthLoader>
      </AuthContainer>
    </>
  );
}

async function fetchUserInfo(code, setUpdate, update) {
  const response = await axios.post('http://localhost:5000/auth/github', { githubCode: code }, {}).catch((err) => {
    return err.toJSON();
  });

  //console.log(response);

  if (response.message) {
    return false;
  }

  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
    setUpdate(!update);
  }
}
