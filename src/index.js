import './style.css';

const toDoTasks = [{
        description: 'Clean the house',
        completed: false,
        index: 1,
    },
    {
        description: 'Cook food',
        completed: false,
        index: 2,
    },
    {
        description: 'Do shopping',
        completed: false,
        index: 3,
    },
    {
        description: 'Finish assignment',
        completed: false,
        index: 4,
    },

];

toDoTasks.forEach((element) => {
    const wholeList = document.querySelector('.tasks');
    const taskList = document.createElement('div');
    taskList.classList.add('choreDetails');
    taskList.innerHTML = `<div class="oneChore">
    <input type="checkbox">
    <h2>${element.description}</h2>
   </div>
   <div class="icon">
   <i class="fa-solid fa-ellipsis-vertical"></i>
   </div>`;
    wholeList.appendChild(taskList);
});