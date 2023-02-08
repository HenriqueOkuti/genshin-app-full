import { getAllItems, getUserTasks, postNewTask } from '../../../services/services';

export async function fetchUserTasks(userToken) {
  let token = userToken;

  if (!userToken) {
    token = localStorage.getItem('token');
  }

  const response = await getUserTasks(token);

  if (response.tasks) {
    const fixedTasks = [];
    for (let i = 0; i < response.tasks.length; i++) {
      const daysInfo = AddFullListOfDays(response.tasks[i]);
      fixedTasks.push({
        ...response.tasks[i],
        daysInfo: {
          text: daysInfo[0],
          listDays: daysInfo[1],
        },
      });
    }
    return [...fixedTasks];
  } else {
    return [];
  }
}

export async function fetchItems(userToken) {
  let token = userToken;
  if (!token) {
    token = localStorage.getItem('token');
  }

  const response = await getAllItems(token);
  if (!response.message) {
    localStorage.setItem('items', JSON.stringify(response));
  }

  return true;
}

export async function createNewTask(userToken, newTaskInfo) {
  let token = userToken;
  if (!token) {
    token = localStorage.getItem('token');
  }

  const fixedBody = {
    name: newTaskInfo.name,
    image: newTaskInfo.image,
  };

  const fixedItems = [];

  const items = newTaskInfo.items;
  for (let i = 0; i < items.length; i++) {
    const fixedItem = {
      weeklyBossMat: items[i].weeklyBossMat,
      bossMat: items[i].bossMat,
      dungeonMat: items[i].dungeonMat,
      enemyMat: items[i].enemyMat,
      localSpecialty: items[i].localSpecialty,
      itemId: items[i].itemId,
      quantity: items[i].quantity,
    };
    fixedItems.push(fixedItem);
  }

  fixedBody.items = fixedItems;

  const response = await postNewTask(token, fixedBody);

  return response;
}

function AddFullListOfDays(task) {
  const daysDict = {
    monday: ['Monday', 'Thursday', 'Sunday'],
    tuesday: ['Tuesday', 'Friday', 'Sunday'],
    wednesday: ['Wednesday', 'Saturday', 'Sunday'],
  };
  const daysOrderDict = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const orderDaysDict = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  };
  const daysUsed = {};
  const items = task.items;

  for (let i = 0; i < items.length; i++) {
    if (items[i].itemInfo.day) {
      daysUsed[items[i].itemInfo.day] = true;
    }
  }

  if (!daysUsed['monday'] && !daysUsed['tuesday'] && !daysUsed['wednesday']) {
    return ['Any', [1, 2, 3, 4, 5, 6, 7]];
  }

  const daysUsedArray = [];
  const daysUsedDict = {};

  for (const [key, value] of Object.entries(daysUsed)) {
    for (let i = 0; i < daysDict[key].length; i++) {
      if (!daysUsedDict[daysDict[key][i]]) {
        daysUsedDict[daysDict[key][i]] = true;
        daysUsedArray.push(daysDict[key][i]);
      }
    }
  }

  const daysUsedNumber = [];

  for (let i = 0; i < daysUsedArray.length; i++) {
    daysUsedNumber.push(daysOrderDict[daysUsedArray[i]]);
  }
  daysUsedNumber.sort((a, b) => a - b);

  const daysUsedInOrder = [];
  for (let i = 0; i < daysUsedNumber.length; i++) {
    daysUsedInOrder.push(orderDaysDict[daysUsedNumber[i]]);
  }

  return [daysUsedInOrder.join(', '), daysUsedNumber];
}
