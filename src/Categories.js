import { Component } from 'react';
import { Category } from "./Category";
import DownloadServiceContext from './DownloadServiceContext';

export class Categories extends Component {
  static contextType = DownloadServiceContext;

  constructor() {
    super();

    this.state = {
      categories: []
    };
  }

  async componentDidMount() {
    this.setState({
      categories: await this.context.getCategories()
    });
  }

  render() {
    return this.state.categories.map(c => Category(c));
  }
}
