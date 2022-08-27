import { data } from 'vfile';
import './style.css';

const textInput = document.querySelector('input');
const todosMainContainer = document.querySelector('.tasks');
const clearAllbtn = document.querySelector('.clearBtn');

const editTodo = (todoContainer, todo) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editInput';
  editInput.value = todo.textContent;
  todoContainer.replaceChild(editInput, todo);
  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const todoContainers = document.querySelectorAll('.todoContainer');
      const localData = JSON.parse(localStorage.getItem('list'));
      for (let i = 0; i < todoContainers.length; i += 1) {
        if (todoContainers[i].classList.contains('checkedContainer')) localData[i].description = editInput.value;
        localStorage.setItem('list', JSON.stringify(data));
      }
    }
  });
};
const removeTodo = (todo) => {
  todosMainContainer.removeChild(todo);
  const localData = JSON.parse(localStorage.getItem('list'));
  const data = Array.from(localData).filter((i) => i.completed === false);
  console.log(data);
  for (let i = 0; i < data.length; i += 1) {
    data[i].index = i + 1;
    console.log(data[i].index);
  }
  console.log(data);
  // data.map((i) => i.index += 1);
  localStorage.setItem('list', JSON.stringify(data));
};

class MyObject {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}
const updateLocal = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todos = document.querySelectorAll('span');
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].classList.contains('checkTodo')) {
      localData[i].completed = true;
    } else {
      localData[i].completed = false;
    }
  }
  localStorage.setItem('list', JSON.stringify(localData));
};
const myArray = [];
const addToDo = (todoValue) => {
  const todoContainer = document.createElement('div');

  todoContainer.className = 'todoContainer';
  todoContainer.innerHTML += `
        <input type="checkbox" class="checkbox">
        <span>${todoValue}</span>
        <i class="fas fa-ellipsis-v"></i>
        <i class="fa-solid fa-trash-can"></i>
    `;
  todosMainContainer.appendChild(todoContainer);

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkTodo');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      updateLocal();
    });
  });

  const object = new MyObject(todoValue, false, checkbox.length);
  myArray.push(object);
  localStorage.setItem('list', JSON.stringify(myArray));

  const editIcons = document.querySelectorAll('.fa-ellipsis-v');
  editIcons.forEach((i) => {
    i.addEventListener('click', () => {
      editTodo(todoContainer, i.previousElementSibling);
      i.parentElement.classList.add('checkedContainer');
    });
  });

  const removeIcons = document.querySelectorAll('.fa-trash-can');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });
};

textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && textInput.value) {
    // e.preventDefault();
    addToDo(textInput.value);
    textInput.value = (null);
  }
});

const getFromLocal = () => {
  const data = JSON.parse(localStorage.getItem('list'));
  data.map((i) => {
    myArray.push(i);
    const todoContainer = document.createElement('div');
    todoContainer.className = 'todoContainer';
    todoContainer.innerHTML += `
        <input type="checkbox" class="checkbox">
        <span>${i.description}</span>
        <i class="fas fa-ellipsis-v"></i>
        <i class="fa-solid fa-trash-can"></i>
    `;
    todosMainContainer.appendChild(todoContainer);

    const editIcons = document.querySelectorAll('.fa-ellipsis-v');
    editIcons.forEach((i) => {
      i.addEventListener('click', () => {
        editTodo(todoContainer, i.previousElementSibling);
        i.parentElement.classList.add('checkedContainer');
      });
    });
  });

  const checkbox = document.querySelectorAll('.checkbox');
  checkbox.forEach((i) => {
    i.addEventListener('click', () => {
      i.parentElement.classList.toggle('checkedContainer');
      i.nextElementSibling.classList.toggle('checkTodo');
      i.parentElement.lastElementChild.classList.toggle('trash-active');
      i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
      updateLocal();
    });
  });

  const removeIcons = document.querySelectorAll('.fa-trash-can');
  removeIcons.forEach((i) => {
    i.addEventListener('click', () => {
      removeTodo(i.parentElement);
    });
  });

  localStorage.setItem('list', JSON.stringify(myArray));
};
window.addEventListener('load', getFromLocal);

const clearAll = () => {
  const localData = JSON.parse(localStorage.getItem('list'));
  const todoContainer = document.querySelectorAll('.todoContainer');
  todoContainer.forEach((i) => {
    if (i.classList.contains('checkedContainer')) {
      removeTodo(i);
    }
  });

  const data = Array.from(localData).filter((i) => i.completed === false);
  for (let i = 0; i < data.length; i += 1) {
    data[i].index = i + 1;
    console.log(data[i].index);
  }
  console.log(data);
  localStorage.setItem('list', JSON.stringify(data));
};

clearAllbtn.addEventListener('click', clearAll);