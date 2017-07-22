import { List } from './model';
import { ItemInputView, ListView, FilterView } from './view';

class Controller {
  constructor(
    list = new List(),
    listView = new ListView(),
    itemInputView = new ItemInputView(),
    filterView = new FilterView()) {
    this.list = list;
    this.itemInputView = itemInputView;
    this.listView = listView;
    this.filterView = filterView;

    if (this.list.items.size > 0) {
      this.registerItemsEvents(this.list.items, this.listView.itemViews);
    }
  }

  completeOnCheck(item, itemView) {
    itemView.checkbox.addEventListener('click', (e) => {
      if (e.target.checked) {
        item.completed = true;
        this.setLocalStorage();
        itemView.addLine();
      } else {
        item.completed = false;
        this.setLocalStorage();
        itemView.removeLine();
      }
    });
  }

  removeOnX(item, itemView) {
    itemView.x.addEventListener('click', () => {
      this.list.removeItem(item);
      this.setLocalStorage();
      itemView.el.remove();
    });
  }

  registerItemEvents(item, itemView) {
    this.removeOnX(item, itemView);
    this.completeOnCheck(item, itemView);
  }

  registerItemsEvents(items, itemViews) {
    for (const itemView of itemViews) {
      this.registerItemEvents(items.get(itemView.el.dataset.id), itemView);
    }
  }

  addNewItemOnEnter() {
    this.itemInputView.el
      .addEventListener('keypress', (e) => {
        if (e.keyCode === 13) {
          const string = e.target.value;
          const newItem = this.list.addItem(string);
          this.setLocalStorage();
          const newItemView = this.listView.addItem(newItem);
          this.registerItemEvents(newItem, newItemView);
          this.itemInputView.setValue('');
        }
      });
  }

  resetListView(items) {
    this.listView.remove();
    this.listView = new ListView(items);
    this.registerItemsEvents(items, this.listView.itemViews);
  }

  filterOnClick() {
    this.filterView.allFilter.addEventListener('click', () => {
      this.resetListView(this.list.items);
      this.filterView.currentFilter = this.filterView.allFilter;
    });

    this.filterView.completedFilter.addEventListener('click', () => {
      this.resetListView(this.list.completedItems);
      this.filterView.currentFilter = this.filterView.completedFilter;
    });

    this.filterView.activeFilter.addEventListener('click', () => {
      this.resetListView(this.list.activeItems);
      this.filterView.currentFilter = this.filterView.activeFilter;
    });
  }

  setLocalStorage() {
    window.localStorage.setItem('items', JSON.stringify(this.list.items));
  }

  run() {
    this.addNewItemOnEnter();
    this.filterOnClick();
  }
}


const savedItems = new Map(JSON.parse(window.localStorage.getItem('items')));
if (savedItems) {
  new Controller(new List(savedItems), new ListView(savedItems)).run();
} else {
  new Controller().run();
}

