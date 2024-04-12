import { StorageItems } from "./StorageItems";

export const useStorage = () => {
  const addItem = (name: StorageItems, value: string) => {
    if (localStorage.getItem(name) !== null) return;
    localStorage.setItem(name, `${value}`);
  };
  const getItem = (item: StorageItems) => {
    return localStorage.getItem(item);
  };
  const removeItem = async (item: StorageItems) => {
    localStorage.removeItem(item);
  };
  const changeValue = (item: StorageItems, newValue: string) => {
    removeItem(item);
    addItem(item, `${newValue}`);
  };

  return {
    addItem,
    getItem,
    removeItem,
    changeValue,
  };
};
