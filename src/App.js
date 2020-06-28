import './App.scss';
import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Tabs from 'react-bulma-components/lib/components/tabs';
import { Categories } from './Categories';
import { Actions } from './Actions';
import { Notepad } from './Notepad';
import { Header } from './Header';

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

        <Actions />
      </Section>
    );
  }
}

export default App;
