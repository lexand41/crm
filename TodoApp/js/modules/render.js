import createElement from './createElement.js';
import serviseStorage from './serviseStorage.js';

const {
  createTitle,
  createForm,
  createRow,
  setNumbers,
  createTable,
} = createElement;

const {
  setLocalStorage,
  getLocalStorage,
} = serviseStorage;

const renderTodoApp = (app) => {
  const title = createTitle();
  const form = createForm();
  const {
    table,
    tableWrapper,
  } = createTable();

  app.append(title, form, tableWrapper);

  return {
    list: table.tbody,
    form,
  };
};

const addTask = (task) => {
  const key = localStorage.getItem('nickname');
  const tasks = getLocalStorage(key);
  tasks.push(task);
  setLocalStorage(key, tasks);
};

const renderTasks = (elem) => {
  const key = localStorage.getItem('nickname');
  const tasks = getLocalStorage(key);
  const allRow = tasks.map(createRow);
  elem.append(...allRow);
};

const addTaskPage = (task, list) => {
  list.append(createRow(task));
  setNumbers();
};

export default {
  renderTodoApp,
  addTask,
  renderTasks,
  addTaskPage,
};
