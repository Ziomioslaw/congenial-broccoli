import React, { Component } from 'react';
import Table from 'react-bulma-components/lib/components/table';
import Button from 'react-bulma-components/lib/components/button';
import Loader from 'react-bulma-components/lib/components/loader';
import DownloadServiceContext from 'services/DownloadServiceContext';
import AddFileItem from './AddFileItem';

function onDeleteButton(file, onDelete) {
  return () => {
    if (window.confirm(`Do you want delete the file '${file.name}'?`)) {
      onDelete(file, onDelete);
    }
  };
}

export class FileList extends Component {

  static contextType = DownloadServiceContext;

  constructor() {
    super();

    this.state = {
      files: []
    };

    this.onDelete = this.onDelete.bind(this);
  }

  async loadData(categoryId) {
    this.setState({
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

  async onDelete(file) {
    this.context.deleteFile(this.props.categoryId, file);
    await this.loadData(this.props.categoryId);
  }

  render() {
    if (!this.state.files) {
      return <Loader />
    }

    return (<>
      <Table>
        <thead>
          <tr>
            <th>File name</th>
            <th>File size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.files.map((file, index) => <tr key={index}>
            <td>{file.name}</td>
            <td>{file.size}</td>
            <td>
              <Button onClick={onDeleteButton(file, this.onDelete)}>Delete</Button>
            </td>
          </tr>)}
        </tbody>
      </Table>

      <AddFileItem
        category={this.props.category}
        onLinkUpload={this.onLinkUpload}
        onFileUpload={this.onFileUpload} />
    </>
    );
  }
}
