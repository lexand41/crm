import serviseStorage from './modules/serviseStorage.js';
import createElement from './modules/createElement.js';
import render from './modules/render.js';
import control from './modules/control.js';

const {
  createModalForm,
  setNumbers,
} = createElement;

const {
  getLocalStorage,
} = serviseStorage;

const {
  renderTodoApp,
  renderTasks,
} = render;

const {
  tableControl,
} = control;

const init = () => {
  const key = localStorage.getItem('nickname');
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column', 'app');
  const {list, form} = renderTodoApp(app);
  const tasks = getLocalStorage(key);
  renderTasks(list, tasks);
  tableControl(list, form);
  setNumbers();
};

{
  const controlModalForm = () => {
    const modalForm = createModalForm();
    const btnEnterTodo = document.querySelector('.enter');
    const inputEnter = document.querySelector('.form-input');

    const ctrlButtonEnter = () => {
      btnEnterTodo.disabled = inputEnter.value.trim().length === 0;
    };
    inputEnter.addEventListener('input', ctrlButtonEnter, false);
    ctrlButtonEnter.call(inputEnter);

    btnEnterTodo.addEventListener('click', (e) => {
      e.preventDefault();

      modalForm.classList.add('d-none');
      const nickname = document.getElementById('nickname').value;
      localStorage.setItem('nickname', nickname);
      init();
    });
  };

  window.todoApp = controlModalForm;
}


