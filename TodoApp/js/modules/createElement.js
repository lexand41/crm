const createModalForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('start-50', 'translate-middle', 'form-overlay',
      'position-absolute', 'top-50');

  const modalForm = document.createElement('form');
  modalForm.classList.add('form');
  modalForm.insertAdjacentHTML('beforeend', `
    <h3 class="form-title">Здравствуйте</h3>
    <h5 class="form-title align-items-center">
      Авторизуйтесь,<br> пожалуйста</h5>
    <div>
      <input class="form-input mb-2" placeholder="Имя" 
        name="nickname" id="nickname" type="text" required>
      <label class="form-label" for="name"></label>
    </div>
    <button class="enter btn btn-primary ps-5 pe-5"
      type="submit">Вход</button>
  `);

  overlay.append(modalForm);
  document.body.prepend(overlay);

  return modalForm;
};

const createTitle = () => {
  const h3 = document.createElement('h3');
  h3.textContent = 'Todo App';
  return h3;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3', 'form_enter');
  form.insertAdjacentHTML('beforeend', `
    <select name="selectTask" id="selectTask" class="form-group me-3 ">
      <option value="light">обычная</option>
      <option value="warning">важная</option>
      <option value="danger">срочная</option>
    </select>
    <input id="btn_select" class="d-none" type="button" >
  
    <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" 
        name="task" id="task" placeholder="ввести задачу">
    </label>
    <label class="form-group me-3 mb-0 d-none">
      <input type="text" class="form-control"
        name="jobStatus" id="jobStatus" value="В процессе">
    </label>
    <label class="form-group me-3 mb-0 d-none">
      <input type="number" class="form-control task-id" name="id" id="id" >
    </label>
    <label class="form-group me-3 mb-0 d-none">
      <input type="text" class="form-control"
        name="edit" id="edit" value="Unedit">
    </label>
    <button type="submit" class="btn btn-primary me-3 save_task">
      Сохранить
    </button>
  `);
  return form;
};

const createRow = ({task, jobStatus, id, edit, selectTask}) => {
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', id);

  const tdNumber = document.createElement('td');
  tdNumber.classList.add('number');

  const tdTask = document.createElement('td');
  tdTask.classList.add('task', 'job');
  tdTask.textContent = task;

  const tdJobStatus = document.createElement('td');
  tdJobStatus.classList.add('task', 'jobstatus');
  tdJobStatus.textContent = jobStatus;

  const tdEdit = document.createElement('td');
  tdEdit.classList.add('task', 'edit', 'd-none');
  tdEdit.textContent = edit;

  const tdSelectTask = document.createElement('td');
  tdSelectTask.classList.add('task', 'select_task', 'd-none');
  tdSelectTask.textContent = selectTask;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'me-3', 'btn-danger');
  btnDelete.textContent = 'Удалить';

  const btnComplete = document.createElement('button');
  btnComplete.classList.add('btn', 'me-3', 'btn-success');
  btnComplete.textContent = 'Завершить';

  const btnEdit = document.createElement('button');
  btnEdit.classList.add('btn', 'me-3', 'btn-secondary', 'btn_edit');
  btnEdit.textContent = 'Редактировать';

  const btnEditSave = document.createElement('button');
  btnEditSave.classList.add('btn', 'btn-primary', 'btn_edit_save');
  btnEditSave.setAttribute('disabled', 'true');
  btnEditSave.textContent = 'Сохранить';

  const rowButtons = document.createElement('td');
  rowButtons.append(btnDelete, btnComplete, btnEdit, btnEditSave);

  if (jobStatus === 'Выполнена') {
    tr.className = 'table-success';
    tdTask.style.textDecoration = 'line-through';
  }
  if (selectTask === 'warning') {
    tr.className = 'table-warning';
  }

  if (selectTask === 'danger') {
    tr.className = 'table-danger';
  }

  tr.classList.add('row-table');
  tr.append(tdNumber, tdTask, tdJobStatus, tdEdit, tdSelectTask, rowButtons);

  return tr;
};

const setNumbers = () => {
  const elements = document.querySelectorAll('.number');
  elements.forEach((item, i) => {
    item.innerHTML = i + 1;
  });
};

const createTable = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  const tbody = document.createElement('tbody');
  table.append(thead, tbody);
  table.tbody = tbody;
  tableWrapper.append(table);

  return {
    table,
    tableWrapper,
  };
};

export default {
  createModalForm,
  createTitle,
  createForm,
  createRow,
  setNumbers,
  createTable,
};
