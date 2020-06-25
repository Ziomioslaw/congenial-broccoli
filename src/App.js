import React, { Component } from 'react';
import './App.css';

function Header() {
  return (<header>
    Download
  </header>);
}

function Category(c) {
  return (<li key={c.id}>
      {c.name} [{c.directory}]
    </li>)
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
    return (<section>
      <ul>
        {this.state.categories.map(c => Category(c))}
      </ul>
      <button>Add new Category</button>
    </section>);
  }
}

function Notepad() {
  return (<section>
    <textarea>
    </textarea>
    <button>Save</button>
  </section>)
}

function ActionPanel() {
  return (
    <button>Rebuild</button>
  )
}

function App() {
  return (
    <section>
      <header>
        <Header />
      </header>

      <Categories />
      <Notepad />

      <footer>
        <ActionPanel />
      </footer>
    </section>
  );
}

export default App;
