import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { TaskContainer, TaskDates, TaskDays, TaskImage, TaskInfoContainer, TaskTitle } from '../Tasks/TasksStyles';

export function RenderHomeTasks({ task, windowWidth }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const navigate = useNavigate();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [daysText, setDaysText] = useState('Loading...');

  const createdAt = dayjs(JSON.parse(task.createdAt)).format('MM/DD/YY');
  const updatedAt = dayjs(JSON.parse(task.updatedAt)).format('MM/DD/YY');

  useEffect(() => {
    setDaysText(task.daysInfo.text);
  }, []);

  const columns = windowWidth > 1130 ? '1fr 1fr' : '1fr';

  return (
    <>
      <TaskContainer
        onClick={() => {
          //redirect to this task
          //store taskId on localStorage and navigate to /tasks
        }}
        palette={userTheme.palette}
      >
        <TaskImage>
          <img src={task.image} alt={task.name} />
        </TaskImage>
        <TaskInfoContainer>
          <TaskTitle>{task.name}</TaskTitle>
          <TaskDates columns={columns}>
            <div>
              <p>Created:</p> <p>{createdAt}</p>
            </div>
            <div>
              <p>Updated:</p> <p>{updatedAt}</p>
            </div>
          </TaskDates>
          <TaskDays>
            <div>Days: {daysText}</div>
          </TaskDays>
        </TaskInfoContainer>
      </TaskContainer>
    </>
  );
}
