export const createSumTotal = () => {
  const priceTotals = document.querySelectorAll('.table__cell_total');
  const cmsTotalPrice = document.querySelector('.cms__total-price');
  let sumPriceTotals = 0;
  for (let priceTotal of priceTotals) {
    sumPriceTotals += +(priceTotal.textContent).slice(1);
  };
  cmsTotalPrice.innerHTML = `$${sumPriceTotals}`;
};

export const createSumModalTotal = (newProduct) => {
  const modalTotalPrice = document.querySelector('.modal__total-price');
  let sumModalTotal = newProduct.count == 0 ?
      newProduct.price * 1 : newProduct.count * newProduct.price;
  modalTotalPrice.innerHTML = `$${sumModalTotal}`;
};

