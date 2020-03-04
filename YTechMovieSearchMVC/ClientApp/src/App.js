import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { Detail } from './components/Detail';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route exact path="/search/:name/:page" component={Search} />
        <Route exact path="/detail/:name/:id" component={Search} />
      </div>
    );
  }
}
