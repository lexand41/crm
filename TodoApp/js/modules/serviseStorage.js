const getLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(`${key}`)) || [];

const setLocalStorage = (key, object) => {
  localStorage.setItem(`${key}`, JSON.stringify(object));
};

export default {
  getLocalStorage,
  setLocalStorage,
};
