import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Enter from './containers/Enter';
import Main from './containers/Main';

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Enter} />
      <Route exact path='/:roomId' component={Main} />
    </Switch>
  );
};
