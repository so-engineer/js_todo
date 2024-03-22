import { TodoListModel } from './model/TodoListModel.js';
import { TodoItemModel } from './model/TodoItemModel.js';
import { element, render } from './view/html-utils.js';

export class App {
  #todoListModel = new TodoListModel();

  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');
    const todoDoneItemCountElement = document.querySelector('#js-done-todo-count');
    const todoNotDoneItemCountElement = document.querySelector('#js-not-done-todo-count');

    this.#todoListModel.onChange(() => {
      // HTML文字列からHTML要素を作成
      const todoListElement = element`<ul></ul>`;

      const todoItems = this.#todoListModel.getTodoItems();
      todoItems.forEach(item => {
        // 三項演算子（条件 ? 値1 : 値2）
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s>
            <button class="update">編集</button>
            <button class="delete">削除</button>
            </li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}
            <button class="update">編集</button>
            <button class="delete">削除</button>
            </li>`;

        const inputCheckboxElement = todoItemElement.querySelector('.checkbox');
        inputCheckboxElement.addEventListener('change', () => {
          this.#todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed,
          });
        });

        const updateButtonElement = todoItemElement.querySelector('.update');
        updateButtonElement.addEventListener('click', () => {

          const inputElement = document.createElement('input');
          inputElement.type = 'text';

          const saveButtonElement = document.createElement('button');
          saveButtonElement.textContent = '保存';

          // ToDo項目内の内容をクリアして、入力要素と保存ボタンを追加
          todoItemElement.innerHTML = '';
          todoItemElement.appendChild(inputElement);
          todoItemElement.appendChild(saveButtonElement);

          // 保存ボタンのイベントリスナー
          saveButtonElement.addEventListener('click', () => {
            // 入力された新しいテキストを取得
            const updatedText = inputElement.value;
            // ToDo項目の更新処理
            this.#todoListModel.updateTodo2({
              id: item.id,
              title: updatedText,
            });
          });
        });

        const deleteButtonElement = todoItemElement.querySelector('.delete');
        deleteButtonElement.addEventListener('click', () => {
          let result = confirm('本当に削除してもよろしいですか？');
          if (result) {
            this.#todoListModel.deleteTodo({
              id: item.id
            });
          }
        });

        todoListElement.appendChild(todoItemElement);
      });

      // 親要素の子要素を上書き
      render(todoListElement, containerElement);

      todoItemCountElement.textContent = `全てのタスク: ${this.#todoListModel.getTotalCount()}`;
      todoDoneItemCountElement.textContent = `完了済み: ${this.#todoListModel.getDoneCount()}`;
      todoNotDoneItemCountElement.textContent = `未完了: ${this.#todoListModel.getNotDoneCount()}`;
    });

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false,
      }));
      inputElement.value = '';
    });
  }
}

