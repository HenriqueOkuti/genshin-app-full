import { CardImage, CardInfo, CardName, CharacterCard } from './CharactersStyles';

export function InitialRenderImages({ arrayChars, elements, setPageState, setCharToMod }) {
  const elementColors = {
    anemo: '#6ec5b1',
    cryo: '#9fd7e4',
    dendro: '#a6c938',
    electro: '#a98bc6',
    geo: '#f9b62d',
    hydro: '#4cc3f6',
    pyro: '#ec7e24',
  };

  const colorsDict = {};

  for (let i = 0; i < elements.length; i++) {
    colorsDict[elements[i].id] = elementColors[elements[i].name];
  }

  return arrayChars.map((char, index) => {
    return (
      <CharacterCard
        key={index}
        onClick={() => {
          //console.log('mod char: ', char);
          setCharToMod(char);
        }}
      >
        <CardName>{char.name}</CardName>
        <CardImage colors={colorsDict[char.elementId]}>
          <img src={char.imageFace} alt={`${char.name} img`} />
        </CardImage>
        <CardInfo>
          <div>Lvl {char.level}</div>
          <div>Friendship {char.friendship}</div>
        </CardInfo>
      </CharacterCard>
    );
  });
}

export function AddRenderImages({ arrayChars, elements, setPageState, setCharToAdd }) {
  const elementColors = {
    anemo: '#6ec5b1',
    cryo: '#9fd7e4',
    dendro: '#a6c938',
    electro: '#a98bc6',
    geo: '#f9b62d',
    hydro: '#4cc3f6',
    pyro: '#ec7e24',
  };

  const colorsDict = {};

  for (let i = 0; i < elements.length; i++) {
    colorsDict[elements[i].id] = elementColors[elements[i].name];
  }

  return arrayChars.map((char, index) => {
    return (
      <CharacterCard
        key={index}
        onClick={() => {
          //console.log('mod char: ', char);
          setCharToAdd(char);
        }}
      >
        <CardName>{char.name}</CardName>
        <CardImage colors={colorsDict[char.elementId]}>
          <img src={char.imageFace} alt={`${char.name} img`} />
        </CardImage>
      </CharacterCard>
    );
  });
}
