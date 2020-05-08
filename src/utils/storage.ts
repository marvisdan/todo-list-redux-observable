export const getItem = (key: string) =>
  Promise.resolve().then(() => JSON.parse(localStorage.getItem(key)));

export const setItem = (key: string, value: unknown) =>
  Promise.resolve().then(() =>
    localStorage.setItem(key, JSON.stringify(value))
  );

export const removetItem = (key: string) =>
  Promise.resolve().then(() => localStorage.removeItem(key));
