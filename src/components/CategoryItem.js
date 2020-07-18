import './CategoryItem.scss';
import React from 'react';
import { Checkbox, Select } from 'react-bulma-components/lib/components/form';
import { DisplayByteSize } from './DisplayByteSize';
import { InlineEdit } from './InlineEdit';
import Icon from 'react-bulma-components/lib/components/icon';

export function CategoryItem({ item, files, onVisibleChange, onPathChange }) {
  return (<tr className="vertical-align-middle">
    <td><Icon className="drag-able" icon="bars" color="info" /></td>
    <td>{item.id}</td>
    <td><InlineEdit value={item.name} /></td>
    <td><InlineEdit value={item.description} /></td>
    <td>
      <Select value={item.path} onChange={e => onPathChange(item.id, e.target.value)}>
        {files.map((file, i) => <option key={i} value={file}>{file}</option>)}
      </Select>
    </td>
    <td><Checkbox onChange={_ => onVisibleChange(item.id, !item.visible)} checked={item.visible} /></td>
    <td><DisplayByteSize value={item.size} /></td>
    <td>{item.downloaded}</td>
  </tr>);
}
