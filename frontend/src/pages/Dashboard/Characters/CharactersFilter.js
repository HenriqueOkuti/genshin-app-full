export function filterCharacters(characters, filterType) {
  if (!filterType || !filterType.name) {
    return characters;
  }

  if (filterType.name === 'A-Z') {
    return characters.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filterType.name === 'Z-A') {
    return characters.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (filterType.name === 'Weapon') {
    const currentWeaponId = filterType.type?.value.id;
    const charactersWeapon = characters.filter((char) => {
      if (char.weaponId === currentWeaponId) {
        return char;
      }
    });
    return charactersWeapon;
  }

  if (filterType.name === 'Element') {
    const currentElementId = filterType.type?.value.id;

    const charactersElement = characters.filter((char) => {
      if (char.elementId === currentElementId) {
        return char;
      }
    });

    return charactersElement;
  }

  if (filterType.name === 'Constellation') {
    return characters.sort((a, b) => b.constellations[0].value - a.constellations[0].value);
  }
  if (filterType.name === 'Level') {
    return characters.sort((a, b) => b.level - a.level);
  }
  if (filterType.name === 'Friendship') {
    return characters.sort((a, b) => b.friendship - a.friendship);
  }

  return characters;
}

export function createDoubleLinkedList(array) {
  const doubleList = { head: null, tail: null };

  if (array.length === 0) {
    return doubleList;
  }

  const firstNode = { value: array[0], next: null, prev: null };
  doubleList.head = firstNode;
  doubleList.tail = firstNode;
  for (let i = 1; i < array.length; i++) {
    const newNode = { value: array[i], next: null, prev: null };
    doubleList.tail.next = newNode;
    newNode.prev = doubleList.tail;
    doubleList.tail = newNode;
  }

  return doubleList;
}

export function handleFilter(filterType, defaultList, setFilteredList, setSuppText) {
  if (!filterType.name) {
    setFilteredList(filterCharacters(defaultList, { name: null }));
    setSuppText('');
  }

  if (filterType.name === 'A-Z') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.name})`);
  }
  if (filterType.name === 'Z-A') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.name})`);
  }
  if (filterType.name === 'Weapon') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.type.value.name})`);
  }
  if (filterType.name === 'Element') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.type.value.name})`);
  }
  if (filterType.name === 'Constellation') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.name})`);
  }
  if (filterType.name === 'Level') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.name})`);
  }
  if (filterType.name === 'Friendship') {
    setFilteredList(filterCharacters(defaultList, filterType));
    setSuppText(` (${filterType.name})`);
  }
}
