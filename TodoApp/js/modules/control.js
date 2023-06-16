import createElement from './createElement.js';
import serviseStorage from './serviseStorage.js';
import render from './render.js';

const {
  setNumbers,
} = createElement;

const {
  getLocalStorage,
  setLocalStorage,
} = serviseStorage;

const {
  addTask,
  addTaskPage,
} = render;

const startEdit = (element) => {
  element.contentEditable = true;
};

const stopEdit = (element) => {
  element.contentEditable = false;
};

const tableControl = (list, form) => {
  const selectPriorTask = document.getElementById('selectTask');
  const btnEnter = form.querySelector('.save_task');
  const tableTask = document.getElementById('task');

  const ctrlButton = () => {
    btnEnter.disabled = tableTask.value.trim().length === 0;
    selectPriorTask.disabled = tableTask.value.trim().length === 0;
  };
  tableTask.addEventListener('input', ctrlButton, false);
  ctrlButton.call(tableTask);

  btnEnter.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.keyCode === 13) {
      btnEnter.click();
    }
  });

  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();

    const taskId = document.querySelector('.task-id');
    const randomNum = Math.random().toString().substring(2, 10);
    taskId.value = randomNum;

    const formData = new FormData(form);
    const newTask = Object.fromEntries(formData);

    addTaskPage(newTask, list);
    addTask(newTask);

    form.reset();
    tableTask.addEventListener('input', ctrlButton, false);
    ctrlButton.call(tableTask);
  });

  list.addEventListener('click', (e) => {
    const key = localStorage.getItem('nickname');
    const tasks = getLocalStorage(key);
    const target = e.target;
    const rowTarget = target.closest('.row-table');
    const rowTargetId = rowTarget.dataset.id;
    const jobStatusTarget = rowTarget.querySelector('.jobstatus');
    const jobTarget = rowTarget.querySelector('.job');
    const btnEditTarget = rowTarget.querySelector('.btn_edit');
    const btnEditSave = rowTarget.querySelector('.btn_edit_save');
    const btnComp = rowTarget.querySelector('.btn-success');
    const btnComplete = rowTarget.querySelector('.btn_complete');

    if (target.closest('.btn-danger')) {
      if (confirm('Вы точно хотите удалить задачу?') === true) {
        tasks.forEach((el, i) => {
          if (el.id === rowTargetId) tasks.splice(i, 1);
        });
        setLocalStorage(key, tasks);
        rowTarget.remove();
        setNumbers();
      }
    }

    if (target.closest('.btn-success')) {
      if (btnComplete) {
        tasks.forEach((el) => {
          if (el.id === rowTargetId) {
            el.jobStatus = 'Выполнена';
            jobStatusTarget.textContent = 'Выполнена';
            jobTarget.style.textDecoration = 'line-through';
            rowTarget.className = 'table-success row-table';
            btnComplete.classList.remove('btn_complete');
          }
        });
        setLocalStorage(key, tasks);
      } else {
        tasks.forEach((el) => {
          if (el.id === rowTargetId) {
            el.jobStatus = 'В процессе';
            jobStatusTarget.textContent = 'В процессе';
            jobTarget.style.textDecoration = 'none';
            rowTarget.className = 'table-light';
            if (el.selectTask === 'warning') {
              rowTarget.className = 'table-warning';
            }
            if (el.selectTask === 'danger') {
              rowTarget.className = 'table-danger';
            }
            rowTarget.classList.add('row-table');
            btnComp.classList.add('btn_complete');
          }
        });
        setLocalStorage(key, tasks);
      }
    }

    if (target.closest('.btn-secondary')) {
      if (btnEditSave) {
        tasks.forEach((el) => {
          if (el.id === rowTargetId) {
            el.edit = 'edit';
            el.jobStatus = 'В процессе';
            startEdit(jobTarget);
            jobStatusTarget.textContent = 'В процессе';
            jobTarget.style.textDecoration = 'none';
            jobTarget.classList.add('border-dark', 'border-2');
            rowTarget.className = 'table-light row-table';
            btnEditTarget.classList.add('text-warning', 'bg-dark');
            btnEditSave.classList.remove('btn_edit_save');
          }
        });
        setLocalStorage(key, tasks);
      } else {
        stopEdit(jobTarget);
        tasks.forEach((el) => {
          if (el.id === rowTargetId) {
            el.edit = 'Unedit';
            el.task = jobTarget.textContent;
            if (el.selectTask === 'warning') {
              rowTarget.className = 'table-warning';
            }
            if (el.selectTask === 'danger') {
              rowTarget.className = 'table-danger';
            }
            rowTarget.classList.add('row-table');
            jobTarget.classList.remove('border-dark', 'border-2');
            btnEditTarget.classList.remove('text-warning', 'bg-dark');
            btnEditTarget.classList.add('btn_edit_save');
          }
        });
        setLocalStorage(key, tasks);
      }
    }
  });
};

export default {
  startEdit,
  stopEdit,
  tableControl,
};
