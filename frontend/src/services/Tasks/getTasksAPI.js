import api from '../api';

export async function getUserTasks(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/tasks/user', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllItems(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/items/all', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function postNewTask(token, newTaskInfo) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;

  const response = await api.post('/tasks/user', newTaskInfo, request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function deleteTask(token, taskId) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      taskId: taskId,
    },
  };
  let returnData;

  const response = await api.delete('/tasks/user', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function updateTask(token, newTaskInfo) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;

  const response = await api.put('/tasks/user', newTaskInfo, request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
