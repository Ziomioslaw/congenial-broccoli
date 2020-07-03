import './App.scss';
import React, { Component } from 'react';
import { Categories } from './Categories';
import { Actions } from './Actions';
import { Notepad } from './Notepad';
import { Header } from './Header';
import { ServerStatus } from './ServerStatus';
import Box from 'react-bulma-components/lib/components/box';
import { TabPanel } from './TabPanel';

class App extends Component {

  constructor() {
    super();

    const tabPanel = new TabPanel();

    tabPanel.addTab('Categories', <Categories />);
    tabPanel.addTab('Notepad', <Notepad />);
    tabPanel.addTab('Server Status', <ServerStatus />);

    this.state = {
      tabPanel: tabPanel,
      activeTab: 'Categories'
    };
  }

  onTabChange(tab) {
    this.state.tabPanel.setActiveTab(tab);

    this.setState({
      ...this.state,
      activeTab: tab
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          tabPanel={this.state.tabPanel}
          onTabChange={tab => this.onTabChange(tab)} />

        <Box>
          {this.state.tabPanel.getActiveValue()}
        </Box>

        <Actions />
      </React.Fragment>
    );
  }
}

export default App;
