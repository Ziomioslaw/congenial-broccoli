import React from "react";

class DownloadService {

  constructor() {
    this.db = require('./db.json');
  }

  async getCategories() {
    return Promise.resolve(this.db.categories);
  }

  async getCategory(categoryId) {
    const category = this.db.categories.find(category => category.id === categoryId)

    return Promise.resolve({
      ...category,
      items: category.items.map(item => ({
        ...item,
        visible: item.visible === 1
      })).sort((a, b) => a.order - b.order)
    });
  }

  async saveCategoryItem(categoryItem) {
    return Promise.resolve(
      this.db = {
        ...this.db,
        categories: this.db.categories.map(
          category => category.id !== categoryItem.categoryId
            ? category
            : {
              ...category,
              items: category.items.map(
                item => item.id !== categoryItem.id
                  ? item
                  : { ...categoryItem, visible: categoryItem.visible ? 1 : 0 })
            })
      });
  }

  async getNotepad() {
    return Promise.resolve(this.db.notes);
  }

  async getFilesInCategoryDirectory(categoryId) {
    return await this.getCategory(categoryId)
      .then(category => category.directory)
      .then(directory => this.db.files[directory]);
  }

  async saveNotepad(notes) {
    return new Promise(() => {
      this.db.notes = notes;
    });
  }

  async addItem(item) {
    const category = this.db.categories.find(category => category.id === item.categoryId);
    const newId = Math.max(...category.items.map(i => i.id)) + 1;

    category.items = [
      ...category.items.map((item, index) => ({
        ...item,
        order: (index + 1) * 10
      })),
      {
        ...item,
        id: newId,
        order: 0
      }
    ];

    return Promise.resolve(newId);
  }

  async deleteItem(item) {
    return Promise.resolve(
      this.db.categories = this.db.categories.map(category => item.categoryId !== category.id
        ? category
        : {
          ...category,
          items: category.items.filter(i => i.id !== item.id)
        })
    );
  }

  async uploadItem(categoryId, link) {
    const category = await this.getCategory(categoryId);
    const tokens = link.split('/');
    const lastToken = tokens[tokens.length - 1];

    this.db.files[category.directory] = [
      ...this.db.files[category.directory],
      {
        name: lastToken,
        size: Math.floor(Math.random() * 2323) + 234
      }
    ];

    return true;
  }

  async uploadFile(categoryId, file) {
    const category = await this.getCategory(categoryId);
    const directory = category.directory;

    this.db.files[directory] = [
      ...this.db.files[directory],
      {
        name: file.name,
        size: Math.floor(Math.random() * 2323) + 234
      }
    ];

    return true;
  }

  async deleteFile(categoryId, file) {
    const category = await this.getCategory(categoryId);
    const directory = category.directory;

    this.db.files[directory] = this.db.files[directory].filter(f => f.name !== file.name);
  }
}

const originalObject = new DownloadService();

const loginWrapper = Object.getOwnPropertyNames(Object.getPrototypeOf(originalObject))
  .filter(memberName => 'function' === typeof originalObject[memberName])
  .reduce((p, methodName) => ({
    ...p,
    [methodName]: (...args) => {
      console.log(`DownloadService.${methodName}`, args);
      const result = originalObject[methodName](...args);
      console.log(`DownloadService.${methodName} result:`, result);

      return result;
    }
  }), {});

const DownloadServiceContext = React.createContext(loginWrapper);

export const DownloadServiceProvider = DownloadServiceContext.Provider;
export const DownloadServiceConsumer = DownloadServiceContext.Consumer;

export default DownloadServiceContext;
