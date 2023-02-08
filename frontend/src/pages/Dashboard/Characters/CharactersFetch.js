import {
  getAllCharacters,
  getAllElements,
  getAllWeapons,
  getUserCharacters,
} from '../../../services/Characters/getCharactersAPI';
import { allImages } from '../../../utils/imageImporter';

export async function fetchUserCharacters(userToken, charsDict, allCharsDict, allCharacters) {
  let userCharacters = [];
  let token = userToken;
  const charactersImagesFace = allImages.imagesFace;
  const charactersImagesFull = allImages.imagesFull;

  if (!userToken) {
    token = localStorage.getItem('token');
  }

  const { elements } = await fetchElements(token);
  const elementsDict = {};
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name !== 'Traveler') {
      elementsDict[elements[i].id] = elements[i].name;
    }
  }

  const { weapons } = await fetchWeapons(token);
  const weaponsDict = {};
  for (let i = 0; i < weapons.length; i++) {
    weaponsDict[weapons[i].id] = weapons[i].name;
  }

  const { characters } = await getUserCharacters(token);

  const allCharsElementsDict = {};

  for (let i = 0; i < allCharacters.length; i++) {
    allCharsElementsDict[allCharacters[i].id] = allCharacters[i].elementId;
  }

  const allCharsWeaponsDict = {};

  for (let i = 0; i < allCharacters.length; i++) {
    allCharsWeaponsDict[allCharacters[i].id] = allCharacters[i].weaponId;
  }

  if (characters) {
    const fixedCharacters = characters.map((char) => {
      const userCharName = charsDict[char.characterId];
      const charKey = userCharName.toLowerCase().replace(' ', '_').replace(')', '').replace('(', '');

      return {
        ...char,
        imageFace: charactersImagesFace[charKey],
        imageSplashArt: charactersImagesFull[charKey],
        elementName: elementsDict[allCharsElementsDict[char.characterId]],
        elementId: allCharsElementsDict[char.characterId],
        name: userCharName,
        weaponId: allCharsWeaponsDict[char.characterId],
        weaponName: weaponsDict[allCharsWeaponsDict[char.characterId]],
      };
    });

    userCharacters = fixedCharacters;
  }

  const userCharsDict = {};

  for (let i = 0; i < userCharacters.length; i++) {
    userCharsDict[userCharacters[i].name] = true;
  }

  return [userCharacters, userCharsDict];
}

export async function fetchAllCharacters(userToken) {
  let allCharacters = [];
  let token = userToken;
  const charactersImagesFace = allImages.imagesFace;
  const charactersImagesFull = allImages.imagesFull;

  if (!userToken) {
    token = localStorage.getItem('token');
  }

  const { elements } = await fetchElements(token);
  const elementsDict = {};
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name !== 'Traveler') {
      elementsDict[elements[i].id] = elements[i].name;
    }
  }

  const { weapons } = await fetchWeapons(token);
  const weaponsDict = {};
  for (let i = 0; i < weapons.length; i++) {
    weaponsDict[weapons[i].id] = weapons[i].name;
  }

  const { characters } = await getAllCharacters(token);
  if (characters) {
    const fixedCharacters = characters.map((char) => {
      const charKey = char.name.toLowerCase().replace(' ', '_').replace(')', '').replace('(', '');

      return {
        ...char,
        imageFace: charactersImagesFace[charKey],
        imageSplashArt: charactersImagesFull[charKey],
        elementName: elementsDict[char.elementId],
        weaponName: weaponsDict[char.weaponId],
      };
    });

    allCharacters = fixedCharacters;
  }

  const charsDict = {};
  for (let i = 0; i < characters.length; i++) {
    charsDict[characters[i].id] = characters[i].name;
  }

  return [allCharacters, charsDict, weapons, elements];
}

export function defineMissingCharacters(userCharsDict, allCharsDict, allCharacters) {
  const missingCharactersDict = {};

  for (const [key, value] of Object.entries(allCharsDict)) {
    if (!userCharsDict[value]) {
      missingCharactersDict[key] = true;
    }
  }

  const missingCharacters = [];

  for (let i = 0; i < allCharacters.length; i++) {
    if (missingCharactersDict[allCharacters[i].id]) {
      missingCharacters.push(allCharacters[i]);
    }
  }

  return [missingCharacters, missingCharactersDict];
}

export async function fetchElements(token) {
  return await getAllElements(token);
}

export async function fetchWeapons(token) {
  return await getAllWeapons(token);
}
