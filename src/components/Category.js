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
    this.onAddButton = this.onAddButton.bind(this);
    this.onNewSave = this.onNewSave.bind(this);
  }

  async loadData(categoryId) {
    this.setState({
      ...this.state,
      category: await this.context.getCategory(categoryId),
      files: await this.context.getFilesInCategoryDirectory(categoryId)
    });
  }

  componentDidMount() {
    return this.loadData(this.props.categoryId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      return this.loadData(this.props.categoryId);
    }
  }

  async onAddButton(event) {
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
    return this.state.category.items.some(i => !i.id);
  }

  async onNewSave() {
    await this.context.addItem(this.state.category.items.find(i => i.id === null));
    await this.loadData(this.props.categoryId);
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
        items: this.state.category.items.map(item =>
          item.id === itemId ? {
            ...item,
            path: newPath,
            size: this.state.files.find(f => f.name === newPath).size
          } : item
        )
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
      await this.loadData(categoryId);
    }
  }

  async onLinkUpload(event) {
    const categoryId = this.props.categoryId;

    if (await this.context.uploadItem(categoryId, event.link)) {
      await this.loadData(categoryId);
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
            <td>{this.isNewPresent() ? '' : <AddButton onClick={this.onAddButton} />}</td>
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
            onPathChange={this.onPathChange}
            onSave={this.onNewSave} />)}
        </ReactSortable>
      </Table>

      <AddCategoryItem
        category={this.state.category}
        onLinkUpload={this.onLinkUpload}
        onFileUpload={this.onFileUpload} />
    </>);
  }
}
