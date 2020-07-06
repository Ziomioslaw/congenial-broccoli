import './InlineEdit.scss';
import React, { Component } from 'react';
import { Input } from 'react-bulma-components/lib/components/form';
import ReactDOM from 'react-dom';

export class InlineEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showEditor: false,
      originalValue: props.value,
      currentValue: props.value
    };

    this.showEditor = this.showEditor.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  showEditor() {
    this.setState({
      ...this.state,
      showEditor: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const inputElement = ReactDOM.findDOMNode(this.refs.input);
    if (inputElement === null) {
      return;
    }

console.log('inputElement', inputElement);

    if (this.state.showEditor && !prevState.showEditor) {
      inputElement.focus();
    } else if (this.state.editing && prevProps.text !== this.props.text) {
      this.cancel();
    }
  }

  changeValue(e) {
    this.setState({
      ...this.state,
      currentValue: e.target.value
    });
  }

  cancel() {
    this.setState({
      ...this.state,
      currentValue: this.state.originalValue,
      showEditor: false
    });
  }

  keyDown(event) {
    if (event.keyCode === 13) {
      this.setState({
        ...this.state,
        originalValue: this.state.currentValue,
        showEditor: false
      });
    }
    else if (event.keyCode === 27) {
      this.cancel();
    }
  }

  render() {
    if (this.state.showEditor) {
      return (<Input
        type="text"
        value={this.state.currentValue}
        onChange={this.changeValue}
        onKeyDown={this.keyDown}
        onBlur={_ => this.cancel()}
        ref="input" />);
    }

    return (<span onClick={this.showEditor}>{
      (this.state.currentValue !== null && this.state.currentValue.trim() !== '')
        ? this.state.currentValue
        : <i className="no-value">empty</i>}</span>);
  }
}
