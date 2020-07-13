import './Item.scss';
import React, { Component } from 'react';
import { Checkbox, Select } from 'react-bulma-components/lib/components/form';
import { DisplayByteSize } from './DisplayByteSize';
import { InlineEdit } from './InlineEdit';

export class Item extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ...props.item,
      visible: props.item.visible === 1
    };
  }

  onVisibleChange() {
    this.setState({
      ...this.state,
      visible: !this.state.visible
    });
  }

  onFileChange(event) {
    this.setState({
      ...this.state,
      path: event.target.value
    })
  }

  render() {
    return (<tr class="vertical-align-middle">
      <td>{this.state.id}</td>
      <td><InlineEdit value={this.state.name} /></td>
      <td><InlineEdit value={this.state.description} /></td>
      <td>
        <Select value={this.state.path} onChange={e => this.onFileChange(e)}>
          {this.props.files.map((file, i) => <option key={i} value={file}>{file}</option>)}
        </Select>
      </td>
      <td><Checkbox onChange={_ => this.onVisibleChange()} checked={this.state.visible} /></td>
      <td><DisplayByteSize value={this.state.size} /></td>
      <td>{this.state.order}</td>
      <td>{this.state.downloaded}</td>
    </tr>);
  }
}