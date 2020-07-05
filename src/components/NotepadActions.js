import React from 'react';
import Box from 'react-bulma-components/lib/components/box';
import Button from 'react-bulma-components/lib/components/button';

export function NotepadActions({ onSaveButton }) {
  return (<Box>
    <Button onClick={onSaveButton}>Save</Button>
  </Box>)
}
