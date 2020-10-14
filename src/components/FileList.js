import React from 'react';
import Table from 'react-bulma-components/lib/components/table';
import Button from 'react-bulma-components/lib/components/button';
import Loader from 'react-bulma-components/lib/components/loader';

function onDeleteButton(file, onDelete) {
  return () => {
    if (window.confirm(`Do you want delete the file '${file.name}'?`)) {
      onDelete(file, onDelete);
    }
  };
}

export function FileList({ files, onDelete }) {
  if (!files) {
    return <Loader />
  }

  return (<Table>
    <thead>
      <tr>
        <th>File name</th>
        <th>File size</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {files.map((file, index) => <tr key={index}>
        <td>{file.name}</td>
        <td>{file.size}</td>
        <td>
          <Button onClick={onDeleteButton(file, onDelete)}>Delete</Button>
        </td>
      </tr>)}
    </tbody>
  </Table>);
}
