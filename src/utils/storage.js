export const getItem = (key) =>
  Promise.resolve().then(() => JSON.parse(localStorage.getItem(key)));

export const setItem = (key, value) =>
  Promise.resolve().then(() =>
    localStorage.setItem(key, JSON.stringify(value))
  );

export const removetItem = (key) =>
  Promise.resolve().then(() => localStorage.removeItem(key));
