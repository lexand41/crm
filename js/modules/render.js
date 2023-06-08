import elemFromPage from './elemFromPage.js';
import goods from './arrayWithData.js'

const {
  tableBody,
} = elemFromPage;

const createRow = (arrow, tableBody) => {
  const row = document.createElement('tr');
  row.setAttribute('data-id', arrow.id);
  row.classList.add('product');

  const row_num = document.createElement('td');
  row_num.classList.add('table__cell', 'number');

  const span_id = document.createElement('span');
  span_id.classList.add('table__cell-id');
  span_id.textContent = `id: ${arrow.id}`;

  const row_id = document.createElement('td');
  row_id.innerHTML = arrow.title;
  row_id.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  row_id.setAttribute('data-id', arrow.id);
  row_id.insertAdjacentElement('afterbegin', span_id);

  const row_category = document.createElement('td');
  row_category.classList.add('table__cell', 'table__cell-left');
  row_category.innerHTML = arrow.category;

  const row_units = document.createElement('td');
  row_units.classList.add('table__cell');
  row_units.innerHTML = arrow.units;

  const row_count = document.createElement('td');
  row_count.classList.add('table__cell');
  row_count.innerHTML = arrow.count;

  const row_price = document.createElement('td');
  row_price.classList.add('table__cell');
  row_price.innerHTML = `$${arrow.price}`;

  const row_total = document.createElement('td');
  row_total.classList.add('table__cell');
  row_total.innerHTML = `$${arrow.price * arrow.count}`;
  
  row_total.classList.add('table__cell_total');

  const button_pic = document.createElement('button');
  button_pic.classList.add('table__btn', 'table__btn_pic');

  const button_edit = document.createElement('button');
  button_edit.classList.add('table__btn', 'table__btn_edit');

  const button_del = document.createElement('button');
  button_del.classList.add('table__btn', 'table__btn_del');

  const row_button = document.createElement('td');
  row_button.classList.add('table__cell', 'table__cell_btn-wrapper');
  row_button.append(button_pic);
  row_button.append(button_edit);
  row_button.append(button_del);

  row.append(row_num, row_id, row_category,
    row_units, row_count, row_price, row_total, row_button);

  tableBody.append(row);
};

function setNumbers() {
  const elements = document.querySelectorAll('.number');
  elements.forEach((item, i) => {
    item.innerHTML = i+1;
  });
};

const addProductGoods = (product) => {
  goods.push(product);
};

const renderGoods = () => {
  for (let arrow of goods) {
    setNumbers();
    createRow(arrow, tableBody);
  };
};

export default {
  createRow,
  setNumbers,
  addProductGoods,
  renderGoods,
};