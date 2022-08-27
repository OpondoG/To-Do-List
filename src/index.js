import './style.css';
import tasks from './modules/Tasks.js';
import utils from './modules/utils.js';

const textInput = document.querySelector('input');
const todosMainContainer = document.querySelector('.tasks');
const clearAllbtn = document.querySelector('.clearBtn');

// Add a task
textInput.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;

  tasks.addTask({
    description: e.target.value.trim(),
    completed: false,
  });
  e.target.value = '';
});

// Prevent the form from submitting (because you used a form which could have been omitted)
utils.qs('form').addEventListener('submit', (e) => e.preventDefault());

// Mark a task as completed
todosMainContainer.addEventListener('change', (e) => {
  if (!e.target.classList.contains('checkbox')) return;

  const { index } = e.target.parentElement.dataset;

  tasks.updateTask(index, 'completed');
});

// Rename a task
todosMainContainer.addEventListener('keypress', (e) => {
  if (e.key !== 'Enter') return;
  if (!e.target.isContentEditable) return;

  e.preventDefault();

  const { index } = e.target.parentElement.dataset;

  tasks.updateTask(index, 'description', e.target.textContent.trim());
});

// Display the trash icon when the content of the task is clicked on
todosMainContainer.addEventListener('focusin', (e) => {
  const div = e.target.closest('.todoContainer');

  if (!div) return;

  utils.qs('i', div).classList.toggle('hidden');
  utils.qsa('i', div)[1].classList.toggle('hidden');
});

// Remove the trash icon when task parent element is blured
todosMainContainer.addEventListener('focusout', (e) => {
  const div = e.target.closest('.todoContainer');

  if (!div) return;

  setTimeout(() => {
    utils.qs('i', div).classList.toggle('hidden');
    utils.qsa('i', div)[1].classList.toggle('hidden');
  }, 100);
});

// Remove a single task
todosMainContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('fa-trash-can')) return;

  const { index } = e.target.closest('.todoContainer').dataset;

  tasks.removeTask(index);
});

// Clear all completed tasks
clearAllbtn.addEventListener('click', () => {
  const indexes = utils
    .qsa('input[type=checkbox]:checked', todosMainContainer)
    .map((task) => task.parentElement.dataset.index);

  tasks.removeTask(indexes);
});
