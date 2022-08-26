import { data } from 'vfile';
import './style.css';


const textInput = document.querySelector('input');
const todoMainContainer = document.querySelector('.tasks');
const clearAllBtn = document.querySelector('.clearBtn');

class MyObject {
    constructor(description, completed, index) {
        this.description = description;
        this.completed = completed;
        this.index = index;
    }
}

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
    todoMainContainer.appendChild(todoContainer);

    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach((i) => {
        i.addEventListener('click', () => {
            i.parentElement.classList.toggle('checkedContainer');
            i.nextElementSibling.classList.toggle('checkTodo');
            i.parentElement.lastElementChild.classList.toggle('trash-active');
            i.parentElement.lastElementChild.previousElementSibling.classList.toggle('edit-disable');
            localStorageUpdate();
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

    const deleteIcons = document.querySelectorAll('.fa-trash-can');
    deleteIcons.forEach((i) => {
        i.addEventListener('click', () => {
            removeTodo(i.parentElement);
        });
    });
};
const removeTodo = (todo) => {
    todoMainContainer.removeChild(todo);
    let count = 1;
    const localData = JSON.parse(localStorage.getItem('list'));
    const data = Array.from(localData).filter((i) => i.completed);
    data.map((i) => i.index = count += 1);
    localStorage.setItem('list', JSON.stringify(data));
};

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
        todoMainContainer.appendChild(todoContainer);

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
            localStorageUpdate();
        });
    });

    const deleteIcons = document.querySelectorAll('.fa-trash-can');
    deleteIcons.forEach((i) => {
        i.addEventListener('click', () => {
            removeTodo(i.parentElement);
        });
    });

    localStorage.setItem('list', JSON.stringify(myArray));
};
window.addEventListener('load', getFromLocal);

const localStorageUpdate = () => {
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

const clearAll = () => {
    const localData = JSON.parse(localStorage.getItem('list'));
    const todoContainer = document.querySelectorAll('.todoContainer');
    todoContainer.forEach((i) => {
        if (i.classList.contains('checkedContainer')) {
            removeTodo(i);
        }
    });
    let count = 0;
    const data = Array.from(localData).filter((i) => i.completed === false);
    data.map((i) => i.index = count += 1);
    localStorage.setItem('list', JSON.stringify(data));


};

clearAllBtn.addEventListener('click', clearAll);