import api from '../api';

export async function getUserCharacters(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/user', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllCharacters(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/all', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllWeapons(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/weapons', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllElements(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/elements', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function postUserCharacter(token, newUserCharacter) {
  let returnData = null;

  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api
    .post('/characters/user', newUserCharacter, request)
    .catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function putUserCharacter(token, modifiedUserCharacter) {
  let returnData = null;

  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api
    .put('/characters/user', modifiedUserCharacter, request)
    .catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function deleteUserCharacter(token, userCharId) {
  let returnData = null;

  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      userCharacterId: userCharId,
    },
  };

  const response = await api.delete('/characters/user', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
