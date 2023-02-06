import api from '../api';

export async function getUser(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/users/info', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function putUser(token, userData) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    name: userData.name,
    email: userData.email,
    image: userData.image,
  };

  let returnData;
  const response = await api.put('/users/info', body, request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
