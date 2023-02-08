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
  TasksContainer,
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
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState({ name: 'null' });

  const filterTypeDictionary = {
    null: '',
    az: '(A-Z)',
    za: '(Z-A)',
    created: '(Created at)',
    updated: '(Updated at)',
  };

  useEffect(async () => {
    let tokenAux;
    if (!token) {
      tokenAux = localStorage.getItem('token');
      setToken(tokenAux);
    }

    const response = await fetchUserTasksToday(token);

    setDailyTasks([]);
    setDailyTasks([...response]);

    setFilteredTasks([]);
    setFilteredTasks([...response]);
  }, []);

  useEffect(() => {
    useWindowWidth(setWindowWidth);
  }, []);

  if (windowWidth > 700) {
    return (
      <>
        <AuxContainer>
          <HomeHeader>
            <div>What can you do today? {filterTypeDictionary[filterType.name]}</div>
            <HomeHeaderButtons>
              <div>
                <FilterMenuHome
                  filterType={filterType}
                  setFilterType={setFilterType}
                  dailyTasks={dailyTasks}
                  setDailyTasks={setDailyTasks}
                  setFilteredTasks={setFilteredTasks}
                />
              </div>
            </HomeHeaderButtons>
          </HomeHeader>
          <TasksContainer>
            {dailyTasks[0] ? (
              <RenderDailyTasks
                tasks={filterType.name === 'null' ? dailyTasks : filteredTasks}
                windowWidth={windowWidth}
              />
            ) : (
              <EmptyTasks />
            )}
          </TasksContainer>
        </AuxContainer>
      </>
    );
  } else {
    return (
      <>
        <AuxContainer>
          <HomeHeader>
            <div>What can you do today? {filterTypeDictionary[filterType.name]}</div>
            <HomeHeaderButtons>
              <div>
                <FilterMenuHome
                  filterType={filterType}
                  setFilterType={setFilterType}
                  dailyTasks={dailyTasks}
                  setDailyTasks={setDailyTasks}
                  setFilteredTasks={setFilteredTasks}
                />
              </div>
            </HomeHeaderButtons>
          </HomeHeader>
          <TasksContainer>
            {dailyTasks[0] ? (
              <RenderDailyTasks
                tasks={filterType.name === 'null' ? dailyTasks : filteredTasks}
                windowWidth={windowWidth}
              />
            ) : (
              <EmptyTasks />
            )}
          </TasksContainer>
        </AuxContainer>
      </>
    );
  }
}

export function FilterMenuHome({ filterType, setFilterType, dailyTasks, setDailyTasks, setFilteredTasks }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  for (let i = 0; i < dailyTasks.length; i++) {
    const creation = dailyTasks[0]?.createdAt ? dailyTasks[0].createdAt : false;
    const updated = dailyTasks[0]?.updatedAt ? dailyTasks[0].updatedAt : false;

    if (creation && updated) {
      dailyTasks[i].createdNumber = Date.parse(JSON.parse(creation));
      dailyTasks[i].updatedNumber = Date.parse(JSON.parse(updated));
    }
  }

  const filterOptions = [
    {
      name: 'A-Z',
      function: () => {
        if (filterType.name === 'az') {
          setFilteredTasks([]);
          setFilterType({ name: 'null' });
        } else {
          setFilteredTasks([...dailyTasks].sort((a, b) => a.name.localeCompare(b.name)));
          setFilterType({ name: 'az' });
        }
      },
    },
    {
      name: 'Z-A',
      function: () => {
        if (filterType.name === 'za') {
          setFilteredTasks([]);
          setFilterType({ name: 'null' });
        } else {
          setFilteredTasks([...dailyTasks].sort((a, b) => b.name.localeCompare(a.name)));
          setFilterType({ name: 'za' });
        }
      },
    },
    {
      name: 'Creation',
      function: () => {
        if (filterType.name === 'created') {
          setFilteredTasks([]);
          setFilterType({ name: 'null' });
        } else {
          setFilteredTasks([...dailyTasks].sort((a, b) => a.createdNumber - b.createdNumber));
          setFilterType({ name: 'created' });
        }
      },
    },
    {
      name: 'Update',
      function: () => {
        if (filterType.name === 'updated') {
          setFilteredTasks([]);
          setFilterType({ name: 'null' });
        } else {
          setFilteredTasks([...dailyTasks].sort((a, b) => a.updatedNumber - b.updatedNumber));
          setFilterType({ name: 'updated' });
        }
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
        {dailyTasks.length > 0 ? (
          <>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
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
