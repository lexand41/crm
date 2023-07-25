export const createImagePreview = () => {
  const inputModalImage = document.querySelector('.modal__file');
  const previewModalImage = document.createElement('img');
  const previewModalText = document.createElement('div');

  previewModalImage.className = 'modal__label_file-add visually-hidden';
  previewModalText.className = 'modal__label_file-text visually-hidden';

  inputModalImage.insertAdjacentElement('afterend', previewModalImage);
  inputModalImage.insertAdjacentElement('afterend', previewModalText);

  inputModalImage.addEventListener('change', () => {
    if (inputModalImage.files.length > 0 && inputModalImage.files[0].size > 1e6) {
      previewModalImage.classList.add('visually-hidden');
      previewModalText.classList.remove('visually-hidden');
      previewModalText.style.fontSize = '18px';
      previewModalText.style.color = 'red';
      previewModalText.textContent = 'Изображение не должно превышать размер 1 Мб'
    } else if (inputModalImage.files.length > 0) {
      previewModalText.classList.add('visually-hidden');
      const src = URL.createObjectURL(inputModalImage.files[0]);
      previewModalImage.src = src;
      previewModalImage.classList.remove('visually-hidden');
    } 
  });
};
