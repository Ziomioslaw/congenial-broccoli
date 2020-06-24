import React from 'react';
import './App.css';

function Header() {
  return (<header>
    Download
  </header>);
}

function Categories() {
  return (<section>
    <ol>
    </ol>
    <button>Add new Category</button>
  </section>)
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
