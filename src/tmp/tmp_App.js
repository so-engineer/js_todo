import { element, render } from '../view/html-utils.js';

export class App {
  mount() {
    const formElement = document.querySelector('#js-form');
    const inputElement = document.querySelector('#js-form-input');
    const containerElement = document.querySelector('#js-todo-list');
    const todoItemCountElement = document.querySelector('#js-todo-count');

    // HTML文字列からHTML要素を作成
    const todoListElement = element`<ul></ul>`;

    let todoItemCount = 0;
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      todoListElement.appendChild(todoItemElement);
      // 親要素の子要素を上書き
      render(todoListElement, containerElement);
      todoItemCount += 1;
      todoItemCountElement.textContent = `Todoアイテム数: ${todoItemCount}`;
      inputElement.value = '';
    });
  }
}
