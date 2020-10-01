import React, { Component } from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import { Field, Control, Label, InputFile, Input } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';


export default class AddCategoryItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      link: '',
      files: []
    };

    this.onChangeLink = this.onChangeLink.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onClickLinkSubmit = this.onClickLinkSubmit.bind(this);
    this.onClickFileSubmit = this.onClickFileSubmit.bind(this);
  }

  onChangeLink(event) {
    this.setState({
      ...this.state,
      link: event.target.value
    });
  }

  onChangeFile(event) {
    this.setState({
      ...this.state,
      files: [...event.target.files]
    });
  }

  onClickLinkSubmit() {
    this.props.onLinkUpload({ link: this.state.link });
    this.setState({
      ...this.state,
      link: ''
    });
  }

  onClickFileSubmit() {
    this.props.onFileUpload({ files: this.state.files });
    this.setState({
      ...this.state,
      files: []
    });
  }

  render() {
    return (<Columns>
      <Columns.Column>
        <Field>
          <Label>File</Label>
          <Control>
            <InputFile icon={<Icon icon="upload" />} onChange={this.onChangeFile} />
            <Button
              type="primary"
              disabled={this.state.files.length === 0}
              onClick={this.onClickFileSubmit}>
              Upload file
            </Button>
          </Control>
        </Field>
      </Columns.Column>

      <Columns.Column>
        <Field>
          <Label>Wget link</Label>
          <Control>
            <Input
              type="text"
              placeholder="Text input"
              value={this.state.link}
              onChange={this.onChangeLink} />
            <Button
              type="primary"
              disabled={this.state.link.trim().length === 0}
              onClick={this.onClickLinkSubmit}>
              Download link
            </Button>
          </Control>
        </Field>
      </Columns.Column>

    </Columns>);
  }
}
