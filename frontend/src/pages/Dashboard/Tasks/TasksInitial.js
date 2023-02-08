import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useTheme, useSetTheme } from '../../../hooks/useTheme';
import { HandleRedirectButton } from './TasksRedirect';
import { RenderTasks } from './TasksRenderList';
import { AuxContainer, Dropdown, DropdownAnchor, TasksHeader, TasksHeaderButtons, TasksList } from './TasksStyles';

export function TasksInitialMain({
  filteredTasks,
  userTasks,
  setTaskToMod,
  setPageState,
  windowWidth,
  setFetchAgain,
  fetchAgain,
  filterType,
  setFilterType,
  setFilteredTasks,
}) {
  const filterDict = {
    null: '',
    az: '(A-Z)',
    za: '(Z-A)',
    created: '(Created at)',
    updated: '(Updated at)',
    date: '(Day)',
  };

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div onClick={() => setFetchAgain(!fetchAgain)}>User tasks {filterDict[filterType.name]}</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuInitial
                filterType={filterType}
                setFilterType={setFilterType}
                userTasks={userTasks}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
              />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <TasksList>
          {(filteredTasks[0] ? filteredTasks : userTasks).map((task, index) => (
            <RenderTasks
              key={index}
              task={task}
              setTaskToMod={setTaskToMod}
              setPageState={setPageState}
              windowWidth={windowWidth}
            />
          ))}
        </TasksList>
      </AuxContainer>
    </>
  );
}

export function TasksInitialMobile({
  filteredTasks,
  userTasks,
  setTaskToMod,
  setPageState,
  windowWidth,
  setFetchAgain,
  fetchAgain,
  filterType,
  setFilterType,
  setFilteredTasks,
}) {
  const filterDict = {
    null: '',
    az: '(A-Z)',
    za: '(Z-A)',
    created: '(Created at)',
    updated: '(Updated at)',
    date: '(Day)',
  };

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div onClick={() => setFetchAgain(!fetchAgain)}>User tasks {filterDict[filterType.name]}</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuInitial
                filterType={filterType}
                setFilterType={setFilterType}
                userTasks={userTasks}
                filteredTasks={filteredTasks}
                setFilteredTasks={setFilteredTasks}
              />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <TasksList>
          {(filteredTasks[0] ? filteredTasks : userTasks).map((task, index) => (
            <RenderTasks
              key={index}
              task={task}
              setTaskToMod={setTaskToMod}
              setPageState={setPageState}
              windowWidth={windowWidth}
            />
          ))}
        </TasksList>
      </AuxContainer>
    </>
  );
}

export function FilterMenuInitial({ filterType, setFilterType, userTasks, filteredTasks, setFilteredTasks }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  for (let i = 0; i < userTasks.length; i++) {
    const creation = userTasks[0]?.createdAt ? userTasks[0].createdAt : false;
    const updated = userTasks[0]?.updatedAt ? userTasks[0].updatedAt : false;

    if (creation && updated) {
      userTasks[i].createdNumber = Date.parse(JSON.parse(creation));
      userTasks[i].updatedNumber = Date.parse(JSON.parse(updated));
    }
  }

  const filterOptions = [
    {
      name: 'A-Z',
      function: () => {
        if (filterType.name === 'az') {
          setFilterType({ name: 'null' });
          setFilteredTasks([]);
        } else {
          setFilterType({ name: 'az' });
          setFilteredTasks([...[...userTasks].sort((a, b) => a.name.localeCompare(b.name))]);
        }
      },
    },
    {
      name: 'Z-A',
      function: () => {
        if (filterType.name === 'za') {
          setFilterType({ name: 'null' });
          setFilteredTasks([]);
        } else {
          setFilterType({ name: 'za' });
          setFilteredTasks([...[...userTasks].sort((a, b) => b.name.localeCompare(a.name))]);
        }
      },
    },
    {
      name: 'Created',
      function: () => {
        if (filterType.name === 'created') {
          setFilterType({ name: 'null' });
          setFilteredTasks([]);
        } else {
          setFilterType({ name: 'created' });
          setFilteredTasks([...[...userTasks].sort((a, b) => a.createdNumber - b.createdNumber)]);
        }
      },
    },
    {
      name: 'Updated',
      function: () => {
        if (filterType.name === 'updated') {
          setFilterType({ name: 'null' });
          setFilteredTasks([]);
        } else {
          setFilterType({ name: 'updated' });
          setFilteredTasks([...[...userTasks].sort((a, b) => a.updatedNumber - b.updatedNumber)]);
        }
      },
    },
    {
      name: 'Day',
      function: () => {
        if (filterType.name === 'day') {
          setFilterType({ name: 'null' });
          setFilteredTasks([]);
        } else {
          setFilterType({ name: 'day' });
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
