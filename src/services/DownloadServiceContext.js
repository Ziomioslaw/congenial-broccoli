import React from "react";

class DownloadService {

  static REST_URL = 'https://my-json-server.typicode.com/ziomioslaw/congenial-broccoli/';

  notepad = `## Linki i repozytoria dla Ubuntu

##Python
Python 2.6.6 (Strona projektu)

PyGTK all-in-one (Repozytorium)
Przeznaczona jest pod systemy 32bit. Plik ten zawiera wszystkie potrzebne nam biblioteki - PyGTK, PyCairo oraz PyGObject`;

  async getCategories() {
    return fetch(`${DownloadService.REST_URL}categories`)
      .then(res => res.json());
  }

  async getCategory(categoryId) {
    return fetch(`${DownloadService.REST_URL}categories/${categoryId}`)
      .then(res => res.json());
  }

  async getNotepad() {
    return Promise.resolve(this.notepad);
  }

  async saveNotepad(notepad) {
    return new Promise(() => {
      this.notepad = notepad;
    });
  }
}

const DownloadServiceContext = React.createContext(new DownloadService());

export const DownloadServiceProvider = DownloadServiceContext.Provider;
export const DownloadServiceConsumer = DownloadServiceContext.Consumer;

export default DownloadServiceContext;
