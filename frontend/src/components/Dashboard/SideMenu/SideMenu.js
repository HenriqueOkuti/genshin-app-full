import { useState } from 'react';
import {
  ButtonsContainer,
  ExitContainer,
  OptionsContainer,
  UserContainer,
  ThemesContainer,
  UsernameContainer,
  ButtonText,
} from './SideMenuStyles';
import { Avatar, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { DefaultThemes } from '../../../assets/themes/Themes';

export function SideMenu({ update, setUpdate, userData }) {
  const navigate = useNavigate();
  const userTheme = useTheme();
  const modifyTheme = useSetTheme();

  const [theme, setTheme] = useState(userTheme);

  return (
    <>
      <OptionsContainer>
        <UserContainer>
          <Avatar alt={userData.name} src={userData.image} onClick={() => navigate('/dashboard/profile')}></Avatar>
          <UsernameContainer onClick={() => navigate('/dashboard/profile')}>{userData.name}</UsernameContainer>
        </UserContainer>
        <ButtonsContainer>
          <Button onClick={() => navigate('/dashboard/home')}>
            <ButtonText>Home</ButtonText>
          </Button>
          <Button onClick={() => navigate('/dashboard/characters')}>
            <ButtonText>Characters</ButtonText>
          </Button>
          {/* <Button onClick={() => navigate('/dashboard/backpack')}>
            <ButtonText>Backpack</ButtonText>
          </Button> */}
          <Button onClick={() => navigate('/dashboard/tasks')}>
            <ButtonText>Task List</ButtonText>
          </Button>
        </ButtonsContainer>
        <ThemesContainer onClick={() => alterTheme(theme, modifyTheme, setTheme, setUpdate, update)}>
          <Avatar alt={theme.name} src={theme.image} />
        </ThemesContainer>
        <ExitContainer>
          <Button onClick={() => logout(navigate)}>
            <p>Exit</p>
          </Button>
        </ExitContainer>
      </OptionsContainer>
    </>
  );
}

async function alterTheme(theme, modifyTheme, setTheme, setUpdate, update) {
  const len = DefaultThemes.length;
  const newIndex = theme.id >= len ? 0 : theme.id;
  const newTheme = DefaultThemes[newIndex];

  localStorage.setItem('theme', JSON.stringify(newTheme));
  modifyTheme(newTheme);
  setTheme(newTheme);
  setUpdate(!update);

  return;
}

function logout(navigate) {
  localStorage.removeItem('token');
  localStorage.removeItem('items');
  navigate('/login');
}
