import elemFromPage from './elemFromPage.js';
import render from './render.js';
import {createSumTotal, createSumModalTotal} from './calcAmount.js';
import goods from './arrayWithData.js';
import {createImagePreview} from './imagePreview.js';


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

createImagePreview();

export const closeModal = () => {
  overlay.classList.remove('active');
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.closest('.modal__close')) {
      overlay.classList.remove('active');
    }
  });

  tableBody.addEventListener('click', (e) => {
    if (e.target.closest('.table__btn_pic')) {
      const urlImage = e.target.closest('.table__btn_pic').dataset.pic;
      const win = open('about:blank', '', `width = 800, height = 600,
        top = ${(screen.height / 2) - (screen.height / 3.2)},
        left = ${(screen.width / 2) - (screen.width / 5)}`);
      win.document.body.innerHTML =`<img src="${urlImage}">`;
    }
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
    newProduct.pic = "https://demos.transloadit.com/79/c3dc3985a64dce869f9a780bb33d25/desert.jpg";

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

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });
  reader.readAsDataURL(file);
});


