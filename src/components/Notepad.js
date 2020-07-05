import React from 'react';
import { Textarea } from 'react-bulma-components/lib/components/form';

export function Notepad() {
  return (<Textarea name="comment" placeholder="Textarea" readOnly />);
}
