import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { TasksAddMain, TasksAddMobile } from './TasksAdd';
import { TasksEditMain, TasksEditMobile } from './TasksEdit';
import { fetchItems, fetchUserTasks, UseMockedTasks } from './TasksFetch';
import { TasksInitialMain, TasksInitialMobile } from './TasksInitial';

export function TasksManager() {
  const userTheme = useTheme();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageState, setPageState] = useState('initial');
  const [userTasks, setUserTasks] = useState([]);

  const [taskToMod, setTaskToMod] = useState(null);

  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(async () => {
    //fetches user tasks
    if (!token) {
      setToken(localStorage.getItem('token'));
    }

    if (!localStorage.getItem('items')) {
      await fetchItems(token);
    }

    const response = await fetchUserTasks(token);
    //console.log(userTasks);
    setUserTasks([]);
    setUserTasks([...response]);
    //console.log(userTasks);
    if (pageState === 'loading') {
      setPageState('initial');
    }
  }, [pageState, taskToMod, fetchAgain]);

  useEffect(() => {
    //Handles width of screen
    useWindowWidth(setWindowWidth);
  }, []);

  useEffect(() => {
    if (taskToMod) {
      setPageState('edit');
    } else {
      setFetchAgain(!fetchAgain);
    }
  }, [taskToMod]);

  //console.log(pageState);

  if (windowWidth > 700) {
    //Render main version
    if (pageState === 'initial') {
      //Render all user tasks
      return (
        <TasksInitialMain
          userTasks={userTasks}
          setTaskToMod={setTaskToMod}
          setPageState={setPageState}
          windowWidth={windowWidth}
          setFetchAgain={setFetchAgain}
          fetchAgain={fetchAgain}
        />
      );
    }
    if (pageState === 'add') {
      //Render all user tasks
      return <TasksAddMain token={token} setPageState={setPageState} windowWidth={windowWidth} />;
    }
    if (pageState === 'edit') {
      //Render all user tasks
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
          <div>Something went wrong</div>
        </>
      );
    }
  } else {
    //Render mobile version
    if (pageState === 'initial') {
      //Render all user tasks
      return (
        <TasksInitialMobile
          userTasks={userTasks}
          setTaskToMod={setTaskToMod}
          setPageState={setPageState}
          windowWidth={windowWidth}
        />
      );
    }
    if (pageState === 'add') {
      //Render all user tasks
      return <TasksAddMobile setPageState={setPageState} />;
    }
    if (pageState === 'edit') {
      //Render all user tasks
      return <TasksEditMobile taskToMod={taskToMod} setTaskToMod={setTaskToMod} setPageState={setPageState} />;
    }
  }
}
