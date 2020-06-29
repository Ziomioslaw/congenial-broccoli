import React from 'react';
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';


export function Category(category) {
  return (<Section key={category.id}>
    <Card>
      <Card.Header>
        <Card.Header.Title>{category.name}</Card.Header.Title>
      </Card.Header>
      <Content>
        {category.directory}
        <Button>Delete</Button>
      </Content>
    </Card>
    </Section>);
}
