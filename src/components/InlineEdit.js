import './InlineEdit.scss';
import React, { Component } from 'react';
import { Input } from 'react-bulma-components/lib/components/form';


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

    this.textInput = React.createRef();
  }

  showEditor() {
    this.setState({
      ...this.state,
      showEditor: true
    });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.showEditor && !prevState.showEditor) {
      this.textInput.current.focus();
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
      const currentValue = this.state.currentValue;

      this.setState({
        ...this.state,
        originalValue: this.state.currentValue,
        showEditor: false
      });

      this.props.onSave(currentValue);
    } else if (event.keyCode === 27) {
      this.cancel();
    }
  }

  render() {
    if (this.state.showEditor) {
      return (<Input
        type="text"
        domRef={this.textInput}
        value={this.state.currentValue}
        onChange={this.changeValue}
        onKeyDown={this.keyDown}
        onBlur={_ => this.cancel()} />);
    }

    return (<span onClick={this.showEditor}>{
      (this.state.currentValue !== null && this.state.currentValue.trim() !== '')
        ? this.state.currentValue
        : <i className="no-value">empty</i>}</span>);
  }
}
