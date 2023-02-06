import { IoAddCircleOutline } from 'react-icons/io5';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { AddCharacterButton } from './CharactersStyles';

export function HandleRedirectButton({ pageState, setPageState, setCharacterToMod }) {
  //console.log(pageState);

  if (pageState === 'initial') {
    return (
      <>
        <AddCharacterButton
          onClick={() => {
            setPageState('add');
          }}
        >
          <IoAddCircleOutline />
        </AddCharacterButton>
      </>
    );
  }

  if (pageState === 'add') {
    return (
      <>
        <AddCharacterButton
          onClick={() => {
            setPageState('initial');
          }}
        >
          <BsArrowCounterclockwise />
        </AddCharacterButton>
      </>
    );
  }

  if (pageState === 'adding') {
    return (
      <>
        <AddCharacterButton
          onClick={() => {
            setPageState('add');
            setCharacterToMod(null);
          }}
        >
          <BsArrowCounterclockwise />
        </AddCharacterButton>
      </>
    );
  }

  if (pageState === 'edit') {
    return (
      <>
        <AddCharacterButton
          onClick={() => {
            setPageState('initial');
            setCharacterToMod(null);
          }}
        >
          <BsArrowCounterclockwise />
        </AddCharacterButton>
      </>
    );
  }
}
