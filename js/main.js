import elemFromPage from './modules/elemFromPage.js';
import render from './modules/render.js';
import {closeModal, formControl} from './modules/control.js';
import {createSumTotal} from './modules/calcAmount.js';
import './modules/backend.js';

const {
  chbox,
  input,
} = elemFromPage;

const {
  setNumbers,
  renderGoods,
} = render;

{
  const init = () => {
    closeModal();
    renderGoods();
    formControl();
    setNumbers();
    createSumTotal();
    
    chbox.addEventListener("change", function() {
      input.disabled = chbox.checked ? 0 : 1;
      if (!chbox.checked) {
        input.value = '';
      }
    });
  };

  window.crmInit = init;
}

