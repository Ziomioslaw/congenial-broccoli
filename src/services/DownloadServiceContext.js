import React from "react";

class DownloadService {

  static REST_URL = 'https://my-json-server.typicode.com/ziomioslaw/congenial-broccoli/';

  async getCategories() {
    return fetch(`${DownloadService.REST_URL}categories`)
      .then(res => res.json());
  }

  async getCategory(categoryId) {
    return fetch(`${DownloadService.REST_URL}categories/${categoryId}`)
      .then(res => res.json());
  }
}

const DownloadServiceContext = React.createContext(new DownloadService());

export const DownloadServiceProvider = DownloadServiceContext.Provider;
export const DownloadServiceConsumer = DownloadServiceContext.Consumer;

export default DownloadServiceContext;
