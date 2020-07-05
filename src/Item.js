import React, { Component } from 'react';
import { Checkbox } from 'react-bulma-components/lib/components/form';

export class Item extends Component {

	constructor(props) {
		super(props);

		this.state = {
			...props.item,
			visible: props.item.visible === 1
		};
	}

	onVisibleChange = (event) => {
    this.setState({
			...this.state,
			visible: !this.state.visible
    });
	}

	render() {
		return (<tr>
			<td>{this.state.id}</td>
			<td>{this.state.name}</td>
			<td>{this.state.description}</td>
			<td>{this.state.path}</td>
			<td><Checkbox onChange={this.onVisibleChange} checked={this.state.visible} /></td>
			<td><DisplayByteSize value={this.state.size} /></td>
			<td>{this.state.order}</td>
			<td>{this.state.downloaded}</td>
		</tr>);
	}
}

function DisplayByteSize({ value }) {
  const index = Math.floor(Math.log(value) / Math.log(1024));
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  return `${(value / Math.pow(1024, index)).toFixed(2) * 1} ${sizes[index]}`;
}
