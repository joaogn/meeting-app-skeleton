import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Meeting from '../pages/Meeting';

const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/room/:roomId" component={Meeting} />
    </Switch>
  );
};

export default routes;
