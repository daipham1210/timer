import React from 'react';
import Home from 'components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact={true} path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
      )
}