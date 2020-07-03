import React from 'react';
import { Component } from 'react';
import DownloadServiceContext from './DownloadServiceContext';
import Columns from 'react-bulma-components/lib/components/columns';
import Menu from 'react-bulma-components/lib/components/menu';
import { TabPanel, EmptyTabPanel } from 'TabPanel';

export class Categories extends Component {
  static contextType = DownloadServiceContext;

  constructor() {
    super();

    this.state = {
      tabPanel: new EmptyTabPanel(),
      categories: []
    };
  }

  async componentDidMount() {
    const tabPanel = new TabPanel();
    const categories = await this.context.getCategories();

    for (const category of categories) {
      tabPanel.addTab(category.name, category.id);
    }

    this.setState({
      tabPanel: tabPanel,
      categories: await this.context.getCategories()
    });
  }

  onCategoryChange(category) {
    this.setState({
      ...this.state,
      tabPanel: this.state.tabPanel.setActiveTab(category.name)
    })
  }

  render() {
    return (<Columns>

      <Columns.Column size={2}>
        <Menu>
          <Menu.List>
            {this.state.categories.map(
              category => <Menu.List.Item
                key={category.id}
                onClick={e => this.onCategoryChange(category)}
                active={this.state.tabPanel.isActiveTab(category.name)}>
                {category.name}
              </Menu.List.Item>
            )}
          </Menu.List>
        </Menu>
      </Columns.Column>

      <Columns.Column size={10}>

      </Columns.Column>

    </Columns>);
  }
}
