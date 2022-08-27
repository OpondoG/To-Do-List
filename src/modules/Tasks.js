import utils from './utils.js';
import ls from './LocalStorage.js';

const todosMainContainer = utils.qs('.tasks');

class Tasks {
  list = [];

  constructor(tasks) {
    tasks?.forEach((task) => this.addTask(task));
  }

  addTask(task) {
    if (!task.index) task.index = this.list.length + 1;
    this.list.push(task);
    this.updateLocalStorage();
    this.displayTasks();
  }

  displayTasks() {
    // Remove all the todoContainer from the DOM todosMainContainer first
    utils.qsa('.todoContainer', todosMainContainer).forEach((element) => element.remove());

    // Then repopulate with new tasks
    this.list.forEach((task) => {
      const div = utils.createElement({
        tagName: 'div',
        class: 'todoContainer',
        data: { index: task.index },
      });

      const checkbox = utils.createElement({
        tagName: 'input',
        type: 'checkbox',
        class: 'checkbox',
      });
      if (task.completed) checkbox.checked = true;

      div.appendChild(checkbox);

      div.appendChild(
        utils.createElement({
          tagName: 'span',
          contentEditable: true,
          textContent: task.description,
          class: task.completed ? 'checkTodo' : null,
        }),
      );

      div.appendChild(
        utils.createElement({
          tagName: 'i',
          class: ['fas', 'fa-ellipsis-v'],
        }),
      );

      div.appendChild(
        utils.createElement({
          tagName: 'i',
          class: ['fa-solid', 'fa-trash-can', 'hidden'],
        }),
      );

      todosMainContainer.appendChild(div);
    });
  }

  updateTask(index, property, value) {
    index = parseInt(index, 10);

    if (typeof index !== 'number') return;

    const task = this.list.find((task) => task.index === index);

    if (property === 'completed') {
      task.completed = !task.completed;
    } else {
      task[property] = value;
    }

    this.updateLocalStorage();
    this.displayTasks();
  }

  removeTask(index) {
    if (typeof index === 'object') {
      index.forEach((id) => {
        const position = this.list.findIndex((task) => task.index === parseInt(id, 10));

        this.list.splice(position, 1);
      });
    } else {
      const position = this.list.findIndex((task) => task.index === parseInt(index, 10));

      this.list.splice(position, 1);
    }

    this.reindexTasks();
    this.updateLocalStorage();
    this.displayTasks();
  }

  reindexTasks() {
    this.list.forEach((task, index) => {
      task.index = index + 1;
    });
  }

  updateLocalStorage() {
    ls.update(this.list);
  }
}

const tasks = new Tasks(ls.read());

export default tasks;
