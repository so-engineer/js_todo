import { EventEmitter } from "../EventEmitter.js";

export class TodoListModel extends EventEmitter {
  #items;

  constructor(items = []) {
    super();
    this.#items = items;
  }

  getTotalCount() {
    return this.#items.length;
  }

  getDoneCount() {
    return this.#items.filter(todo => todo.completed).length;
  }

  getNotDoneCount() {
    return this.#items.filter(todo => !todo.completed).length;
  }

  getTodoItems() {
    return this.#items;
  }

  getTodoItem({id}) {
    return this.#items.find(todo => todo.id === id);
  }

  onChange(listener) {
    this.addEventListener('change', listener);
  }

  emitChange() {
    this.emit('change');
  }

  addTodo(todoItem) {
    this.#items.push(todoItem);
    this.emitChange();
  }

  // チェックボックスによる更新
  updateTodo({ id, completed }) {
    const todoItem = this.#items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.completed = completed;
    this.emitChange();
  }

  // 編集ボタンによる更新
  updateTodo2({ id, title }) {
    const todoItem = this.#items.find(todo => todo.id === id);
    if (!todoItem) {
      return;
    }
    todoItem.title = title;
    this.emitChange();
  }

  // 削除
  deleteTodo({ id }) {
    // `id`に一致しないTodoItemだけを残すことで、`id`に一致するTodoItemを削除する
    this.#items = this.#items.filter(todo => {
      return todo.id !== id;
    });
    this.emitChange();
  }
}
