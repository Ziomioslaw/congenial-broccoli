import React, { useState } from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';
import Tabs from 'react-bulma-components/lib/components/tabs';

export function Header({ tabPanel, onTabChange }) {
  return (
    <Hero info="true">

      <Hero.Body>
        <Heading>Download</Heading>
        <Heading subtitle size={5}>
          <a href="http://gimpuj.info/download">Check the page</a>
        </Heading>
      </Hero.Body>

      <Hero.Footer>
        <Tabs type="boxed" fullwidth={true}>
          {tabPanel.getTabsNames().map(tab => <Tabs.Tab
              key={tab}
              onClick={e => onTabChange(tab)}
              active={tabPanel.isActiveTab(tab)}>
                {tab}
              </Tabs.Tab>
          )}
        </Tabs>
      </Hero.Footer>

    </Hero>
  );
}
