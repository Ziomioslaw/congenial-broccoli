import React, { Component } from 'react';
import { Categories } from './Categories';
import { Notepad } from './Notepad';
import { Header } from './Header';
import Box from 'react-bulma-components/lib/components/box';
import { TabPanel } from '../utilities/TabPanel';

class App extends Component {

  constructor() {
    super();

    const tabPanel = new TabPanel();

    tabPanel.addTab('Categories', <Categories />);
    tabPanel.addTab('Notepad', <Notepad />);

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
    return (<>
        <Header
          tabPanel={this.state.tabPanel}
          onTabChange={tab => this.onTabChange(tab)} />
        <Box>
          {this.state.tabPanel.getActiveValue()}
        </Box>
      </>);
  }
}

export default App;
