import React, { Component } from 'react';
import DownloadServiceContext from 'services/DownloadServiceContext';
import Table from 'react-bulma-components/lib/components/table';
import { CategoryItem } from './CategoryItem';
import { ReactSortable } from "react-sortablejs";
import { AddButton } from './AddButton';


export class Category extends Component {

  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      newItem: null
    };

    this.setList = this.setList.bind(this);
    this.onAddButton = this.onAddButton.bind(this);
  }

  async onAddButton() {
    if (this.isNewPresent()) {
      return;
    }

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const file = this.state.files.sort((a, b) => a.date > b.date)[0];

    this.setState({
      ...this.state,
      category: {
        ...this.state.category,
        items: [
          {
            id: null,
            name: "",
            categoryId: this.props.categoryId,
            path: file.name,
            description: "",
            visible: true,
            created: `${yyyy}-${mm}-${dd}`,
            size: file.size,
            order: 0,
            downloaded: 0
          },
          ...this.state.category.items
        ]
      }
    });
  }

  isNewPresent() {
    return this.state.newItem;
  }

  setList(items) {
    const curentItems = this.props.items;
    const newItemsList = items.map((item, index) => ({ ...item, order: index * 10 }));
    const itemsToSave = newItemsList.filter((newItem) => curentItems.find(i => i.id === newItem.id).order !== newItem.order);

    itemsToSave.forEach(async item => await this.context.saveCategoryItem(item));
  }

  sortItems(a, b) {
    return a.order - b.order;
  }

  render() {
    const items = this.isNewPresent()
      ? [this.state.newItem, ...this.props.items]
      : this.props.items;

    return (<>
      <Table>
        <thead>
          <tr>
            <td>{this.isNewPresent() ? '' : <AddButton onClick={this.onAddButton} />}</td>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
            <td>File name</td>
            <td>Visible</td>
            <td>Size</td>
            <td>Downloads</td>
            <td>Actions</td>
          </tr>
        </thead>
        <ReactSortable tag='tbody'
          handle=".drag-able"
          list={this.props.items}
          setList={this.setList}
          animation={200}
          delayOnTouchStart={true}
          delay={2}>
          {items.map(item => <CategoryItem
            key={item.id}
            item={item}
            files={this.props.files}
            onSave={this.props.onSave} />)}
        </ReactSortable>
      </Table>
    </>);
  }
}
