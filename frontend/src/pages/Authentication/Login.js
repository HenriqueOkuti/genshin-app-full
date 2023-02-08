import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContainer, Background, Logo } from '../../layouts/layouts';
import qs from 'query-string';
import {
  AuthenticationButtom,
  AuthenticationForms,
  AuthenticationFormsText,
  DividerLineContainer,
  DividerLogin,
  DividerText,
  LineDownSide,
  LineUpSide,
  OAuthButton,
  OAuthContainer,
  OAuthLogo,
  RedirectAuth,
  Subtitle,
  Title,
} from './AuthenticationSharedStyles';
import { loginUser } from '../../services/Authentication/authenticationAPI';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { toast } from 'react-toastify';
import GitHubMark from '../../assets/images/login/github-mark-white.svg';
import GoogleLogo from '../../assets/images/login/Google__G__Logo.svg';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const googleApp = initializeApp(firebaseConfig);
const auth = getAuth(googleApp);
const provider = new GoogleAuthProvider();

export function Login() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      setToken(tokenStorage);
    }
  }, []);

  if (token) {
    navigate('/dashboard/home');
  }

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
        <Title>Login</Title>
        <Subtitle>Enter your credentials to access your account</Subtitle>
        <OAuthContainer>
          <OAuthButton onClick={() => handleLoginGoogle(navigate)}>
            <div>
              <OAuthLogo src={GoogleLogo} alt="Google Logo" />
              <p>Sign in with Google</p>
            </div>
          </OAuthButton>
          <OAuthButton color={'#171515'} fcolor={'#ffffff'} onClick={() => handleLoginGithub()}>
            <div>
              <OAuthLogo src={GitHubMark} alt="Github Mark" />
              <p>Sign in with GitHub</p>
            </div>
          </OAuthButton>
        </OAuthContainer>
        <DividerLogin>
          <DividerLineContainer>
            <LineUpSide></LineUpSide>
            <LineDownSide></LineDownSide>
          </DividerLineContainer>
          <DividerText>or</DividerText>
          <DividerLineContainer>
            <LineUpSide></LineUpSide>
            <LineDownSide></LineDownSide>
          </DividerLineContainer>
        </DividerLogin>
        <LoginForms navigate={navigate} />
        <RedirectAuth>
          Not a member? <p onClick={() => navigate('/signup')}>Click here</p>
        </RedirectAuth>
      </AuthContainer>
    </>
  );
}

function handleLoginGoogle(navigate) {
  console.log('Google Auth');

  signInWithPopup(auth, provider)
    .then((data) => {
      const user = data.user;

      const body = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };

      navigate('/OAuth', { state: body });
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleLoginGithub() {
  const GITHUB_URL = 'https://github.com/login/oauth/authorize';
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

  const params = {
    response_type: 'code',
    scope: 'user',
    client_id: clientId,
    redirect_uri: redirectUrl,
  };

  const queryStrings = qs.stringify(params);
  const authUrl = `${GITHUB_URL}?${queryStrings}`;
  window.location.href = authUrl;
}

function LoginForms({ navigate }) {
  const [validInput, setValidInput] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  return (
    <div>
      <AuthenticationForms onSubmit={(event) => event.preventDefault()}>
        <div>
          <AuthenticationFormsText>Email</AuthenticationFormsText>
          <div>
            {validInput ? (
              <TextField
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                fullWidth
                disabled={sendingRequest ? true : false}
                id="outlined-required"
              />
            ) : (
              <TextField fullWidth error id="outlined-disabled" helperText="Invalid credential" />
            )}
          </div>
        </div>
        <div>
          <AuthenticationFormsText>Password</AuthenticationFormsText>
          <div>
            {validInput ? (
              <TextField
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                fullWidth
                disabled={sendingRequest ? true : false}
                id="outlined-password-input"
                type="password"
              />
            ) : (
              <TextField error fullWidth id="outlined-error-helper-text" helperText="Invalid credential" />
            )}
          </div>
        </div>
        <AuthenticationButtom onClick={() => handleAuthentication(userData, navigate)}>
          <p>Login</p>
        </AuthenticationButtom>
      </AuthenticationForms>
    </div>
  );
}

async function handleAuthentication(userData, navigate) {
  if (userData.email.split('@').length !== 2) {
    toast('invalid email');
    return;
  }
  if (userData.password.length <= 6) {
    toast('password too short');
    return;
  }

  const response = await loginUser(userData);
  if (response.token) {
    localStorage.setItem('token', response.token);
    toast('Successful login');
    navigate('/dashboard/home');
  }
  if (response.message === 'Request failed with status code 401') {
    toast('Verify your credentials');
  }
  if (response.message === 'Request failed with status code 400') {
    toast('Verify your credentials');
  }
}
