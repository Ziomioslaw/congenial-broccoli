import React from 'react';
import Columns from 'react-bulma-components/lib/components/columns';
import { Field, Control, Label, InputFile, Input } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';

export default function AddCategoryItem() {

  return (<Columns>

      <Columns.Column>
        <Field>
          <Label>File</Label>
          <Control>
            <InputFile icon={<Icon icon="upload" />} />
            <Button type="primary">Submit</Button>
          </Control>
        </Field>
      </Columns.Column>

      <Columns.Column>
        <Field>
          <Label>Wget link</Label>
          <Control>
            <Input placeholder="Text input" />
            <Button type="primary">Submit</Button>
          </Control>
        </Field>
      </Columns.Column>

    </Columns>)
}
