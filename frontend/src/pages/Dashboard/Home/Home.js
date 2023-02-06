import { useEffect, useRef, useState } from 'react';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import {
  AuxContainer,
  Dropdown,
  DropdownAnchor,
  EmptyTasksContainer,
  HomeHeader,
  HomeHeaderButtons,
} from './HomeStyles';
import { AiOutlineMenu } from 'react-icons/ai';
import { RenderHomeTasks } from './HomeTasks';
import { fetchUserTasksToday } from './HomeFetch';

export function HomeManager() {
  const userTheme = useTheme();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dailyTasks, setDailyTasks] = useState([]);

  useEffect(async () => {
    let tokenAux;
    if (!token) {
      tokenAux = localStorage.getItem('token');
      setToken(tokenAux);
    }

    const response = await fetchUserTasksToday(token);

    setDailyTasks([]);
    setDailyTasks([...response]);
  }, []);

  useEffect(() => {
    //Handles width of screen
    useWindowWidth(setWindowWidth);
  }, []);

  if (windowWidth > 700) {
    //Render main version
    return (
      <>
        <AuxContainer>
          <HomeHeader>
            <div>What can you do today?</div>
            <HomeHeaderButtons>
              <div>
                <FilterMenuHome />
              </div>
            </HomeHeaderButtons>
          </HomeHeader>
          {dailyTasks[0] ? <RenderDailyTasks tasks={dailyTasks} windowWidth={windowWidth} /> : <EmptyTasks />}
        </AuxContainer>
      </>
    );
  } else {
    //Render mobile version
    return (
      <>
        <AuxContainer>
          <HomeHeader>
            <div>What can you do today?</div>
            <HomeHeaderButtons>
              <div>
                <FilterMenuHome />
              </div>
            </HomeHeaderButtons>
          </HomeHeader>
          {dailyTasks[0] ? <RenderDailyTasks tasks={dailyTasks} windowWidth={windowWidth} /> : <EmptyTasks />}
        </AuxContainer>
      </>
    );
  }
}

export function FilterMenuHome() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filterOptions = [
    {
      name: 'Filter option 1',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Filter option 2',
      function: () => {
        console.log('filter');
      },
    },
    {
      name: 'Filter option 3',
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

function EmptyTasks() {
  return (
    <>
      <EmptyTasksContainer>
        <div>No tasks scheduled for today</div>
      </EmptyTasksContainer>
    </>
  );
}

function RenderDailyTasks({ tasks, windowWidth }) {
  return tasks.map((task) => {
    return (
      <>
        <RenderHomeTasks task={task} windowWidth={windowWidth} />
      </>
    );
  });
}
