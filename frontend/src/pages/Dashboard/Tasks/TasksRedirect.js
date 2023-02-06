import { IoAddCircleOutline } from 'react-icons/io5';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { AddCharacterButton } from './TasksStyles';

export function HandleRedirectButton({ pageState, setPageState, setTaskToMod }) {
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
            setTaskToMod(null);
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
            setTaskToMod(null);
          }}
        >
          <BsArrowCounterclockwise />
        </AddCharacterButton>
      </>
    );
  }
}
