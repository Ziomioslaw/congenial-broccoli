import './CategoryItem.scss';
import React from 'react';
import { Checkbox, Select } from 'react-bulma-components/lib/components/form';
import { DisplayByteSize } from './DisplayByteSize';
import { InlineEdit } from './InlineEdit';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';

export function CategoryItem({ item, files, onVisibleChange, onPathChange, onNewSave, onSave }) {
  const id = item.id;

  return (<tr className="vertical-align-middle">
    <td><Icon className="drag-able" icon="bars" color="info" /></td>
    <td>{id || 'new'}</td>
    <td><InlineEdit value={item.name} onChange={onSave} /></td>
    <td><InlineEdit value={item.description} onChange={onSave} /></td>
    <td>
      <Select value={item.path} onChange={e => onPathChange(item.id, e.target.value)}>
        {files.map((file, index) => <option key={index} value={file.name}>{file.name}</option>)}
      </Select>
    </td>
    <td><Checkbox onChange={_ => onVisibleChange(item.id, !item.visible)} checked={item.visible} /></td>
    <td><DisplayByteSize value={item.size} /></td>
    <td>{id ? item.downloaded : buildSaveButton(onNewSave)}</td>
    <td><Button className="delete"></Button></td>
  </tr>);
}

function buildSaveButton(onSave) {
  return <Button onClick={onSave}>Save</Button>
}
