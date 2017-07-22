export class ItemView {
  constructor(item) {
    this.createItem(item.string, item.id);
    this.createStringDiv(item.string);
    this.createCheckbox();
    this.createX();
    if (item.completed) {
      this.addLine();
      this.checkbox.checked = true;
    }
    this.el.prepend(this.checkbox);
    this.el.append(this.string);
    this.el.append(this.x);
  }

  createStringDiv(string) {
    this.string = document.createElement('div');
    this.string.textContent = string;
    this.string.classList.add('todo');
  }

  createItem(string, id) {
    this.el = document.createElement('li');
    this.el.setAttribute('data-id', id);
    this.el.classList.add('item');
  }

  createCheckbox() {
    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.classList.add('checker');
  }

  addLine() {
    this.string.classList.add('line');
  }
  removeLine() {
    this.string.classList.remove('line');
  }

  registerShowX() {
    this.el.addEventListener('mouseover', () => {
      this.x.style.display = 'inline';
    });
  }

  registerHideX() {
    this.el.addEventListener('mouseout', () => {
      this.x.style.display = 'none';
    });
  }

  createX() {
    this.x = document.createElement('div');
    this.x.textContent = 'x';
    this.x.classList.add('x');
    this.registerShowX();
    this.registerHideX();
  }
}

export class ListView {

  constructor(items = new Map(), el = document.getElementById('todo-list')) {
    this.el = el;
    this._itemViews = [];
    for (const item of items.values()) {
      this.addItem(item);
    }
  }

  remove() {
    this.el.innerHTML = '';
  }

  get itemViews() {
    return this._itemViews;
  }

  addItem(item) {
    const newItemView = new ItemView(item);
    this.el.append(newItemView.el);
    this._itemViews.push(newItemView);
    return newItemView;
  }
}

export class ItemInputView {
  constructor() {
    this.el = document.getElementById('new-item');
  }

  getValue() {
    return this.el.value;
  }

  setValue(string) {
    this.el.value = string;
  }
}

export class FilterView {
  constructor(allFilter = document.querySelector('.filter.all'),
    activeFilter = document.querySelector('.filter.active'),
    completedFilter = document.querySelector('.filter.completed')) {
    this.allFilter = allFilter;
    this.activeFilter = activeFilter;
    this.completedFilter = completedFilter;

    this.currentFilter = this.allFilter;
  }


  set currentFilter(newCurrentFilter) {
    if (this._currentFilter) {
      this._currentFilter.classList.remove('current-filter');
    }

    this._currentFilter = newCurrentFilter;
    this._currentFilter.classList.add('current-filter');
  }
}
