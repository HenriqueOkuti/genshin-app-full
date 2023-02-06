import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import useToken from '../../../hooks/useToken';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import { allImages } from '../../../utils/imageImporter';
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
    //Handles width of screen
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
      //console.log('going to edit...');
      setPageState('edit');
    }
  }, [characterToEdit]);

  useEffect(() => {
    if (characterToAdd) {
      //console.log('going to adding...');
      setPageState('adding');
    }
  }, [characterToAdd]);

  if (window.innerWidth > 700) {
    //Render main version
    if (!elements[0]) {
      return (
        <>
          <div></div>
        </>
      );
    }

    if (pageState === 'initial') {
      //render initial version
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
      //render add version
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
      //render adding version
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
      //render edit version
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
    //Render mobile version
    if (pageState === 'initial') {
      //render initial version
      return <CharInitialMobile elements={elements} weapons={weapons} />;
    }
    if (pageState === 'add') {
      //render add version
      return <CharAddMobile />;
    }
    if (pageState === 'adding') {
      //render adding version
      return <CharAddingMobile />;
    }
    if (pageState === 'edit') {
      //render edit version
      return <CharEditMobile />;
    }
  }
}
