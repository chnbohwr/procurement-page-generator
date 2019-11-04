import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Select from './Select';
import Col1 from './Col1';
import Col2 from './Col2';

function App() {
  return (
    <HashRouter>
      <Route path="/" component={Select} exact />
      <Route path="/Col1" component={Col1} />
      <Route path="/Col2" component={Col2} />
    </HashRouter>
  )
}

export default App;
