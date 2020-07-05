import React, { Component } from 'react';
import DownloadServiceContext from 'DownloadServiceContext';
import Loader from 'react-bulma-components/lib/components/loader';
import Table from 'react-bulma-components/lib/components/table';
import { Checkbox } from 'react-bulma-components/lib/components/form';

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

  componentDidUpdate(prevProps) {
    if (prevProps.categoryId !== this.props.categoryId) {
      return this.loadDate(this.props.categoryId);
    }
  }

  onVisibleChange(itemId, event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState({
      ...this.state,
      category: {
        ...this.state.category,
        visible: value
      }
    });
  }

  render() {
    if (!this.state.category) {
      return <Loader />
    }

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
        <tbody>
          {this.state.category.items.map(item => <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.path}</td>
            <td><Checkbox onChange={e => this.onVisibleChange(item.id, e)} checked={item.visible === 1} /></td>
            <td><DisplayByteSize value={item.size} /></td>
            <td>{item.order}</td>
            <td>{item.downloaded}</td>
          </tr>)}
        </tbody>
      </Table>);
  }
}

function DisplayByteSize({ value }) {
  const i = Math.floor(Math.log(value) / Math.log(1024));
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return `${(value / Math.pow(1024, i)).toFixed(2) * 1} ${sizes[i]}`;
}
