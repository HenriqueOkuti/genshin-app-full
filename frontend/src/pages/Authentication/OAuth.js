import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContainer, Background, Logo } from '../../layouts/layouts';
import { OAuthLoader } from './AuthenticationSharedStyles';
import qs from 'query-string';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { toast } from 'react-toastify';
import { loginGoogle } from '../../services/services';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

export function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { code } = qs.parseUrl(window.location.href).query;
  const [token, setToken] = useState(null);
  const [update, setUpdate] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const googleData = location.state;

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [update]);

  if (token) {
    useContext(UserContext).setUserToken(token);
    navigate('/');
  }

  if (!code && !googleData) {
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

    if (googleData) {
      const response = await loginGoogle(googleData);
      const token = response.token;
      if (token) {
        localStorage.setItem('token', token);
        setUpdate(!update);
      } else {
        toast('Login unsuccesful');
        navigate('/login');
      }
    }
  }, []);

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
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const response = await axios.post(`${baseURL}/auth/github`, { githubCode: code }, {}).catch((err) => {
    return err.toJSON();
  });

  if (response.message) {
    return false;
  }

  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
    setUpdate(!update);
  }
}
