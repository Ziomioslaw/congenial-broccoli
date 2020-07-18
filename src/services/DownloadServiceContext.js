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
}

const DownloadServiceContext = React.createContext(new DownloadService());

export const DownloadServiceProvider = DownloadServiceContext.Provider;
export const DownloadServiceConsumer = DownloadServiceContext.Consumer;

export default DownloadServiceContext;
