
export class TabPanel {
  constructor() {
    this.tabs = {};
  }

  addTab(tabName, value) {
    this.activeTab = this.activeTab ?? tabName;
    this.tabs[tabName] = value;

    return this;
  }

  getTabsNames() {
    return Object.keys(this.tabs);
  }

  isActiveTab(tabName) {
    return this.activeTab === tabName;
  }

  setActiveTab(tabName) {
    this.activeTab = tabName;

    return this;
  }

  getActiveValue() {
    return this.tabs[this.activeTab];
  }

  getValueFor(tabName) {
    return this.tabs[tabName];
  }
}

export class EmptyTabPanel {

  getTabsNames() {
    return [];
  }

  isActiveTab() {
    return false;
  }
}