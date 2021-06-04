import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.less';
import Main from './Main/Main';
import Page from './Page/Page';
import Error from './Main/Error';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/page/:username/:reponame' component={Page} />
          <Route path='/error' component={Error} />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
