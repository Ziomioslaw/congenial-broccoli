import React, { useContext } from 'react';
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';

export function Category(category) {
  return (<Card key={category.id}>
      <Card.Header>
        <Card.Header.Title>{category.name}</Card.Header.Title>
      </Card.Header>
      <Content>
        {category.directory}
      </Content>
      <Card.Footer>
        <Card.Footer.Item></Card.Footer.Item>
      </Card.Footer>
    </Card>);
}
