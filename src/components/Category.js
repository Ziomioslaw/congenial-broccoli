import React, { Component } from 'react';
import DownloadServiceContext from 'services/DownloadServiceContext';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import { CategoryItem } from './CategoryItem';
import { ReactSortable } from "react-sortablejs";

export class Category extends Component {

  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      category: null,
      files: []
    };

    this.setList = this.setList.bind(this);
  }

  async loadDate(categoryId) {
    this.setState({
      ...this.state,
      category: await this.context.getCategory(categoryId),
      files: await this.context.getFilesInCategoryDirectory(categoryId)
    });
  }

  componentDidMount() {
    return this.loadDate(this.props.categoryId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      return this.loadDate(this.props.categoryId);
    }
  }

  setList(items) {
    this.setState({
      ...this.state,
      category: {
        ...this.state.category.items,
        items: items.map((item, index) => ({
          ...item,
          order: index * 10
        }))
      }
    });
  }

  sortItems(a, b) {
    return a.order - b.order;
  }

  render() {
    if (!this.state.category) {
      return <Loader />
    }

    const items = this.state.category.items.sort(this.sortItems);

    return (
      <Table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
            <td>File name</td>
            <td>Visible</td>
            <td>Size</td>
            <td>Order</td>
            <td>Downloads</td>
          </tr>
        </thead>
        <ReactSortable tag='tbody'
          list={this.state.category.items}
          setList={this.setList}
          animation={200}
          delayOnTouchStart={true}
          delay={2}>
          {items.map(item => <CategoryItem key={item.id} item={item} files={this.state.files} />)}
        </ReactSortable>
      </Table>);
  }
}
