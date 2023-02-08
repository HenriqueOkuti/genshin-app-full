import api from '../api';

export async function signUpUser(userData) {
  let returnData = null;
  const response = await api.post('/auth/signup', userData).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function loginUser(userData) {
  let returnData = null;
  const response = await api.post('/auth/login', userData).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function loginGoogle(userData) {
  let returnData = null;
  const response = await api.post('/auth/google', userData).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
