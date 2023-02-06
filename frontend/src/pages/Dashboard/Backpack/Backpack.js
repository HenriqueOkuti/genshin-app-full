//https://media.tenor.com/c4HEl2BKww4AAAAC/paimon-genshin-impact.gif

import { useEffect, useRef, useState } from 'react';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { AuxContainer, Dropdown, DropdownAnchor, BackpackHeader, BackpackHeaderButtons } from './BackpackStyles';
import { AiOutlineMenu } from 'react-icons/ai';
import { NotImplementedContainer } from './NotImplementedStyles';

export function BackpackManager() {
  const userTheme = useTheme();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(() => {
    //Handles width of screen
    useWindowWidth(setWindowWidth);
  }, []);

  if (windowWidth > 700) {
    //Render main version
    return (
      <>
        <AuxContainer>
          <BackpackHeader>
            <div>Backpack</div>
            <BackpackHeaderButtons>
              <div>
                <FilterMenuBackpack />
              </div>
            </BackpackHeaderButtons>
          </BackpackHeader>
          <NotImplemented />
        </AuxContainer>
      </>
    );
  } else {
    //Render mobile version
    return (
      <>
        <AuxContainer>
          <BackpackHeader>
            <div>Backpack</div>
            <BackpackHeaderButtons>
              <div>
                <FilterMenuBackpack />
              </div>
            </BackpackHeaderButtons>
          </BackpackHeader>
          <NotImplemented />
        </AuxContainer>
      </>
    );
  }
}

export function FilterMenuBackpack() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filterOptions = [
    {
      name: 'Dont look here',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Feature not implemented yet',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Click away',
      function: () => {
        console.log('filter');
      },
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, open]);

  return (
    <>
      <div>
        <div onClick={handleOpen}>
          <AiOutlineMenu />
        </div>
        {open ? (
          <DropdownAnchor ref={wrapperRef}>
            <FilterMenuDropdown handleOpen={handleOpen} filterOptions={filterOptions} />
          </DropdownAnchor>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );

  //
}

export function FilterMenuDropdown({ filterOptions }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];

  return (
    <>
      <Dropdown theme={userTheme.palette}>
        {filterOptions.map((filter, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //handleOpen();
                filter.function();
              }}
            >
              <p>{filter.name}</p>
            </div>
          );
        })}
      </Dropdown>
    </>
  );
}

function NotImplemented() {
  return (
    <NotImplementedContainer>
      <div>Not implemented yet</div>
      <img src="https://media.tenor.com/c4HEl2BKww4AAAAC/paimon-genshin-impact.gif" alt="missing" />
      <div>Come back later</div>
    </NotImplementedContainer>
  );
}
