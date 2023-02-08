import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { TasksAddMain, TasksAddMobile } from './TasksAdd';
import { TasksEditMain, TasksEditMobile } from './TasksEdit';
import { fetchItems, fetchUserTasks } from './TasksFetch';
import { TasksInitialMain, TasksInitialMobile } from './TasksInitial';

export function TasksManager() {
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageState, setPageState] = useState('initial');
  const [userTasks, setUserTasks] = useState([]);

  const [taskToMod, setTaskToMod] = useState(null);

  const [fetchAgain, setFetchAgain] = useState(false);

  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterType, setFilterType] = useState({ name: 'null' });

  useEffect(() => {
    const taskLocalStorage = JSON.parse(localStorage.getItem('task'));
    if (taskLocalStorage) {
      setTaskToMod(taskLocalStorage);
      localStorage.removeItem('task');
    }

    useWindowWidth(setWindowWidth);
  }, []);

  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem('token'));
    }

    if (!localStorage.getItem('items')) {
      await fetchItems(token);
    }

    const response = await fetchUserTasks(token);
    setUserTasks([]);
    setUserTasks([...response]);
    if (pageState === 'loading') {
      setPageState('initial');
    }

    if (taskToMod && (pageState === 'loading' || pageState === 'initial')) {
      setPageState('edit-loading');
    }

    if (taskToMod && userTasks[0]) {
      setPageState('edit');
    }
  }, [pageState, taskToMod, fetchAgain]);

  useEffect(() => {
    if (taskToMod && userTasks[0]) {
      setPageState('edit');
    } else {
      setFetchAgain(!fetchAgain);
    }
  }, [taskToMod]);

  if (windowWidth > 700) {
    if (pageState === 'initial') {
      return (
        <TasksInitialMain
          filteredTasks={filteredTasks}
          userTasks={userTasks}
          setTaskToMod={setTaskToMod}
          setPageState={setPageState}
          windowWidth={windowWidth}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
          filterType={filterType}
          setFilterType={setFilterType}
          setFilteredTasks={setFilteredTasks}
        />
      );
    }
    if (pageState === 'add') {
      return <TasksAddMain token={token} setPageState={setPageState} windowWidth={windowWidth} />;
    }
    if (pageState === 'edit') {
      return (
        <TasksEditMain
          token={token}
          taskToMod={taskToMod}
          setTaskToMod={setTaskToMod}
          setPageState={setPageState}
          windowWidth={windowWidth}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      );
    } else {
      return (
        <>
          <div>Loading content</div>
        </>
      );
    }
  } else {
    if (pageState === 'initial') {
      return (
        <TasksInitialMobile
          filteredTasks={filteredTasks}
          userTasks={userTasks}
          setTaskToMod={setTaskToMod}
          setPageState={setPageState}
          windowWidth={windowWidth}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
          filterType={filterType}
          setFilterType={setFilterType}
          setFilteredTasks={setFilteredTasks}
        />
      );
    }
    if (pageState === 'add') {
      return <TasksAddMobile setPageState={setPageState} />;
    }
    if (pageState === 'edit') {
      return <TasksEditMobile taskToMod={taskToMod} setTaskToMod={setTaskToMod} setPageState={setPageState} />;
    } else {
      return (
        <>
          <div>Loading contentg</div>
        </>
      );
    }
  }
}
