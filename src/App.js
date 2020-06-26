import React, { Component } from 'react';
import './App.css';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import List from 'react-bulma-components/lib/components/list';
import { Textarea } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';

function Header() {
  return (<Box>
    <Heading>
      Download
    </Heading>
  </Box>);
}

function Category(c) {
  return (<List.Item key={c.id}>{c.name} [{c.directory}]</List.Item>)
}

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/ziomioslaw/congenial-broccoli/categories')
      .then(res => res.json())
      .then(data => this.setState({ categories: data }));
  }

  render() {
    return (<Card>
      <Card.Header>
        <Card.Header.Title>Categories</Card.Header.Title>
      </Card.Header>
      <Content>
        <List>
          {this.state.categories.map(c => Category(c))}
        </List>
      </Content>
      <Card.Footer>
        <Card.Footer.Item renderAs="a">Add new Category</Card.Footer.Item>
      </Card.Footer>
    </Card>);
  }
}

function Notepad() {
  return (<Card>
      <Card.Header>
        <Card.Header.Title>Notes</Card.Header.Title>
      </Card.Header>
      <Card.Content>
        <Textarea name="comment" placeholder="Textarea" readOnly />
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item renderAs="a">Save</Card.Footer.Item>
      </Card.Footer>
    </Card>)
}

function ActionPanel() {
  return (<Box>
      <Button>Rebuild</Button>
    </Box>
  )
}

function App() {
  return (
    <Section>
      <Header />
      <Categories />
      <Notepad />

      <ActionPanel />
    </Section>
  );
}

export default App;
