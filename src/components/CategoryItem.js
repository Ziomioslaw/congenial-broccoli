import './CategoryItem.scss';
import React from 'react';
import { Checkbox, Select } from 'react-bulma-components/lib/components/form';
import { DisplayByteSize } from './DisplayByteSize';
import { InlineEdit } from './InlineEdit';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';
import { onDeleteConfirm } from '../utilities/dialogs';

export function CategoryItem({ item, files, onSave, onDelete }) {
  const id = item.id;

  return (<tr className="vertical-align-middle">
    <td><Icon className="drag-able" icon="bars" color="info" /></td>
    <td>{id || 'new'}</td>
    <td><InlineEdit value={item.name} onSave={onStringFieldChange(item, onSave, 'name')} /></td>
    <td><InlineEdit value={item.description} onSave={onStringFieldChange(item, onSave, 'description')} /></td>
    <td>
      <Select value={item.path} onChange={onSelectFieldChange(item, onSave, 'path')}>
        {files.map((file, index) => <option key={index} value={file.name}>{file.name}</option>)}
      </Select>
    </td>
    <td><Checkbox onChange={onBooleanFieldChange(item, onSave, 'visible')} checked={item.visible} /></td>
    <td><DisplayByteSize value={item.size} /></td>
    <td>{id ? item.downloaded : buildSaveButton(item, onSave)}</td>
    <td><Button className="delete" onClick={onDeleteConfirm(`Do you want delete the item ${item.name}`, item, onDelete)}></Button></td>
  </tr>);
}

function onStringFieldChange(item, onSave, fieldName) {
  return (event) => {
    return onSave({
      ...item,
      [fieldName]: event
    });
  };
}

function onBooleanFieldChange(item, onSave, fieldName) {
  return () => {
    return onSave({
      ...item,
      [fieldName]: !item[fieldName]
    });
  };
}

function onSelectFieldChange(item, onSave, fieldName) {
  return (event) => {
    return onSave({
      ...item,
      [fieldName]: event.target.value
    });
  };
}

function buildSaveButton(item, onSave) {
  return <Button onClick={() => onSave(item)}>Save</Button>
}
