import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { CharAddMain, CharAddMobile } from './CharactersAdd';
import { CharAddingMain, CharAddingMobile } from './CharactersAdding';
import { CharEditMain, CharEditMobile } from './CharactersEdit';
import { defineMissingCharacters, fetchAllCharacters, fetchElements, fetchUserCharacters } from './CharactersFetch';
import { CharInitialMain, CharInitialMobile } from './CharactersInitial';

export function CharactersManager() {
  const userTheme = useTheme();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageState, setPageState] = useState('initial');
  const [suppText, setSuppText] = useState('');

  const [charactersToRender, setCharactersToRender] = useState([]);
  const [updateElements, setUpdateElements] = useState(false);
  const [updateList, setUpdateList] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  const [userCharacters, setUserCharacters] = useState([]);
  const [userCharsDict, setUserCharsDict] = useState({});

  const [allCharacters, setAllCharacters] = useState([]);
  const [allCharsDict, setAllCharsDict] = useState({});

  const [missingCharacters, setMissingCharacters] = useState([]);
  const [missingCharsDict, setMissingCharsDict] = useState({});

  const [characterToAdd, setCharacterToAdd] = useState(null);
  const [characterToEdit, setCharacterToEdit] = useState(null);

  const [elements, setElements] = useState([]);
  const [weapons, setWeapons] = useState([]);

  useEffect(() => {
    useWindowWidth(setWindowWidth);
  }, []);

  useEffect(async () => {
    let auxToken;
    if (!token) {
      auxToken = localStorage.getItem('token');
      setToken(auxToken);
    }
    let fetchAll;
    await fetchAllCharacters(token ? token : auxToken).then(async (res) => {
      fetchAll = res;
      setAllCharacters([...fetchAll[0]]);
      setAllCharsDict({ ...fetchAll[1] });
      setWeapons([...fetchAll[2]]);
      fetchAll[3].pop();
      setElements([...fetchAll[3]]);

      let fetchUser;
      await fetchUserCharacters(token ? token : auxToken, fetchAll[1], fetchAll[1], fetchAll[0]).then((res) => {
        fetchUser = res;
        setUserCharacters([...fetchUser[0]]);
        setUserCharsDict({ ...fetchUser[1] });

        const missing = defineMissingCharacters(fetchUser[1], fetchAll[1], fetchAll[0]);
        setMissingCharacters([...missing[0]]);
        setMissingCharsDict({ ...missing[1] });
      });
    });
  }, [updateList, fetchAgain, pageState]);

  useEffect(async () => {
    let auxToken = token ? token : localStorage.getItem('token');
    const fetchedElements = await fetchElements(auxToken);
    if (fetchedElements) {
      setElements([...fetchedElements.elements]);
    }
  }, [updateElements]);

  useEffect(() => {
    if (characterToEdit) {
      setPageState('edit');
    }
  }, [characterToEdit]);

  useEffect(() => {
    if (characterToAdd) {
      setPageState('adding');
    }
  }, [characterToAdd]);

  if (window.innerWidth > 700) {
    if (!elements[0]) {
      return (
        <>
          <div></div>
        </>
      );
    }

    if (pageState === 'initial') {
      return (
        <>
          <CharInitialMain
            elements={elements}
            weapons={weapons}
            setPageState={setPageState}
            windowWidth={windowWidth}
            userChars={userCharacters}
            setCharToMod={setCharacterToEdit}
          />
        </>
      );
    }
    if (pageState === 'add') {
      return (
        <>
          <CharAddMain
            elements={elements}
            weapons={weapons}
            setPageState={setPageState}
            windowWidth={windowWidth}
            missingChars={missingCharacters}
            setCharToAdd={setCharacterToAdd}
          />
        </>
      );
    }
    if (pageState === 'adding') {
      return (
        <>
          <CharAddingMain
            characterToAdd={characterToAdd}
            setCharacterToAdd={setCharacterToAdd}
            setPageState={setPageState}
            elements={elements}
          />
        </>
      );
    }
    if (pageState === 'edit') {
      return (
        <>
          <CharEditMain
            characterToEdit={characterToEdit}
            setCharacterToEdit={setCharacterToEdit}
            setPageState={setPageState}
            elements={elements}
          />
        </>
      );
    }
  } else {
    if (pageState === 'initial') {
      return (
        <CharInitialMobile
          elements={elements}
          weapons={weapons}
          setPageState={setPageState}
          windowWidth={windowWidth}
          userChars={userCharacters}
          setCharToMod={setCharacterToEdit}
        />
      );
    }
    if (pageState === 'add') {
      return <CharAddMobile />;
    }
    if (pageState === 'adding') {
      return <CharAddingMobile />;
    }
    if (pageState === 'edit') {
      return <CharEditMobile />;
    }
  }
}
