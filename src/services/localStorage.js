export const setItem = (name, value) => {
  localStorage.setItem(name, value);
};

export const getItem = (name) => {
  return localStorage.getItem(name);
};

export const removeItem = (name) => {
  localStorage.removeItem(name);
};

export const getLocalStorage = () => {
  return localStorage;
};
