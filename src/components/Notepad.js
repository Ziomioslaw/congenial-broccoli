import React, { Component } from 'react';
import DownloadServiceContext from 'services/DownloadServiceContext';
import { Textarea } from 'react-bulma-components/lib/components/form';
import { NotepadActions } from './NotepadActions';
import Loader from 'react-bulma-components/lib/components/loader';

export class Notepad extends Component {
  static contextType = DownloadServiceContext;

  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSaveButton = this.onSaveButton.bind(this);
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      value: await this.context.getNotepad()
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onSaveButton() {
    this.context.saveNotepad(this.state.value);
  }

  render() {
    if (this.state.value === null) {
      return <Loader />
    }

    return (<>
      <Textarea rows={25} onChange={this.handleChange} value={this.state.value} />
      <NotepadActions onSaveButton={this.onSaveButton} />
    </>);
  }
}
