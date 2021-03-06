import React, { Component } from 'react';
import DownloadServiceContext from 'services/DownloadServiceContext';
import Loader from 'react-bulma-components/lib/components/loader';
import { Category } from './Category';
import { FileList } from './FileList';
import AddFileItem from './AddFileItem';

export class CategoryDataWrapper extends Component {
  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      category: null,
      files: null
    };

    this.onDelete = this.onDelete.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.onLinkUpload = this.onLinkUpload.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onItemsSave = this.onItemsSave.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
  }

  async componentDidMount() {
    return await this.loadData(this.props.categoryId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      return await this.loadData(this.props.categoryId);
    }
  }

  async loadData(categoryId) {
    this.setState({
      ...this.state,
      category: await this.context.getCategory(categoryId),
      files: await this.context.getFilesInCategoryDirectory(categoryId)
    });
  }

  async onDelete(file) {
    this.context.deleteFile(this.props.categoryId, file);
    await this.loadData(this.props.categoryId);
  }

  async onFileUpload(event) {
    const categoryId = this.props.categoryId;

    for (const file of event.files) {
      await this.context.uploadFile(categoryId, file);
    }

    if (event.files.length > 0) {
      await this.loadData(categoryId);
    }
  }

  async onLinkUpload(event) {
    const categoryId = this.props.categoryId;

    if (await this.context.uploadItem(categoryId, event.link)) {
      await this.loadData(categoryId);
    }
  }

  async onAddItem() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const file = this.state.files.sort((a, b) => a.date > b.date)[0];

    const newItem = {
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
    };

    await this.context.addItem(newItem);
    await this.loadData(this.props.categoryId);
  }

  async onSave(newItem) {
    const newState = {
      ...this.state,
      category: {
        ...this.state.category,
        items: this.state.category.items.map(item => item.id === newItem.id
          ? {
            ...newItem,
            size: this.state.files.find(f => f.name === newItem.path).size
          }
          : item)
      }
    };

    this.setState(newState);

    await this.context.saveCategoryItem(newState.category.items.find(item => item.id === newItem.id));
    await this.loadData(this.props.categoryId);
  }

  async onItemsSave(items) {
    const curentItems = this.state.category.items;
    const newItemsList = items.map((item, index) => ({ ...item, order: index * 10 }));
    const itemsToSave = newItemsList.filter((newItem) => curentItems.find(i => i.id === newItem.id).order !== newItem.order);
    itemsToSave.forEach(async item => await this.context.saveCategoryItem(item));

    await this.loadData(this.props.categoryId);
  }

  async onItemDelete(item) {
    await this.context.deleteItem(item);
    await this.loadData(this.props.categoryId);
  }

  render() {
    if (!this.state.files || !this.state.category) {
      return <Loader />
    }

    return (<>
      <Category
        categoryId={this.props.categoryId}
        files={this.state.files}
        items={this.state.category.items}
        onAddItem={this.onAddItem}
        onSave={this.onSave}
        onItemsSave={this.onItemsSave}
        onDelete={this.onItemDelete} />
      <FileList
        files={this.state.files}
        onDelete={this.onDelete} />
      <AddFileItem
        category={this.props.category}
        onLinkUpload={this.onLinkUpload}
        onFileUpload={this.onFileUpload} />
    </>)
  }
}
