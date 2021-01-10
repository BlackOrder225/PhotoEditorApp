import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import './container/Editor'
import Editor from './container/Editor';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Editor} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
