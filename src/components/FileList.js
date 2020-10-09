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

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(file) {
    console.log('onDelete', file);
  }

  render() {
    if (!this.props.files) {
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
          {this.props.files.map((file, index) => <tr key={index}>
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
