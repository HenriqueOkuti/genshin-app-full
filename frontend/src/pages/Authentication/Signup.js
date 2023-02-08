import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { AuthContainer, Background, Logo } from '../../layouts/layouts';
import { signUpUser } from '../../services/services';
import {
  AuthenticationButtom,
  AuthenticationForms,
  AuthenticationFormsText,
  RedirectAuth,
  Subtitle,
  Title,
} from './AuthenticationSharedStyles';

export function SignUp() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

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
        <Title>Sign up</Title>
        <Subtitle>Enter your credentials to create your account</Subtitle>
        <div>
          <AuthenticationForms onSubmit={(event) => event.preventDefault()}>
            <div>
              <AuthenticationFormsText>Name</AuthenticationFormsText>
              <div>
                <TextField
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  fullWidth
                  disabled={sendingRequest ? true : false}
                />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Email</AuthenticationFormsText>
              <div>
                <TextField
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  fullWidth
                  disabled={sendingRequest ? true : false}
                />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Password</AuthenticationFormsText>
              <div>
                {' '}
                <TextField
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  fullWidth
                  disabled={sendingRequest ? true : false}
                  type="password"
                />
              </div>
            </div>
            <div>
              <AuthenticationFormsText>Confirm Password</AuthenticationFormsText>
              <div>
                {' '}
                <TextField
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                  fullWidth
                  disabled={sendingRequest ? true : false}
                  type="password"
                />
              </div>
            </div>
          </AuthenticationForms>
        </div>
        <AuthenticationButtom onClick={() => handleAuthentication(userData, navigate)}>
          <p>Register</p>
        </AuthenticationButtom>
        <RedirectAuth>
          Already a member? <p onClick={() => navigate('/login')}>Click here</p>
        </RedirectAuth>
      </AuthContainer>
    </>
  );
}

async function handleAuthentication(userData, navigate) {
  if (userData.name.length <= 2) {
    toast('invalid name');
    return;
  }
  if (userData.email.split('@').length !== 2) {
    toast('invalid email');
    return;
  }
  if (userData.password.length <= 6) {
    toast('password too short');
    return;
  }
  if (userData.password !== userData.confirmPassword) {
    toast('verify passwords');
    return;
  }

  const response = await signUpUser(userData);
  if (response.message === 'created with success') {
    toast('Registered with success');
    navigate('/login');
  }
  if (response.message === 'Request failed with status code 409') {
    toast('email already registered');
  }
}
