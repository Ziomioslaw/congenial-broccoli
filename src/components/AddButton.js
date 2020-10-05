import React from 'react';
import Icon from 'react-bulma-components/lib/components/icon';
import Button from 'react-bulma-components/lib/components/button';

export function AddButton() {
  return (<Button>
      <Icon>
        <span className="fas fa-plus-circle" />
      </Icon>
    </Button>);
}
