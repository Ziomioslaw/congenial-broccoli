import React, { Component } from 'react';
import DownloadServiceContext from 'services/DownloadServiceContext';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import { CategoryItem } from './CategoryItem';
import { ReactSortable } from "react-sortablejs";
import AddCategoryItem from './AddCategoryItem';
import { AddButton } from './AddButton';


export class Category extends Component {

  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      category: null,
      files: []
    };

    this.setList = this.setList.bind(this);
    this.onVisibleChange = this.onVisibleChange.bind(this);
    this.onPathChange = this.onPathChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onLinkUpload = this.onLinkUpload.bind(this);
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
    const curentItems = this.state.category.items;
    const newItemsList = items.map((item, index) => ({ ...item, order: index * 10 }));
    const itemsToSave = newItemsList.filter((newItem) => curentItems.find(i => i.id === newItem.id).order !== newItem.order);

    this.setState({
      ...this.state,
      category: {
        ...this.state.category,
        items: newItemsList
      }
    });

    itemsToSave.forEach(async item => await this.context.saveCategoryItem(item));
  }

  sortItems(a, b) {
    return a.order - b.order;
  }

  async onVisibleChange(itemId, visible) {
    const newState = {
      ...this.state,
      category: {
        ...this.state.category,
        items: this.state.category.items.map(item => ({
          ...item,
          visible: item.id === itemId ? visible : item.visible
        }))
      }
    };

    this.setState(newState);

    await this.context.saveCategoryItem(newState.category.items.find(item => item.id === itemId));
  }

  async onPathChange(itemId, newPath) {
    const newState = {
      ...this.state,
      category: {
        ...this.state.category,
        items: this.state.category.items.map(item => ({
          ...item,
          path: item.id === itemId ? newPath : item.path
        }))
      }
    };

    this.setState(newState);

    await this.context.saveCategoryItem(newState.category.items.find(item => item.id === itemId));
  }

  async onFileUpload(event) {
    const categoryId = this.props.categoryId;

    for (const file of event.files) {
      await this.context.uploadFile(categoryId, file);
    }

    if (event.files.length > 0) {
      await this.loadDate(categoryId);
    }
  }

  async onLinkUpload(event) {
    const categoryId = this.props.categoryId;

    if (await this.context.uploadItem(categoryId, event.link)) {
      await this.loadDate(categoryId);
    }
  }

  render() {
    if (!this.state.category) {
      return <Loader />
    }

    const items = this.state.category.items.sort(this.sortItems);

    return (<>
      <Table>
        <thead>
          <tr>
            <td><AddButton /></td>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
            <td>File name</td>
            <td>Visible</td>
            <td>Size</td>
            <td>Downloads</td>
          </tr>
        </thead>
        <ReactSortable tag='tbody'
          handle=".drag-able"
          list={this.state.category.items}
          setList={this.setList}
          animation={200}
          delayOnTouchStart={true}
          delay={2}>
          {items.map(item => <CategoryItem
            key={item.id}
            item={item}
            files={this.state.files}
            onVisibleChange={this.onVisibleChange}
            onPathChange={this.onPathChange} />)}
        </ReactSortable>
      </Table>

      <AddCategoryItem
        category={this.state.category}
        onLinkUpload={this.onLinkUpload}
        onFileUpload={this.onFileUpload} />
    </>);
  }
}
