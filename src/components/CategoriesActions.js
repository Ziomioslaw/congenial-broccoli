import React from 'react';
import Button from 'react-bulma-components/lib/components/button';

export function CategoriesActions() {
  return (<Button.Group>
    <Button>Rebuild</Button>
    <Button>Refresh files</Button>
  </Button.Group>);
}
