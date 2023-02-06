import { useEffect, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { createDoubleLinkedList, handleFilter } from './CharactersFilter';
import { HandleRedirectButton } from './CharactersRedirect';
import { InitialRenderImages } from './CharactersRenderList';
import {
  AuxContainer,
  CharactersHeader,
  CharactersHeaderButtons,
  CharactersList,
  Dropdown,
  DropdownAnchor,
} from './CharactersStyles';

//main version
export function CharInitialMain({ elements, weapons, setPageState, windowWidth, userChars, setCharToMod }) {
  const [filterType, setFilterType] = useState({ name: null });
  const [updatedFilter, setUpdatedFilter] = useState(false);
  const [suppText, setSuppText] = useState('');
  const [filteredChars, setFilteredChars] = useState([...userChars]);

  useEffect(() => {
    if (userChars[0]) {
      handleFilter(filterType, [...userChars], setFilteredChars, setSuppText);
    }
  }, [updatedFilter]);

  return (
    <>
      <AuxContainer>
        <CharactersHeader>
          <div>Characters {suppText}</div>
          <CharactersHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuInitial
                setFilterType={setFilterType}
                filterType={filterType}
                setUpdatedFilter={setUpdatedFilter}
                updatedFilter={updatedFilter}
                elements={elements}
                weapons={weapons}
              />
            </div>
          </CharactersHeaderButtons>
        </CharactersHeader>
        <CharactersList width={windowWidth}>
          <InitialRenderImages
            arrayChars={!filterType.name ? userChars : filteredChars}
            elements={elements}
            setPageState={setPageState}
            setCharToMod={setCharToMod}
          />
        </CharactersList>
      </AuxContainer>
    </>
  );
}

//mobile version
export function CharInitialMobile({ elements, weapons, setPageState }) {
  const [filterType, setFilterType] = useState(null);

  return (
    <>
      <AuxContainer>
        <CharactersHeader>
          <div>Characters</div>
          <CharactersHeaderButtons>
            <div>
              <HandleRedirectButton pageState={'initial'} setPageState={setPageState} />
            </div>
            <div>
              <FilterMenuInitial
                setFilterType={setFilterType}
                filterType={filterType}
                elements={elements}
                weapons={weapons}
              />
            </div>
          </CharactersHeaderButtons>
        </CharactersHeader>
      </AuxContainer>
    </>
  );
}

export function FilterMenuInitial({ setUpdatedFilter, updatedFilter, setFilterType, filterType, elements, weapons }) {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef(null);

  const weaponList = createDoubleLinkedList(weapons);
  const elementList = createDoubleLinkedList(elements);

  const filterCharsOptions = [
    {
      name: 'Element',
      function: () => {
        if (!filterType.name || filterType.name !== 'Element') {
          setFilterType({ name: 'Element', type: elementList.head });
        } else if (!filterType.type || !filterType.type?.next) {
          setFilterType({ name: null });
        } else if (filterType.name === 'Element' && !filterType.type.next) {
          setFilterType({ name: 'null' });
        } else if (filterType.name === 'Element') {
          setFilterType({ name: 'Element', type: filterType.type.next });
        }
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Weapon',
      function: () => {
        if (!filterType.name || filterType.name !== 'Weapon') {
          setFilterType({ name: 'Weapon', type: weaponList.head });
        } else if (!filterType.type || !filterType.type?.next) {
          setFilterType({ name: null });
        } else if (filterType.name === 'Weapon' && !filterType.type.next) {
          setFilterType({ name: 'null' });
        } else if (filterType.name === 'Weapon') {
          setFilterType({ name: 'Weapon', type: filterType.type.next });
        }
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Constellation',
      function: () => {
        filterType.name === 'Constellation' ? setFilterType({ name: null }) : setFilterType({ name: 'Constellation' });
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Level',
      function: () => {
        filterType.name === 'Level' ? setFilterType({ name: null }) : setFilterType({ name: 'Level' });
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'A-Z',
      function: () => {
        filterType.name === 'A-Z' ? setFilterType({ name: null }) : setFilterType({ name: 'A-Z' });
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Z-A',
      function: () => {
        filterType.name === 'Z-A' ? setFilterType({ name: null }) : setFilterType({ name: 'Z-A' });
        setUpdatedFilter(!updatedFilter);
      },
    },
    {
      name: 'Friendship',
      function: () => {
        filterType.name === 'Friendship' ? setFilterType({ name: null }) : setFilterType({ name: 'Friendship' });
        setUpdatedFilter(!updatedFilter);
      },
    },
  ];

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef, open]);

  return (
    <>
      <div>
        <div onClick={handleOpen}>
          <AiOutlineMenu />
        </div>
        {open ? (
          <DropdownAnchor ref={wrapperRef}>
            <FilterMenuDropdown handleOpen={handleOpen} filterOptions={filterCharsOptions} />
          </DropdownAnchor>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export function FilterMenuDropdown({ filterOptions }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];

  return (
    <>
      <Dropdown theme={userTheme.palette}>
        {filterOptions.map((filter, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //handleOpen();
                filter.function();
              }}
            >
              <p>{filter.name}</p>
            </div>
          );
        })}
      </Dropdown>
    </>
  );
}
