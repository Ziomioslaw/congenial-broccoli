import './App.scss';
import React, { Component } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Tabs from 'react-bulma-components/lib/components/tabs';
import { Categories } from './Categories';
import { Actions } from './Actions';
import { Notepad } from './Notepad';
import { Header } from './Header';
import { ServerStatus } from './ServerStatus';

class TabPanel {

  constructor() {
    this.tabs = {};
  }
  
  addTab(tabName, element) {
    this.activeTab = this.activeTab ?? tabName;
    this.tabs[tabName] = element;
  }

  getTabsNames() {
    return Object.keys(this.tabs);
  }
}

class App extends Component {

  constructor() {
    super();

    this.tabPanel = new TabPanel();
    this.tabPanel.addTab('Categories', <Categories />);
    this.tabPanel.addTab('Notepad', <Notepad />);
    this.tabPanel.addTab('Server Status', <ServerStatus />);

    this.state = {
      activeTab: 'Categories'
    };
  }

  isActiveTab(tabName) {
    return this.state.activeTab === tabName;
  }

  getActiveElement() {
    return this.tabPanel.tabs[this.state.activeTab];
  }

  setActiveTab(tabName) {
    this.setState({
      ...this.state,
      activeTab: tabName
    });
  }

  render() {
    return (
      <Section>
        <Header />

        <Tabs type="boxed" fullwidth={false}>
          {this
              .tabPanel
              .getTabsNames()
              .map(name => <Tabs.Tab key={name} active={this.isActiveTab(name)} onClick={() => this.setActiveTab(name)}>{name}</Tabs.Tab>)}
        </Tabs>

        {this.tabPanel.tabs[this.state.activeTab]}

        <Actions />
      </Section>
    );
  }
}

export default App;
