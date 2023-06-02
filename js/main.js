'use strict';


const goods = [
  {
    "id": 1,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 2,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 3,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 4,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
];

const createRow = (arrow) => {
  const row = document.createElement('tr');
  row.setAttribute('data-id', arrow.id);
  row.classList.add('product');

  const row_num = document.createElement('td');
  row_num.classList.add('table__cell');
  row_num.innerHTML = number;
  

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

const addProductGoods = (product) => {
  goods.push(product);
};


const tableBody = document.querySelector('.table__body');

let number = 2;

const renderGoods = () => {
  for (let arrow of goods) {
    number += 1;
    createRow(arrow);
  };
};

renderGoods();

const createSumTotal = () => {
  const priceTotals = document.querySelectorAll('.table__cell_total');
  const cmsTotalPrice = document.querySelector('.cms__total-price')
  let sumPriceTotals = 0;
  for (let priceTotal of priceTotals) {
    sumPriceTotals += +(priceTotal.textContent).slice(1);
  };
  cmsTotalPrice.innerHTML = `$${sumPriceTotals}`;
};

const overlay = document.querySelector('.overlay');
overlay.classList.remove('active');

const overlayActiv = document.querySelector('.panel__add-goods');
const vendorCodeId = document.querySelector('.vendor-code__id');

overlay.addEventListener('click', (e) => {
  const target = e.target;
  if (target === overlay || target.closest('.modal__close')) {
    overlay.classList.remove('active');
  }
});

tableBody.addEventListener('click', (e) => {
  if (e.target.closest('.table__btn_del')) {
    const removeProduct = e.target.closest('.product');
    const productId = removeProduct.dataset.id;

    goods.forEach((el, i) => {
      if (el.id == productId) goods.splice(i, 1);
    });
    removeProduct.remove();
    // console.log('goods: ',goods);
    createSumTotal();
  }
});

const form = document.querySelector('.modal__form');
const modalTotalPrice = document.querySelector('.modal__total-price');
const modalId = document.querySelector('.modal__id');

const createSumModalTotal = (newProduct) => {
  let sumModalTotal = newProduct.count == 0 ?
      newProduct.price * 1 : newProduct.count * newProduct.price;

  modalTotalPrice.innerHTML = `$${sumModalTotal}`;
};

const formControl = (form) => {
  overlayActiv.addEventListener('click', () => {
    overlay.classList.add('active');
    
    let randomNum = (Math.floor(Math.random() * 1e14));
    vendorCodeId.innerHTML = randomNum;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    number += 1;

    const formProduct = new FormData(e.target);
    const newProduct = Object.fromEntries(formProduct);
    
    createRow(newProduct);
    addProductGoods(newProduct);
    createSumModalTotal(newProduct);
    createSumTotal();

    modalTotalPrice.innerHTML = '';
    form.reset();
    overlay.classList.remove('active');
  });
};

formControl(form);

form.addEventListener('change', () => {
  const formProduct = new FormData(form);
  const newProduct = Object.fromEntries(formProduct);

  createSumModalTotal(newProduct);
});

const blockInput = () => {
  const chbox = document.querySelector('#discount');
  const input = document.querySelector('.modal__input_discount')
	input.disabled = chbox.checked ? 0 : 1;
  if (!chbox.checked) {
		input.value = '';
	}
};

createSumTotal();








