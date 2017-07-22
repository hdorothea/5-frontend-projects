import {
  _createItemId,
  _createNewItem,
  Item,
  List
} from '../app/model';

describe('_createItemId', function () {
  it('sets id to string if string is not in items', () => {
    expect(_createItemId('hallo', new Map())).toBe('hallo');
  });

  it('sets id to string_1 if string is in items', () => {
    expect(_createItemId('hallo', new Map([
      ['hallo', 1]
    ]))).toBe('hallo_1');
  });

  it('sets id to string_2 if string and string_1 are in items', () => {
    expect(_createItemId('hallo', new Map([
      ['hallo', 1],
      ['hallo_1', 1]
    ]))).toBe('hallo_2');
  });
});

describe('_createNewItem', function () {
  it('return an Item Object', () => {
    expect(_createNewItem('hallo', new Map()) instanceof Item).toBe(true);
  });
});

describe('List', function () {
  beforeEach(() => {
    this.testItem = new Item('butter', 'butter', false);
    const testItems = new Map([
      ['eggs', new Item('eggs', 'eggs', false)],
      ['milk', new Item('milk', 'milk', true)]
    ])
    this.list = new List(testItems);
  });

  it('should add an item to items', () => {
    this.list.addItem(this.testItem.string);
    expect(this.list.items.get(this.testItem.id) instanceof Item).toBe(true);
  });

  it('shold remove the item from items', () => {
    this.list.removeItem(this.testItem);
    expect(this.list.items.has(this.testItem.id)).toBe(false);
  });

  it('should filter out not completed items', () => {
    expect(this.list.getMarkedItems().has('eggs')).toBe(false);
  });
});
