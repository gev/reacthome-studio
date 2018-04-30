
import fs from 'fs';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { createHashHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import { RMWCProvider } from 'rmwc/Provider';
// import 'material-components-web/dist/material-components-web.min.css';
// import 'material-design-icons/iconfont/material-icons.css';
import { Main, ServiceManager } from './containers';
import { FILE, POOL } from './constants';
import createStore from './store';
import reducer from './reducer';
import './app.css';

const history = createHashHistory();
const store = createStore(reducer, { [POOL]: JSON.parse(fs.readFileSync(FILE)) }, history);

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <ServiceManager>
          <RMWCProvider>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/" component={Main} />
              </Switch>
            </ConnectedRouter>
          </RMWCProvider>
        </ServiceManager>
      </Provider>
    );
  }
}
