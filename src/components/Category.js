import React from 'react';
import Table from 'react-bulma-components/lib/components/table';
import { CategoryItem } from './CategoryItem';
import { ReactSortable } from "react-sortablejs";
import { AddButton } from './AddButton';

export function Category({ files, items, onAddItem, onSave, onItemsSave, onDelete }) {
  return (<>
    <Table>
      <thead>
        <tr>
          <td><AddButton onClick={onAddItem} /></td>
          <td>ID</td>
          <td>Name</td>
          <td>Description</td>
          <td>File name</td>
          <td>Visible</td>
          <td>Size</td>
          <td>Downloads</td>
          <td>Actions</td>
        </tr>
      </thead>
      <ReactSortable tag='tbody'
        handle=".drag-able"
        list={items}
        setList={onItemsSave}
        animation={200}
        delayOnTouchStart={true}
        delay={0}>
        {items.map(item => <CategoryItem
          key={item.id}
          item={item}
          files={files}
          onSave={onSave}
          onDelete={onDelete} />)}
      </ReactSortable>
    </Table>
  </>);
}
