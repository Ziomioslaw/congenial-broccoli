import { Component } from 'react';
import { Category } from "./Category";

export class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/ziomioslaw/congenial-broccoli/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  }

  render() {
    return this.state.categories.map(c => Category(c));
  }
}
