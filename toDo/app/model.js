export class Item {
  constructor(string = '', id = 0, completed = false) {
    this.string = string;
    this.completed = completed;
    this.id = id;
  }
}

export function _createItemId(string, items) {
  let id = string;
  let freq = 0;
  while (items.has(id)) {
    freq += 1;
    id = `${string}_${freq}`;
  }
  return id;
}


export function _createNewItem(string, items) {
  const itemId = _createItemId(string, items);
  const newItem = new Item(string, itemId);
  return newItem;
}

export class List {
  constructor(items = new Map()) {
    this.items = items;
  }

  addItem(string) {
    const newItem = _createNewItem(string, this.items);
    this.items.set(newItem.id, newItem);
    return newItem;
  }

  removeItem(item) {
    this.items.delete(item.id);
  }

  getMarkedItems(completed = true) {
    const markedItems = new Map();
    for (const item of this.items.values()) {
      if (item.completed === completed) {
        markedItems.set(item.id, item);
      }
    }
    return markedItems;
  }

  get completedItems() {
    return this.getMarkedItems();
  }

  get activeItems() {
    return this.getMarkedItems(false);
  }
}
