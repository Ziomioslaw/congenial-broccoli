import React from 'react';
import { Field, Control, Label, InputFile } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';

export default function AddCategoryItem() {

  return (
    <Field>
      <Label>File</Label>
      <Control>
        <InputFile icon={<Icon icon="upload" />} />
      </Control>
    </Field>)
}
