import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useToken from '../../../hooks/useToken';
import { RenderEditTaskItems } from './TasksEditItems';
import { createNewTask } from './TasksFetch';
import { HandleRedirectButton } from './TasksRedirect';
import {
  AddButtomContainer,
  AuxContainer,
  CreateButton,
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

export function TasksAddMain({ setPageState, windowWidth, token }) {
  const [ableToSend, setAbleToSend] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [validImage, setValidImage] = useState('original');
  const [newTaskInfo, setNewTaskInfo] = useState({
    name: '',
    image: 'https://ih1.redbubble.net/image.2409410541.3111/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg',
    items: [],
  });

  //console.log(newTaskInfo);

  useEffect(async () => {
    if (newImage === '') {
      setValidImage('original');
      setNewTaskInfo({
        ...newTaskInfo,
        image: 'https://ih1.redbubble.net/image.2409410541.3111/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg',
      });
    }

    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

    if (newImage && !newImage.match(urlRegex)) {
      setValidImage('invalid');
      setNewTaskInfo({ ...newTaskInfo, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
    }

    if (newImage !== '' && newImage) {
      const imageIsValid = await verifyURL(newImage);
      if (imageIsValid) {
        setValidImage('valid');
        setNewTaskInfo({ ...newTaskInfo, image: newImage });
      }
    } else {
      setValidImage('original');
      setNewTaskInfo({
        ...newTaskInfo,
        image: 'https://ih1.redbubble.net/image.2409410541.3111/poster,840x830,f8f8f8-pad,1000x1000,f8f8f8.jpg',
      });
    }
  }, [newImage]);

  useEffect(() => {
    //validate data
    const status = verifyData(newTaskInfo);
    if (status) {
      setAbleToSend(true);
    } else {
      setAbleToSend(false);
    }
  }, [newTaskInfo]);

  const alterButtomsToColumn = windowWidth < 990 ? true : false;

  return (
    <>
      <AuxContainer>
        <TasksHeader>
          <div>Add task</div>
          <TasksHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'add'} setPageState={setPageState} />
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
                defaultValue={newTaskInfo.name}
                disabled={false}
                id="outlined-required"
              />
              <ImageField>Image:</ImageField>
              <TextField
                onChange={(e) => setNewImage(e.target.value)}
                fullWidth
                disabled={false}
                defaultValue={''}
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
          <AddButtomContainer>
            <CreateButton
              valid={ableToSend}
              onClick={async () => {
                if (ableToSend) {
                  const response = await handlePost(token, newTaskInfo);
                  if (response) {
                    localStorage.removeItem('items');
                    setPageState('initial');
                  }
                }
              }}
            >
              Create
            </CreateButton>
          </AddButtomContainer>
        </TaskEditItemsContainer>
      </AuxContainer>
    </>
  );
}

export function TasksAddMobile() {
  return (
    <>
      <div>Soon™</div>
    </>
  );
}

async function handlePost(token, newTaskInfo) {
  const response = await createNewTask(token, newTaskInfo);
  if (response === 'Created') {
    toast('Created task');
    return true;
  } else {
    return false;
  }
}

async function verifyURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

function verifyData(taskDetails) {
  //console.log(taskDetails);
  if (taskDetails.name === '') {
    return false;
  }
  if (taskDetails.image === '') {
    return false;
  }
  if (taskDetails.items.length === 0) {
    return false;
  }

  const items = taskDetails.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity < 1 || items[i].quantity > 9999) {
      return false;
    }
  }

  return true;
}
