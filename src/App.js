import './App.scss';
import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import Card from 'react-bulma-components/lib/components/card';
import Content from 'react-bulma-components/lib/components/content';
import Button from 'react-bulma-components/lib/components/button';
import { Textarea } from 'react-bulma-components/lib/components/form';
import Tabs from 'react-bulma-components/lib/components/tabs';

function Header() {
  return (<Box>
    <Heading>
      Download
    </Heading>
  </Box>);
}

function Category(c) {
    return (<Card key={c.id}>
      <Card.Header>
        <Card.Header.Title>{c.name}</Card.Header.Title>
      </Card.Header>
      <Content>
        {c.directory}
      </Content>
    </Card>);
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
    return this.state.categories.map(c => Category(c))
  }
}

function Notepad() {
  return (<Textarea name="comment" placeholder="Textarea" readOnly />)
}

function ActionPanel() {
  return (<Box>
    <Button>Rebuild</Button>
  </Box>
  )
}


class App extends Component {
  static TABS = {
    Categories: 1,
    Notepad: 2
  }

  constructor() {
    super();

    this.state = {
      activeTab: App.TABS.Categories
    }
  }

  isActiveTab(tab) {
    return this.state.activeTab === tab;
  }

  changeActiveTab(tab) {
    this.setState({
      ...this.state,
      activeTab: tab
    });
  }

  render() {
    const activeTab = this.state.activeTab === App.TABS.Categories
      ? <Categories />
      : <Notepad />;

    return (
      <Section>
        <Header />

        <Tabs type="boxed" fullwidth={false}>
          <Tabs.Tab active={this.isActiveTab(App.TABS.Categories)} onClick={() => this.changeActiveTab(App.TABS.Categories)}>Categories</Tabs.Tab>
          <Tabs.Tab active={this.isActiveTab(App.TABS.Notepad)} onClick={() => this.changeActiveTab(App.TABS.Notepad)}>Notepad</Tabs.Tab>
        </Tabs>

        {activeTab}

        <ActionPanel />
      </Section>
    );
  }
}

export default App;
