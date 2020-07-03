import React, { Component } from 'react';
import DownloadServiceContext from 'DownloadServiceContext';
import Loader from 'react-bulma-components/lib/components/loader';

export class Category extends Component {
  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      category: null
    };
  }

  async loadDate(categoryId) {
    this.setState({
      ...this.state,
      category: await this.context.getCategory(categoryId)
    });
  }

  componentDidMount() {
    return this.loadDate(this.props.categoryId);
  }
  
  componentDidUpdate() {
    return this.loadDate(this.props.categoryId);
  }
 
  render() {
    if (!this.state.category) {
      return <Loader />
    }

    return <b>{this.state.category.name}</b>
  }
}
