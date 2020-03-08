import React, { Component } from 'react';
import Main from './routes/main.jsx'
import Charts from './routes/charts.jsx'
import Profile from './routes/profile.jsx'
import Watson from './routes/watson.jsx'
import { Link, Router, Switch, withRouter, Route, Redirect } from 'react-router-dom';
import PopupComponent from './PopupComponent.jsx'
import styled from 'styled-components';
import { createBrowserHistory } from 'history';

const Container = styled.div`
  width: 360px;
  height: 100%;
  .menuContainer {
    border-top: 1px solid #eeeeee;
    bottom: 0px;
  }
  .header {
    height: 60px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const history = createBrowserHistory();

class Popup extends Component {
  render() {
  return (
    <Router history={history}>
      <PopupComponent>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path='/charts' component={Charts} />
          <Route path='/profile' component={Profile} />
          <Route path='/watson' component={Watson} />
          <Redirect to="/" />
        </Switch>
      </PopupComponent>
    </Router>
  );
  }
}

export default Popup;
