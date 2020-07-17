import './CategoryItem.scss';
import React, { Component } from 'react';
import { Checkbox, Select } from 'react-bulma-components/lib/components/form';
import { DisplayByteSize } from './DisplayByteSize';
import { InlineEdit } from './InlineEdit';
import Icon from 'react-bulma-components/lib/components/icon';

export class CategoryItem extends Component {

  constructor(props) {
    super(props);

    this.state = CategoryItem.getDerivedStateFromProps(props, {});
  }

  onVisibleChange() {
    this.props.onVisibleChange(this.state.id, !this.state.visible);
  }

  render() {
    return (<tr className="vertical-align-middle">
      <td><Icon className="drag-able" icon="bars" color="info" /></td>
      <td>{this.state.id}</td>
      <td><InlineEdit value={this.state.name} /></td>
      <td><InlineEdit value={this.state.description} /></td>
      <td>
        <Select value={this.state.path} onChange={e => this.props.onPathChange(this.state.id, e.target.value)}>
          {this.props.files.map((file, i) => <option key={i} value={file}>{file}</option>)}
        </Select>
      </td>
      <td><Checkbox onChange={_ => this.onVisibleChange()} checked={this.state.visible} /></td>
      <td><DisplayByteSize value={this.state.size} /></td>
      <td>{this.state.order}</td>
      <td>{this.state.downloaded}</td>
    </tr>);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      ...nextProps.item
    };
  }
}