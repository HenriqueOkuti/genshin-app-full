import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { IoAddCircleOutline } from 'react-icons/io5';

export function CustomMenuFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const userTheme = useTheme();
  const [palette, setPalette] = useState(userTheme.palette);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const CustomMenu = styled(Menu)(({ theme }) => ({
    color: '#ffffff',
    fontFamily: ['Inter', 'arial'],

    div: {
      borderRadius: '20px',
    },
    ul: {
      backgroundColor: palette ? palette.hex6 : 'inherit',
      borderRadius: '20px',
    },
  }));

  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: 'inherit',
    color: '#000000',
    fontFamily: ['Inter', 'arial'],
  }));

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: '#000000', fontSize: 29, margin: 0, padding: 0 }}
        onClick={handleClick}
      >
        <IoAddCircleOutline />
      </Button>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: element');
          }}
        >
          Element
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: weapon');
          }}
        >
          Weapon
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: constellation');
          }}
        >
          Constellation
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: level');
          }}
        >
          Char Level
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: A-Z');
          }}
        >
          A-Z
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: Z-A');
          }}
        >
          Z-A
        </CustomMenuItem>
        <CustomMenuItem
          onClick={() => {
            handleClose();
            console.log('filtering by: Friendship level');
          }}
        >
          Friendship
        </CustomMenuItem>
      </CustomMenu>
    </>
  );
}

export function CustomFilterMenu({ handleOpen, anchorEl, open }) {
  const userTheme = useTheme();
  const [theme, setTheme] = useState(userTheme);

  const CustomMenu = styled(Menu)(({ theme }) => ({
    color: '#ffffff',
    fontFamily: ['Inter', 'arial'],

    div: {
      borderRadius: '20px',
    },
    ul: {
      backgroundColor: theme ? theme.hex6 : 'inherit',
      borderRadius: '20px',
    },
  }));

  const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: 'inherit',
    color: '#000000',
    fontFamily: ['Inter', 'arial'],
  }));

  return (
    <CustomMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleOpen}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: element');
        }}
      >
        Element
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: weapon');
        }}
      >
        Weapon
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: constellation');
        }}
      >
        Constellation
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: level');
        }}
      >
        Char Level
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: A-Z');
        }}
      >
        A-Z
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: Z-A');
        }}
      >
        Z-A
      </CustomMenuItem>
      <CustomMenuItem
        onClick={() => {
          handleOpen();
          console.log('filtering by: Friendship level');
        }}
      >
        Friendship
      </CustomMenuItem>
    </CustomMenu>
  );
}
