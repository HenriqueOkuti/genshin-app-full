import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
  AddItemButtom,
  Dropdown,
  DropdownAnchor,
  DropdownContent,
  ItemsContainer,
  ModalContainer,
  ModalHeader,
  ModalItemContainer,
  ModalItemTitle,
  TasksHeaderButtons,
} from './TasksStyles';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { IoAddCircleOutline } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { imagesItems } from '../../../utils/itemsImageImporter';

export default function NewItemModal({ taskId, setNewTaskInfo, newTaskInfo }) {
  const items = JSON.parse(localStorage.getItem('items'));
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [allItems, setAllItems] = useState(items);
  const [currentFilter, setCurrentFilter] = useState({ name: '' });
  const [specificItems, setSpecificItems] = useState([
    ...allItems.bossMats,
    ...allItems.dungeonMats,
    ...allItems.enemyMats,
    ...allItems.localSpecialty,
    ...allItems.weeklyBossMats,
  ]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '60%',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <AddItemButtom theme={userTheme.palette}>
        <Button onClick={handleOpen}>
          <IoAddCircleOutline />
        </Button>
      </AddItemButtom>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer theme={userTheme.palette}>
          <Box sx={style}>
            <ModalHeader>
              <div onClick={handleClose}>Pick an item {currentFilter.name}</div>
              <TasksHeaderButtons>
                <div>
                  <FilterMenuItemsModal
                    currentFilter={currentFilter}
                    setCurrentFilter={setCurrentFilter}
                    allItems={allItems}
                    setSpecificItems={setSpecificItems}
                  />
                </div>
              </TasksHeaderButtons>
            </ModalHeader>
            <RenderItemsInsideModal
              newTaskInfo={newTaskInfo}
              setNewTaskInfo={setNewTaskInfo}
              itemsToRender={specificItems}
              handleClose={handleClose}
            />
          </Box>
        </ModalContainer>
      </Modal>
    </div>
  );
}

export function FilterMenuItemsModal({ allItems, setSpecificItems, currentFilter, setCurrentFilter }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef('');

  const filterOptions = [
    {
      name: 'Weekly Boss Items',
      function: () => {
        if (currentFilter.name === '(weekly)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(weekly)' });
          setSpecificItems([...allItems.weeklyBossMats]);
        }
      },
    },
    {
      name: 'Boss Items',
      function: () => {
        if (currentFilter.name === '(boss)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(boss)' });
          setSpecificItems([...allItems.bossMats]);
        }
      },
    },
    {
      name: 'Dungeon Items',
      function: () => {
        if (currentFilter.name === '(dungeon)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(dungeon)' });
          setSpecificItems([...allItems.dungeonMats]);
        }
      },
    },
    {
      name: 'Enemy Items',
      function: () => {
        if (currentFilter.name === '(enemy)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(enemy)' });
          setSpecificItems([...allItems.enemyMats]);
        }
      },
    },
    {
      name: 'Local Specialty',
      function: () => {
        if (currentFilter.name === '(local)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(local)' });
          setSpecificItems([...allItems.localSpecialty]);
        }
      },
    },
    {
      name: 'A-Z',
      function: () => {
        if (currentFilter.name === '(A-Z)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(A-Z)' });
          const sortedList = [
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ].sort((a, b) => a.name.localeCompare(b.name));
          setSpecificItems(sortedList);
        }
      },
    },
    {
      name: 'Z-A',
      function: () => {
        if (currentFilter.name === '(Z-A)') {
          setCurrentFilter({ name: '' });
          setSpecificItems([
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ]);
        } else {
          setCurrentFilter({ name: '(Z-A)' });
          const sortedList = [
            ...allItems.bossMats,
            ...allItems.dungeonMats,
            ...allItems.enemyMats,
            ...allItems.localSpecialty,
            ...allItems.weeklyBossMats,
          ].sort((a, b) => b.name.localeCompare(a.name));
          setSpecificItems(sortedList);
        }
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
            <FilterMenuDropdown filterType={currentFilter} handleOpen={handleOpen} filterOptions={filterOptions} />
          </DropdownAnchor>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export function FilterMenuDropdown({ filterOptions, filterType }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [selected, setSelected] = useState(filterType.name);

  return (
    <>
      <Dropdown theme={userTheme.palette}>
        {filterOptions.map((filter, index) => {
          return (
            <DropdownContent
              colors={filter.name === selected ? true : false}
              key={index}
              onClick={() => {
                filter.function();
                setSelected(filter.name);
              }}
            >
              <p>{filter.name}</p>
            </DropdownContent>
          );
        })}
      </Dropdown>
    </>
  );
}

function RenderItemsInsideModal({ handleClose, newTaskInfo, setNewTaskInfo, itemsToRender }) {
  const rarityDict = {
    1: '#8B949F',
    2: '#82CD47',
    3: '#8DBFE0',
    4: '#a8a0db',
    5: '#F6D860',
  };

  return (
    <>
      <ItemsContainer>
        {itemsToRender.map((item, index) => {
          if (item.name !== 'none') {
            return (
              <ModalItemContainer
                onClick={() => {
                  const updatedItems = newTaskInfo.items;
                  const newItem = {
                    weeklyBossMat: item.weeklyBossMat ? true : false,
                    bossMat: item.bossMat ? true : false,
                    dungeonMat: item.dungeonMat ? true : false,
                    enemyMat: item.enemyMat ? true : false,
                    localSpecialty: item.localSpecialty ? true : false,
                    weaponMat: false,
                    itemId: item.id,
                    quantity: 1,
                    itemInfo: {
                      name: item.name,
                      image: imagesItems[item.key],
                      key: item.key,
                      rarity: item.rarity,
                    },
                  };

                  updatedItems.push(newItem);
                  setNewTaskInfo({ ...newTaskInfo, items: updatedItems });
                  handleClose();
                }}
                colors={rarityDict[item.rarity]}
                key={index}
              >
                <ModalItemTitle>{item.name}</ModalItemTitle>
                <img src={imagesItems[item.key]} alt={item.name} />
              </ModalItemContainer>
            );
          }
        })}
      </ItemsContainer>
    </>
  );
}
