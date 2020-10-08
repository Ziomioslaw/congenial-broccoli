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
      }))
    });
  }

  async saveCategoryItem(categoryItem) {
    categoryItem = { ...categoryItem, visible: categoryItem.visible ? 1 : 0 };

    return Promise.resolve(
      this.db = {
        ...this.db,
        categories: [
          ...this.db.categories.map(category => category.id !== categoryItem.categoryId
            ? category
            : {
              ...category,
              items: category.items.map(item => item.id === categoryItem.id ? categoryItem : item)
            })
        ]
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

  async uploadItem(categoryId, link) {
    const category = await this.getCategory(categoryId);
    const tokens = link.split('/');
    const lastToken = tokens[tokens.length - 1];

    this.db.files[category.directory] = [
      ...this.db.files[category.directory],
      lastToken
    ];

    return true;
  }

  async uploadFile(categoryId, file) {
    const category = await this.getCategory(categoryId);
    const directory = category.directory;

    this.db.files[directory] = [
      ...this.db.files[directory],
      file.name
    ];

    return true;
  }
}

const DownloadServiceContext = React.createContext(new DownloadService());

export const DownloadServiceProvider = DownloadServiceContext.Provider;
export const DownloadServiceConsumer = DownloadServiceContext.Consumer;

export default DownloadServiceContext;
