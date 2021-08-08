import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import { CreateQuote } from './app/pages/CreateQuote/CreateQuote';
import { GetQuote } from './app/pages/Quotes/GetQuote';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <GetQuote />
          </Route>
          <Route path="/create">
            <CreateQuote />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
