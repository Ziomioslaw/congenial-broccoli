import React from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import Hero from 'react-bulma-components/lib/components/hero';

export function Header() {
  return (
    <Hero color="primary" >
      <Hero.Body>
        <Heading>Download</Heading>
        <Heading subtitle size={5}>
          <a href="http://gimpuj.info/download">Check the page</a>
        </Heading>
      </Hero.Body>
    </Hero>
  );
}
