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
      files: []
    };

    this.onDelete = this.onDelete.bind(this);
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

  render() {
    if (this.state.files.length === 0 || !this.state.category) {
      return <Loader />
    }

    return (<>
      <Category
        categoryId={this.props.categoryId}
        files={this.state.files}
        items={this.state.category.items} />
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
