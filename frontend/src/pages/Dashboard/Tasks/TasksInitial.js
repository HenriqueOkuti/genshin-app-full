import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useTheme, useSetTheme } from '../../../hooks/useTheme';
import { HandleRedirectButton } from './TasksRedirect';
import { RenderTasks } from './TasksRenderList';
import { AuxContainer, Dropdown, DropdownAnchor, TasksHeader, TasksHeaderButtons, TasksList } from './TasksStyles';

export function TasksInitialMain({ userTasks, setTaskToMod, setPageState, windowWidth, setFetchAgain, fetchAgain }) {
  const [filterType, setFilterType] = useState({ name: null });
  const [updatedFilter, setUpdatedFilter] = useState(false);
  const [suppText, setSuppText] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([...userTasks]);

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div onClick={() => setFetchAgain(!fetchAgain)}>User tasks</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            {/* <div>
              <FilterMenuInitial />
            </div> */}
          </TasksHeaderButtons>
        </TasksHeader>
        <TasksList>
          {userTasks.map((task, index) => (
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

export function TasksInitialMobile({ userTasks, setTaskToMod, setPageState, windowWidth }) {
  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>User tasks mobile</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuInitial />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <div>Soon™</div>
      </AuxContainer>
    </>
  );
}

export function FilterMenuInitial() {
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
