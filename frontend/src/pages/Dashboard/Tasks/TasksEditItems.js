import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSetTheme, useTheme } from '../../../hooks/useTheme';
import { ExcludeItemContainer, ItemContainer, ItemImage, ItemInfo } from './TasksStyles';
import { RiDeleteBack2Line } from 'react-icons/ri';
import NewItemModal from './TasksItemModal';
import { imagesItems } from '../../../utils/itemsImageImporter';

export function RenderEditTaskItems({ items, taskId, setNewTaskInfo, newTaskInfo }) {
  const [addItem, setAddItem] = useState(false);
  const [newItem, setNewItem] = useState({});

  return (
    <>
      <div>
        {items.map((item, index) => (
          <RenderTaskItem
            key={index}
            index={index}
            newTaskInfo={newTaskInfo}
            setNewTaskInfo={setNewTaskInfo}
            item={item}
          />
        ))}
      </div>
      <NewItemModal newTaskInfo={newTaskInfo} setNewTaskInfo={setNewTaskInfo} taskId={taskId} />
    </>
  );
}

function RenderTaskItem({ item, index, newTaskInfo, setNewTaskInfo }) {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const [userTheme, setUserTheme] = [theme, setTheme];
  const [quantity, setQuantity] = useState(item.quantity);

  const rarityDict = {
    1: '#8B949F',
    2: '#82CD47',
    3: '#8DBFE0',
    4: '#a8a0db',
    5: '#F6D860',
  };

  console.log(item.quantity);

  return (
    <ItemContainer colors={userTheme.palette}>
      <ItemImage colors={rarityDict[item.itemInfo.rarity]}>
        <img src={imagesItems[item.itemInfo.key]} alt={'item'} />
      </ItemImage>
      <ItemInfo>
        <div>{item.itemInfo.name}</div>
        <div>
          <div>Quantity:</div>
          <input
            onChange={(e) => {
              const value = +e.target.value;
              if (value > 0 && value <= 9999) {
                const newItem = { ...item, quantity: value };
                const newItems = [...newTaskInfo.items];
                newItems[index] = newItem;
                setNewTaskInfo({ ...newTaskInfo, items: newItems });
              } else if (value > 9999) {
                toast('Insert a correct value (max: 9999)');
              } else if (value < 0 && typeof value === 'number') {
                toast('Insert a correct value (min: 0)');
              }
            }}
            value={item.quantity}
            defaultValue={item.quantity}
            type="number"
            min="1"
            max="9999"
          />
        </div>
      </ItemInfo>
      <ExcludeItemContainer>
        <div onClick={() => handleDeleteItem(item, index, newTaskInfo, setNewTaskInfo)}>
          <RiDeleteBack2Line />
        </div>
      </ExcludeItemContainer>
    </ItemContainer>
  );
}

function handleDeleteItem(item, index, newTaskInfo, setNewTaskInfo) {
  toast('Deleting item');

  const itemList = [...newTaskInfo.items];
  console.log(itemList);
  itemList.splice(index, 1);
  console.log(itemList);
  setNewTaskInfo({ ...newTaskInfo, items: [...itemList] });
}
