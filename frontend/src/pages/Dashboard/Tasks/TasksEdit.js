import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteTask, updateTask } from '../../../services/services';
import { RenderEditTaskItems } from './TasksEditItems';
import { HandleRedirectButton } from './TasksRedirect';
import {
  AuxContainer,
  DeleteButton,
  EditButtonsContainer,
  ImageField,
  InputColumn,
  NameField,
  TaskEditInfoContainer,
  TaskEditItemsContainer,
  TaskInfoImage,
  TasksHeader,
  TasksHeaderButtons,
  UpdateButton,
} from './TasksStyles';

export function TasksEditMain({
  setPageState,
  setTaskToMod,
  taskToMod,
  windowWidth,
  token,
  fetchAgain,
  setFetchAgain,
}) {
  const [newTaskInfo, setNewTaskInfo] = useState({ ...taskToMod });
  const [newImage, setNewImage] = useState('');
  const [validImage, setValidImage] = useState('original');
  const [validData, setValidData] = useState(false);

  //console.log(newTaskInfo);
  //console.log(windowWidth);

  useEffect(async () => {
    if (newImage === '') {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: taskToMod.image });
    }

    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if (newImage && !newImage.match(urlRegex)) {
      setValidImage('invalid');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
    }

    if (newImage !== taskToMod.image && newImage) {
      const imageIsValid = await verifyURL(newImage);
      if (imageIsValid) {
        setValidImage('valid');
        setNewTaskInfo({ ...newTaskInfo, image: newImage });
      }
    } else {
      setValidImage('original');
      setNewTaskInfo({ ...newTaskInfo, image: taskToMod.image });
    }
  }, [newImage]);

  useEffect(() => {
    //verify if data is valid
    setValidData(verifyIfDataIsValid(newTaskInfo));
  }, [newTaskInfo]);

  const alterButtomsToColumn = windowWidth < 990 ? true : false;

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Edit task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'edit'} setPageState={setPageState} setTaskToMod={setTaskToMod} />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <TaskEditItemsContainer>
          <TaskEditInfoContainer>
            <InputColumn>
              <NameField>Name:</NameField>
              <TextField
                onChange={(e) => setNewTaskInfo({ ...newTaskInfo, name: e.target.value })}
                fullWidth
                key={taskToMod.name}
                defaultValue={taskToMod.name}
                disabled={false}
                id="outlined-required"
              />
              <ImageField>Image:</ImageField>
              <TextField
                onChange={(e) => setNewImage(e.target.value)}
                fullWidth
                disabled={false}
                key={taskToMod.image}
                defaultValue={taskToMod.image}
                id="outlined-required"
              />
            </InputColumn>
            <TaskInfoImage>
              <div>
                <img src={newTaskInfo.image} alt={newTaskInfo.name} />
              </div>
            </TaskInfoImage>
          </TaskEditInfoContainer>
          <RenderEditTaskItems
            newTaskInfo={newTaskInfo}
            setNewTaskInfo={setNewTaskInfo}
            items={newTaskInfo.items}
            taskId={newTaskInfo.id}
          />
          <EditButtonsContainer switchToColumn={alterButtomsToColumn}>
            <DeleteButton
              onClick={() => {
                const response = handleDelete(token, taskToMod);
                if (response) {
                  setTaskToMod(null);
                  localStorage.removeItem('items');
                  setPageState('initial');
                }
              }}
            >
              Delete
            </DeleteButton>
            <UpdateButton
              valid={validData}
              onClick={() => {
                if (validData) {
                  const response = handleUpdate(token, taskToMod, newTaskInfo);
                  if (response) {
                    setTaskToMod(null);
                    localStorage.removeItem('items');
                    setFetchAgain(!fetchAgain);
                    setPageState('initial');
                  }
                }
              }}
            >
              Update
            </UpdateButton>
          </EditButtonsContainer>
        </TaskEditItemsContainer>
      </AuxContainer>
    </>
  );
}

export function TasksEditMobile({ setPageState, setTaskToMod, taskToMod }) {
  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Edit task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'edit'} setPageState={setPageState} setTaskToMod={setTaskToMod} />
            </div>
          </TasksHeaderButtons>
        </TasksHeader>
        <div>Soon™</div>
      </AuxContainer>
    </>
  );
}

async function handleDelete(token, task) {
  const response = await deleteTask(token, task.id);

  if (response === 'OK') {
    toast('Deleted task');
    return true;
  } else {
    return false;
  }
}

async function handleUpdate(token, oldTask, newTask) {
  const fixedItems = [];
  let taskId = 0;
  for (let i = 0; i < newTask.items.length; i++) {
    const item = newTask.items[i];
    taskId = item.taskId;

    fixedItems.push({
      id: item.id,
      weeklyBossMat: item.weeklyBossMat,
      bossMat: item.bossMat,
      dungeonMat: item.dungeonMat,
      enemyMat: item.enemyMat,
      localSpecialty: item.localSpecialty,
      taskId: newTask.id,
      itemId: item.itemId,
      quantity: item.quantity,
    });
  }

  const body = {
    userId: newTask.userId,
    name: newTask.name,
    taskId: taskId,
    createdAt: JSON.parse(newTask.createdAt),
    updatedAt: JSON.parse(newTask.updatedAt),
    image: newTask.image,
    items: fixedItems,
  };

  const response = await updateTask(token, body);
  if (response === 'OK') {
    toast('Updated task');
    return true;
  }
  return false;
  //
  //
}

async function verifyURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

function verifyIfDataIsValid(taskData) {
  if (!taskData.name || taskData.name === '') {
    return false;
  }
  if (!taskData.image || taskData.image === '') {
    return false;
  }
  if (taskData.items.length === 0) {
    return false;
  }
  for (let i = 0; i < taskData.items.length; i++) {
    if (taskData.items[i].quantity < 1 || taskData.items[i].quantity >= 9999) {
      return false;
    }
  }

  return true;
}
