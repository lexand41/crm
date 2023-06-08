import elemFromPage from './elemFromPage.js';
import render from './render.js';
import {createSumTotal, createSumModalTotal} from './calcAmount.js';
import goods from './arrayWithData.js'


const {
  tableBody,
  overlay,
  form,
  overlayActiv,
  vendorCodeId,
  modalTotalPrice,
} = elemFromPage;

const {
  createRow,
  setNumbers,
  addProductGoods,
} = render;


export const closeModal = () => {
  overlay.classList.remove('active');
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

      setNumbers();
      createSumTotal();
    }
  });
};

export const formControl = () => {
  overlayActiv.addEventListener('click', () => {
    overlay.classList.add('active');
    let randomNum = (Math.floor(Math.random() * 1e14));
    vendorCodeId.innerHTML = randomNum;
    sessionStorage.setItem('randomNum', randomNum);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formProduct = new FormData(e.target);
    const newProduct = Object.fromEntries(formProduct);
    const randomNum = sessionStorage.getItem('randomNum');
    newProduct.id = randomNum;

    createRow(newProduct, tableBody);
    setNumbers();
    addProductGoods(newProduct);
    createSumModalTotal(newProduct);
    createSumTotal();

    modalTotalPrice.innerHTML = '';
    form.reset();
    overlay.classList.remove('active');
  });
  form.addEventListener('change', () => {
    const formProduct = new FormData(form);
    const newProduct = Object.fromEntries(formProduct);
    createSumModalTotal(newProduct);
  });

};

