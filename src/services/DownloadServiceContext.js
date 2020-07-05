import React from "react";

class DownloadService {

  constructor() {
    this.db = require('./db.json');
  }

  async getCategories() {
    return Promise.resolve(this.db.categories);
  }

  async getCategory(categoryId) {
    return Promise.resolve(this.db.categories.find(c => c.id === categoryId));
  }

  async getNotepad() {
    return Promise.resolve(this.db.notes);
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
